function PanelDeIa() {
  return (
    <section>
      <div>
        <img src="" alt="" />
        <h3>Tu asistente IA</h3>
        <p>Haz espacio para lo que importa</p>
        <div>
          <img src="" alt="" />
          Tiene en cuenta tus turnos
        </div>
        <h4>¿Que te gustaría organizar?</h4>
        <textarea
          placeholder="Cuéntale a la IA qué quieres organizar esta semana..."
          rows={5}
        />
        <ul>
          <li>modificarPropuesta1</li>
          <li>modificarPropuesta2</li>
          <li>modificarPropuesta3</li>
        </ul>
        <button>
          <img src="" alt="" />
          Generar propuesta
        </button>
      </div>
      <div>
        <h4>Una semana más equilibrada</h4>
        <p>He encontrado huecos para tus objetivos sin cambiar tus turnos</p>
        <ul>
          <li>
            <img src="" alt="" />
            4h de estudio
          </li>
          <li>
            <img src="" alt="" />3 entrenamientos
          </li>
          <li>
            <img src="" alt="" />
            Domingo libre
          </li>
        </ul>
        <button>Aplicar propuesta</button>
        <button>Ajustar</button>
      </div>
    </section>
  );
}

export default PanelDeIa;
