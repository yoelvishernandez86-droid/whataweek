import type { DiasDeSemana } from "./dia";

export type TurnoDatos = {
  id: string;
  dia: DiasDeSemana;
  entrada: string;
  salida: string;
};

type TurnoProps = {
  turno: TurnoDatos;
  onEditar: (turno: TurnoDatos) => void;
  onEliminar: (id: string) => void;
};

export function Turno({ turno, onEditar, onEliminar }: TurnoProps) {
  const esNocturno = turno.salida < turno.entrada;

  return (
    <article className="turno">
      <div>
        <strong>Trabajo</strong>
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
