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
};

function ModalModificar({ turno, onGuardar, onCancelar }: Props) {
  const [dia, setDia] = useState<TurnoDatos["dia"]>(turno?.dia ?? "lunes");
  const [entrada, setEntrada] = useState(turno?.entrada ?? "");
  const [salida, setSalida] = useState(turno?.salida ?? "");
  const editando = turno !== undefined;

  const guardar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    onGuardar({
      id: turno?.id ?? crypto.randomUUID(),
      dia,
      entrada,
      salida,
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
            <h2 id="modal-title">{editando ? "Editar" : "Crear"} turno</h2>
            <p>
              {editando
                ? "Ajusta el día y el horario de trabajo."
                : "Elige el día y el horario de trabajo."}
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
            <button
              className="modal-cancel"
              type="button"
              onClick={onCancelar}
            >
              Cancelar
            </button>
            <button className="modal-save" type="submit">
              {editando ? "Guardar cambios" : "Crear turno"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default ModalModificar;
