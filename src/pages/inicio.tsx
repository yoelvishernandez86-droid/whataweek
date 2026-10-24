import Dia from "../components/dia";

function Inicio() {
  return (
    <section>
      <article>
        <h1>Whataweek</h1>
        <p>Tu semana, a tu ritmo</p>
      </article>
      <article></article>
      <article>
        <h2>Mi semana</h2>
        <button>Añadir turno</button>
        <div>
          <Dia nombre={"lunes"} />
          <Dia nombre={"martes"} />
          <Dia nombre={"miércoles"} />
          <Dia nombre={"jueves"} />
          <Dia nombre={"viernes"} />
          <Dia nombre={"sábado"} />
          <Dia nombre={"domingo"} />
        </div>
      </article>
    </section>
  );
}

export default Inicio;
