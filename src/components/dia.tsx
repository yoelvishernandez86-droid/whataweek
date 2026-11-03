import Turno, { type TurnoDatos } from "./turno";
import { useState } from "react";
import ModalModificar from "./modalModificar";
import type { ActividadPropuesta } from "./panelDeIa";
type DiaProps = {
  nombre: DiasDeSemana;
  turnos: TurnoDatos[];
  actividadesPropuestas: ActividadPropuesta[];
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

function Dia({
  nombre,
  turnos,
  actividadesPropuestas,
  onGuardar,
  onEliminar,
}: DiaProps) {
  const propuestasDelDia = actividadesPropuestas.filter(
    (actividad) => actividad.dia === nombre,
  );

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
      return propuestasDelDia.length === 0 ? <p className="day-empty">Sin planes todavía</p> : null;
    }
  };

  return (
    <article className="day-card">
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
      <header className="day-heading">
        <h3>{nombre}</h3>
        <span className="day-count" aria-label="Elementos en este día">
          {turnos.filter((turno) => turno.dia === nombre).length + propuestasDelDia.length}
        </span>
      </header>
      {ordenarTurnoSemana()}
      {propuestasDelDia.map((actividad, indice) => (
        <article
          key={`${actividad.entrada}-${actividad.salida}-${indice}`}
          className="turno turno-propuesta"
        >
          <div>
            <small className="turno-label">Propuesta de Weki</small>
            <strong>
              {actividad.nombreActividad}
            </strong>
            <p>
              {actividad.entrada} – {actividad.salida}
            </p>
          </div>
        </article>
      ))}
    </article>
  );
}

export default Dia;
