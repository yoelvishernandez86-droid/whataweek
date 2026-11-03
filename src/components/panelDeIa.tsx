import { useEffect, useRef, useState, type FormEvent } from "react";
import type { TurnoDatos } from "./turno";
import Weki, { imagenWeki, type EstadoWeki } from "./weki";

type PanelDeIaProps = {
  turnos: TurnoDatos[];
  onPropuesta: (actividades: ActividadPropuesta[]) => void;
};

export type ActividadPropuesta = Pick<
  TurnoDatos,
  "nombreActividad" | "dia" | "entrada" | "salida"
>;

type RespuestaPropuesta = {
  propuesta: string;
  actividades: ActividadPropuesta[];
};

type Peticion =
  | { estado: "inicial" }
  | { estado: "generando"; texto: string }
  | { estado: "exito"; texto: string; respuesta: RespuestaPropuesta }
  | { estado: "error"; texto: string };

function esRespuestaPropuesta(datos: unknown): datos is RespuestaPropuesta {
  if (typeof datos !== "object" || datos === null) return false;
  const { propuesta, actividades } = datos as Record<string, unknown>;
  const dias = [
    "lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo",
  ];
  const horaValida = /^([01]\d|2[0-3]):[0-5]\d$/;

  return (
    typeof propuesta === "string" &&
    propuesta.trim().length > 0 &&
    Array.isArray(actividades) &&
    actividades.every((actividad: unknown) => {
      if (typeof actividad !== "object" || actividad === null) return false;
      const { nombreActividad, dia, entrada, salida } = actividad as Record<string, unknown>;
      return (
        typeof nombreActividad === "string" && nombreActividad.trim().length > 0 &&
        typeof dia === "string" && dias.includes(dia) &&
        typeof entrada === "string" && horaValida.test(entrada) &&
        typeof salida === "string" && horaValida.test(salida) && salida > entrada
      );
    })
  );
}

function PanelDeIa({ turnos, onPropuesta }: PanelDeIaProps) {
  const [peticionIa, setPeticionIA] = useState(() => {
    return localStorage.getItem("peticionIa") ?? "";
  });
  const [peticion, setPeticion] = useState<Peticion>({ estado: "inicial" });
  const peticionActiva = useRef<AbortController | null>(null);

  useEffect(() => {
    localStorage.setItem("peticionIa", peticionIa);
  }, [peticionIa]);
  useEffect(() => () => peticionActiva.current?.abort(), []);

  const editandoPeticion = (texto: string) => {
    peticionActiva.current?.abort();
    peticionActiva.current = null;
    setPeticionIA(texto);
    setPeticion({ estado: "inicial" });
    onPropuesta([]);
  };

  const generarPropuesta = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const texto = peticionIa.trim();
    if (!texto || peticionActiva.current) return;

    const controlador = new AbortController();
    peticionActiva.current = controlador;
    setPeticion({ estado: "generando", texto });
    onPropuesta([]);

    try {
      const respuesta = await fetch("/api/propuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ peticionIa: texto, turnos }),
        signal: controlador.signal,
      });

      if (!respuesta.ok) throw new Error("No se pudo generar la propuesta");
      const datos: unknown = await respuesta.json();
      if (!esRespuestaPropuesta(datos)) throw new Error("Respuesta inválida");

      if (controlador.signal.aborted || peticionActiva.current !== controlador) return;
      setPeticion({ estado: "exito", texto, respuesta: datos });
      onPropuesta(datos.actividades);
    } catch {
      if (controlador.signal.aborted || peticionActiva.current !== controlador) return;
      setPeticion({ estado: "error", texto });
    } finally {
      if (peticionActiva.current === controlador) peticionActiva.current = null;
    }
  };

  const generando = peticion.estado === "generando";
  const estadoWeki: EstadoWeki = generando
    ? "pensando"
    : peticion.estado === "exito"
      ? "propuesta"
      : peticion.estado === "error"
        ? "problema"
        : peticionIa.trim() ? "escribiendo" : "bienvenida";

  return (
    <section className="ai-panel" aria-labelledby="ai-title">
      <header className="ai-panel-header">
        <div>
          <p className="eyebrow">UN POCO DE AYUDA, MUCHO MÁS AIRE</p>
          <h2 id="ai-title">Organiza tu semana con Weki</h2>
          <p className="section-description">
            Tu asistente de IA, para encajar tus planes con calma.
          </p>
        </div>
        <span className="context-badge">Tiene en cuenta tus turnos</span>
      </header>

      <div className="ai-workspace">
        <form className="ai-composer" onSubmit={generarPropuesta}>
          <Weki estado={estadoWeki} />
          <label className="composer-label" htmlFor="peticion-ia">
            ¿Qué te gustaría organizar?
          </label>
          <textarea
            id="peticion-ia"
            placeholder="Cuéntame qué quieres hacer, cuánto tiempo necesitas y qué días te vienen bien…"
            rows={5}
            value={peticionIa}
            onChange={(evento) => editandoPeticion(evento.target.value)}
            aria-describedby="peticion-ayuda"
          />
          <p className="composer-hint" id="peticion-ayuda">
            Si falta algún detalle, te lo preguntaré antes de organizarlo.
          </p>
          <div className="composer-actions">
            <button
              className="button-primary"
              type="submit"
              disabled={!peticionIa.trim() || generando}
            >
              {generando ? "Weki está pensando…" : peticion.estado === "error"
                ? "Volver a intentarlo" : "Generar propuesta"}
            </button>
            <span className="composer-note">Tu petición se guarda en este dispositivo.</span>
          </div>
        </form>

        <div className="ai-conversation" aria-label="Conversación con Weki" aria-busy={generando}>
          {peticion.estado !== "inicial" && (
            <div className="conversation-message user-message">
              <span className="message-author">Tú</span>
              <p className="message-text">{peticion.texto}</p>
            </div>
          )}

          {peticion.estado === "exito" && (
            <div className="conversation-message weki-message">
              <header className="message-heading">
                <img className="message-avatar" src={imagenWeki("bienvenida")}
                  alt="Weki, tu compañero de planificación" width={40} height={40} />
                <span className="message-author">Weki</span>
                <span className="message-tag">
                  {peticion.respuesta.actividades.length > 0 ? "Tu propuesta" : "Vamos paso a paso"}
                </span>
              </header>
              <p className="message-text">{peticion.respuesta.propuesta}</p>
            </div>
          )}

          {peticion.estado === "error" && (
            <div className="ai-error" role="alert">
              <strong>La respuesta no ha llegado</strong>
              <p>No hemos podido generar la propuesta. Tu petición sigue guardada.
                Revisa la conexión o vuelve a intentarlo.</p>
            </div>
          )}

          {(peticion.estado === "inicial" || generando) && (
            <div className="conversation-placeholder">
              <span className="message-tag">A TU RITMO</span>
              <h3>{generando ? "Buscando cómo encajarlo…" : "Una semana con espacio para ti"}</h3>
              <p>{generando
                ? "Cuando llegue la respuesta, la veremos aquí. Si editas tu petición, cancelaré esta generación."
                : "Cuéntame tus planes y revisaremos juntos cómo organizarlos. Tú decides qué añadir a tu semana."}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PanelDeIa;
