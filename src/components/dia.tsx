import Turno from "./turno";
import { turnos } from "../turnos/turnos";
export type Dia = {
  nombre: DiasDeSemana;
};

export type DiasDeSemana =
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves"
  | "viernes"
  | "sábado"
  | "domingo";

function Dia(diaSemana: Dia) {
  const editarTurno = () => {};
  const eliminarTurno = () => {};

  return (
    <article>
      <h3>{diaSemana.nombre}</h3>
      {turnos
        .filter((turno) => turno.dia === diaSemana.nombre)
        .map((turno) => (
          <Turno
            key={turno.id}
            turno={turno}
            onEditar={editarTurno}
            onEliminar={eliminarTurno}
          />
        ))}
    </article>
  );
}

export default Dia;
