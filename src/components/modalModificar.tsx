import { useState, type FormEvent } from "react";
import type { TurnoDatos } from "./turno";

const dias = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
] as const;

type Props = {
  turno?: TurnoDatos;
  onGuardar: (turnoActualizado: TurnoDatos) => void;
  onCancelar: () => void;
  creandoActividad?: boolean;
};

const coloresActividad = [
  "#c2417a",
  "#b45309",
  "#0f766e",
  "#4f46e5",
  "#7e22ce",
  "#15803d",
] as const;

function ModalModificar({
  turno,
  onGuardar,
  onCancelar,
  creandoActividad,
}: Props) {
  const [dia, setDia] = useState<TurnoDatos["dia"]>(turno?.dia ?? "lunes");
  const [entrada, setEntrada] = useState(turno?.entrada ?? "");
  const [salida, setSalida] = useState(turno?.salida ?? "");
  const [nombre, setNombre] = useState(turno?.nombreActividad ?? "");
  const esActividad = creandoActividad ?? turno?.esActividad ?? false;
  const editando = turno !== undefined;

  const guardar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const color =
      turno?.color ??
      (esActividad
        ? coloresActividad[Math.floor(Math.random() * coloresActividad.length)]
        : undefined);

    onGuardar({
      id: turno?.id ?? crypto.randomUUID(),
      dia,
      nombreActividad: esActividad ? nombre.trim() : "",
      entrada,
      salida,
      esActividad,
      color,
    });
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCancelar();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="modal-header">
          <div>
            <span className="modal-eyebrow">TU SEMANA</span>
            <h2 id="modal-title">
              {editando ? "Editar" : "Crear"}{" "}
              {esActividad ? "actividad" : "turno"}
            </h2>
            <p>
              {editando
                ? `Ajusta el día y el horario ${esActividad ? "de la actividad" : "de trabajo"}.`
                : `Elige el día y el horario ${esActividad ? "de la actividad" : "de trabajo"}.`}
            </p>
          </div>
          <button
            className="modal-close"
            type="button"
            aria-label="Cerrar"
            onClick={onCancelar}
          >
            x
          </button>
        </header>

        <form className="modal-form" onSubmit={guardar}>
          <label>
            Día
            <select
              value={dia}
              onChange={(evento) =>
                setDia(evento.target.value as TurnoDatos["dia"])
              }
            >
              {dias.map((diaSemana) => (
                <option key={diaSemana} value={diaSemana}>
                  {diaSemana}
                </option>
              ))}
            </select>
          </label>
          {esActividad ? (
            <div>
              <label htmlFor="name">Nombre de la actividad</label>
              <input
                id="name"
                type="text"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                required
              />
            </div>
          ) : null}
          <div className="modal-time-fields">
            <label>
              Entrada
              <input
                type="time"
                value={entrada}
                onChange={(evento) => setEntrada(evento.target.value)}
                required
              />
            </label>

            <label>
              Salida
              <input
                type="time"
                value={salida}
                onChange={(evento) => setSalida(evento.target.value)}
                required
              />
            </label>
          </div>

          <footer className="modal-actions">
            <button className="modal-cancel" type="button" onClick={onCancelar}>
              Cancelar
            </button>
            <button className="modal-save" type="submit">
              {editando
                ? "Guardar cambios"
                : `${esActividad ? "Crear actividad" : "Crear Turno"}`}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default ModalModificar;
