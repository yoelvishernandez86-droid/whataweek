import Turno, { type TurnoDatos } from "./turno";
import { turnos } from "../turnos/turnos";
import { useState } from "react";
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
  const [turnosImp, setTurnosImp] = useState(turnos);
  const [modal, setModal] = useState(false);
  const guardarTurno = (turnoEditado: TurnoDatos) => {
    setTurnosImp((anteriores) =>
      anteriores.map((turno) =>
        turno.id === turnoEditado.id ? turnoEditado : turno
      )
    );
  };
  const eliminarTurno = (id: string) => {
    setTurnosImp((valoresAnteriores) =>
      valoresAnteriores.filter((valor) => {
        valor.id !== id;
      }),
    );
  };

  const ordenarTurnoSemana = (turnosImp: TurnoDatos[]) => {
    let turnoCoincidente = turnosImp.filter(
      (turno) => turno.dia === diaSemana.nombre,
    );
    if (turnoCoincidente.length !== 0) {
      return turnoCoincidente.map((turno) => (
        <Turno
          key={turno.id}
          turno={turno}
          onEditar={editarTurno}
          onEliminar={eliminarTurno}
        />
      ));
    } else {
      return <h3>Sin turnos</h3>;
    }
  };

  return (
    <article>
      <h3>{diaSemana.nombre}</h3>
      {ordenarTurnoSemana(turnosImp)}
    </article>
  );
}

export default Dia;
