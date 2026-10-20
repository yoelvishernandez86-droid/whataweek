import Dia from "../components/dia";

function Inicio() {
  return (
    <section>
      <article>
        <h1>Whataweek</h1>
        <p>Tu semana, a tu ritmo</p>
      </article>
      <article>
        <h2>Mi semana</h2>
        <button>Añadir turno</button>
        <div>
          <Dia nombre={"lunes"} />
        </div>
      </article>
    </section>
  );
}

export default Inicio;
