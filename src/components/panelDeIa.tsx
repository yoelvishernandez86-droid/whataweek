import { useEffect, useState } from "react";
import type { TurnoDatos } from "./turno";
type PanelDeIaProps = {
  turnos: TurnoDatos[];
};

function PanelDeIa({ turnos }: PanelDeIaProps) {
  const [peticionIa, setPeticionIA] = useState(() => {
    return localStorage.getItem("peticionIa") ?? "";
  });
  const [propuesta, setPropuesta] = useState("");

  useEffect(() => {
    localStorage.setItem("peticionIa", peticionIa);
  }, [peticionIa]);
  const generarPropuesta = async () => {
    try {
      const respuesta = await fetch("/api/propuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          peticionIa,
          turnos,
        }),
      });

      if (!respuesta.ok) {
        throw new Error("El servidor no respondió correctamente");
      }

      const datos = await respuesta.json();
      setPropuesta(datos.propuesta);
      console.log(datos);
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };
  return (
    <section>
      <div>
        <h3>Tu asistente IA</h3>
        <p>Haz espacio para lo que importa</p>
        <div>Tiene en cuenta tus turnos</div>
        <h4>¿Que te gustaría organizar?</h4>
        <textarea
          placeholder="Cuéntale a la IA qué quieres organizar esta semana..."
          rows={5}
          value={peticionIa}
          onChange={(e) => setPeticionIA(e.target.value)}
        />

        <button
          onClick={() => generarPropuesta()}
          disabled={!peticionIa.trim()}
        >
          Generar propuesta
        </button>
      </div>
      {propuesta && (
        <div>
          <h4>Tu propuesta</h4>
          <p style={{ whiteSpace: "pre-wrap" }}>{propuesta}</p>
        </div>
      )}
    </section>
  );
}

export default PanelDeIa;
