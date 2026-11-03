import { useState, useEffect } from "react";
import Dia from "../components/dia";
import type { TurnoDatos } from "../components/turno";
import ModalModificar from "../components/modalModificar";
import PanelDeIa, { type ActividadPropuesta } from "../components/panelDeIa";
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
  const [actividadesPropuestas, setActividadesPropuestas] = useState<
    ActividadPropuesta[]
  >([]);
  const [errorPropuesta, setErrorPropuesta] = useState("");
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

  const aplicarPropuesta = () => {
    if (actividadesPropuestas.length === 0) return;

    const horaValida = /^([01]\d|2[0-3]):[0-5]\d$/;

    const ocupados = turnos.flatMap(({ dia, entrada, salida }) => {
      if (salida >= entrada) return [{ dia, entrada, salida }];

      const diaSiguiente = dias[(dias.indexOf(dia) + 1) % dias.length];

      return [
        { dia, entrada, salida: "24:00" },
        { dia: diaSiguiente, entrada: "00:00", salida },
      ];
    });

    for (const {
      dia,
      entrada,
      salida,
      nombreActividad,
    } of actividadesPropuestas) {
      if (
        !dias.includes(dia) ||
        !nombreActividad.trim() ||
        !horaValida.test(entrada) ||
        !horaValida.test(salida) ||
        salida <= entrada
      ) {
        setErrorPropuesta("La propuesta contiene una actividad inválida.");
        return;
      }

      const hayCruce = ocupados.some(
        (tramo) =>
          tramo.dia === dia && entrada < tramo.salida && salida > tramo.entrada,
      );

      if (hayCruce) {
        setErrorPropuesta(`Hay un solapamiento el ${dia} a las ${entrada}.`);
        return;
      }

      ocupados.push({ dia, entrada, salida });
    }

    const nuevasActividades: TurnoDatos[] = actividadesPropuestas.map(
      (actividad) => ({
        ...actividad,
        id: crypto.randomUUID(),
        esActividad: true,
        color: "#00756e",
      }),
    );

    setTurnos((anteriores) => [...anteriores, ...nuevasActividades]);
    setActividadesPropuestas([]);
    setErrorPropuesta("");
  };
  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true">w</span>
          <div>
            <p className="brand-name">Whataweek</p>
            <p className="brand-tagline">Tu semana, a tu ritmo</p>
          </div>
        </div>
        <span className="header-note">Un plan que va contigo</span>
      </header>

      <section className="welcome-card" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <p className="eyebrow">MENOS PRISAS, MÁS VIDA</p>
          <h1 id="welcome-title">Haz espacio para lo que importa.</h1>
          <p>Tus turnos, tus planes y un poco de ayuda de Weki.
            Organicemos una semana que se sienta tuya.</p>
        </div>
        <div className="welcome-aside">
          <span className="welcome-spark" aria-hidden="true">✳</span>
          <p>Paso a paso.<br />Plan a plan.</p>
        </div>
      </section>

      <section className="week-section" aria-labelledby="week-title">
        <header className="section-heading">
          <div>
            <p className="eyebrow">TU PUNTO DE PARTIDA</p>
            <h2 id="week-title">Mi semana</h2>
            <p className="section-description">Empieza por tus turnos y añade los planes que ya tienes.</p>
          </div>
          <div className="week-actions">
            <button className="button-secondary" type="button" onClick={() => setCreandoActividad(true)}>
              Añadir actividad
            </button>
            <button className="button-primary" type="button" onClick={() => setCreandoTurno(true)}>
              Añadir turno
            </button>
          </div>
        </header>
        <div className="week-legend" aria-label="Tipos de elementos de la semana">
          <span className="legend-shift">Trabajo</span>
          <span className="legend-activity">Tus actividades</span>
          <span className="legend-proposal">Propuestas de Weki</span>
        </div>
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
              actividadesPropuestas={actividadesPropuestas}
              onGuardar={guardarTurno}
              onEliminar={eliminarTurno}
            />
          ))}
        </div>
      </section>
      <PanelDeIa
        turnos={turnos}
        onPropuesta={(actividades) => {
          setActividadesPropuestas(actividades);
          setErrorPropuesta("");
        }}
      />
      {actividadesPropuestas.length > 0 && (
        <section className="proposal-actions" aria-label="Confirmar propuesta">
          <div>
            <strong>Tu semana, tú decides</strong>
            <p>Revisa las actividades de Weki en el calendario antes de añadirlas.</p>
          </div>
          <button className="button-primary" type="button" onClick={aplicarPropuesta}>
            Aplicar propuesta
          </button>
        </section>
      )}

      {errorPropuesta && <p className="proposal-error" role="alert">{errorPropuesta}</p>}
    </main>
  );
}

export default Inicio;
