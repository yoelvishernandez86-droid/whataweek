import type { DiasDeSemana } from "./dia";

export type TurnoDatos = {
  id: string;
  dia: DiasDeSemana;
  entrada: string;
  salida: string;
  nombreActividad: string;
  esActividad?: boolean;
  color?: string;
};

type TurnoProps = {
  turno: TurnoDatos;
  onEditar: (turno: TurnoDatos) => void;
  onEliminar: (id: string) => void;
};

export function Turno({ turno, onEditar, onEliminar }: TurnoProps) {
  const esNocturno = turno.salida < turno.entrada;
  const estiloActividad =
    turno.esActividad && turno.color
      ? {
          borderColor: turno.color,
          backgroundColor: `${turno.color}1A`,
        }
      : undefined;

  return (
    <article
      className={`turno${turno.esActividad ? " turno-actividad" : ""}`}
      style={estiloActividad}
    >
      <div>
        <strong style={turno.esActividad ? { color: turno.color } : undefined}>
          {turno.esActividad ? turno.nombreActividad : "Trabajo"}
        </strong>
        <p>
          {turno.entrada} - {turno.salida}
          {esNocturno && " (+1 día)"}
        </p>
      </div>

      <button onClick={() => onEditar(turno)}>Editar</button>
      <button onClick={() => onEliminar(turno.id)}>Eliminar</button>
    </article>
  );
}

export default Turno;
