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
  turno: TurnoDatos;
  onGuardar: (turnoActualizado: TurnoDatos) => void;
  onCancelar: () => void;
};

function FormularioTurno({ turno, onGuardar, onCancelar }: Props) {
  const [dia, setDia] = useState(turno.dia);
  const [entrada, setEntrada] = useState(turno.entrada);
  const [salida, setSalida] = useState(turno.salida);

  const guardar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    onGuardar({
      ...turno,
      dia,
      entrada,
      salida,
    });
  };

  return (
    <form onSubmit={guardar}>
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

      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}

export default FormularioTurno;
