import { useState } from "react";
import type { TurnoDatos } from "./turno";
type PanelDeIaProps = {
  turnos: TurnoDatos[];
};

function PanelDeIa({ turnos }: PanelDeIaProps) {
  const [peticionIa, setPeticionIA] = useState("");
  const generarPropuesta = () => {
    console.log({
      peticionIa,
      turnos,
    });
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
        <ul>
          <li>modificarPropuesta1</li>
          <li>modificarPropuesta2</li>
          <li>modificarPropuesta3</li>
        </ul>
        <button
          onClick={() => generarPropuesta()}
          disabled={!peticionIa.trim()}
        >
          Generar propuesta
        </button>
      </div>
      <div>
        <h4>Una semana más equilibrada</h4>
        <p>He encontrado huecos para tus objetivos sin cambiar tus turnos</p>
        <ul>
          <li>4h de estudio</li>
          <li>3 entrenamientos</li>
          <li>Domingo libre</li>
        </ul>
        <button>Aplicar propuesta</button>
        <button>Ajustar</button>
      </div>
    </section>
  );
}

export default PanelDeIa;
