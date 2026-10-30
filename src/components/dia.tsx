import Turno, { type TurnoDatos } from "./turno";
import { useState } from "react";
import ModalModificar from "./modalModificar";

type DiaProps = {
  nombre: DiasDeSemana;
  turnos: TurnoDatos[];
  onGuardar: (turno: TurnoDatos) => void;
  onEliminar: (id: string) => void;
  nombreActividad?: string;
};

export type DiasDeSemana =
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves"
  | "viernes"
  | "sábado"
  | "domingo";

function Dia({ nombre, turnos, onGuardar, onEliminar }: DiaProps) {
  const [turnoEnEdicion, setTurnoEnEdicion] = useState<TurnoDatos | null>(null);

  const ordenarTurnoSemana = () => {
    const turnoCoincidente = turnos
      .filter((turno) => turno.dia === nombre)
      .sort((a, b) => a.entrada.localeCompare(b.entrada));

    if (turnoCoincidente.length !== 0) {
      return turnoCoincidente.map((turno) => (
        <Turno
          key={turno.id}
          turno={turno}
          onEditar={setTurnoEnEdicion}
          onEliminar={onEliminar}
        />
      ));
    } else {
      return <h3>Sin turnos</h3>;
    }
  };

  return (
    <article>
      {turnoEnEdicion && (
        <ModalModificar
          turno={turnoEnEdicion}
          onGuardar={(turno) => {
            onGuardar(turno);
            setTurnoEnEdicion(null);
          }}
          onCancelar={() => setTurnoEnEdicion(null)}
        />
      )}
      <h3>{nombre}</h3>
      {ordenarTurnoSemana()}
    </article>
  );
}

export default Dia;
