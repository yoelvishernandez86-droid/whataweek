import { useState } from "react";
import Dia from "../components/dia";
import type { TurnoDatos } from "../components/turno";
import ModalModificar from "../components/modalModificar";
import { turnos as turnosIniciales } from "../turnos/turnos";

const dias = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
] as const;

function Inicio() {
  const [turnos, setTurnos] = useState(turnosIniciales);
  const [creandoTurno, setCreandoTurno] = useState(false);

  const guardarTurno = (turnoEditado: TurnoDatos) => {
    setTurnos((anteriores) => {
      const yaExiste = anteriores.some((turno) => turno.id === turnoEditado.id);
      return yaExiste
        ? anteriores.map((turno) =>
            turno.id === turnoEditado.id ? turnoEditado : turno
          )
        : [...anteriores, turnoEditado];
    });
  };

  const eliminarTurno = (id: string) => {
    setTurnos((anteriores) => anteriores.filter((turno) => turno.id !== id));
  };

  return (
    <section>
      <article>
        <h1>Whataweek</h1>
        <p>Tu semana, a tu ritmo</p>
      </article>
      
      <article>
        <h2>Mi semana</h2>
        <button onClick={() => setCreandoTurno(true)}>Añadir turno</button>
        {creandoTurno && (
          <ModalModificar
            onGuardar={(turno) => {
              guardarTurno(turno);
              setCreandoTurno(false);
            }}
            onCancelar={() => setCreandoTurno(false)}
          />
        )}
        <div className="week-grid">
          {dias.map((nombre) => (
            <Dia
              key={nombre}
              nombre={nombre}
              turnos={turnos}
              onGuardar={guardarTurno}
              onEliminar={eliminarTurno}
            />
          ))}
        </div>
      </article>
    </section>
  );
}

export default Inicio;
