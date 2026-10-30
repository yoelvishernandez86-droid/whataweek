import { useState, useEffect } from "react";
import Dia from "../components/dia";
import type { TurnoDatos } from "../components/turno";
import ModalModificar from "../components/modalModificar";
import PanelDeIa from "../components/panelDeIa";
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
  const [turnos, setTurnos] = useState<TurnoDatos[]>(() => {
    const guardados = localStorage.getItem("turnos");

    if (guardados === null) {
      return [];
    }

    try {
      return JSON.parse(guardados) as TurnoDatos[];
    } catch {
      return [];
    }
  });
  const [creandoTurno, setCreandoTurno] = useState(false);
  const [creandoActividad, setCreandoActividad] = useState(false);

  const guardarTurno = (turnoEditado: TurnoDatos) => {
    setTurnos((anteriores) => {
      const yaExiste = anteriores.some((turno) => turno.id === turnoEditado.id);
      return yaExiste
        ? anteriores.map((turno) =>
            turno.id === turnoEditado.id ? turnoEditado : turno,
          )
        : [...anteriores, turnoEditado];
    });
  };

  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

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
        <article>
          <h3>Añade una actividad a tu semana</h3>
          <button onClick={() => setCreandoActividad(true)}>
            Añadir actividad
          </button>
          {creandoActividad && (
            <ModalModificar
              onGuardar={(turno) => {
                guardarTurno(turno);
                setCreandoActividad(false);
              }}
              onCancelar={() => setCreandoActividad(false)}
              creandoActividad={true}
            />
          )}
        </article>
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
      <PanelDeIa />
    </section>
  );
}

export default Inicio;
