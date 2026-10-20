type Dia = {
  nombre: DiasDeSemana;
};

type DiasDeSemana =
  | "lunes"
  | "martes"
  | "miercoles"
  | "jueves"
  | "viernes"
  | "sabado"
  | "domingo";

function Dia(diaSemana: Dia) {
  return (
    <article>
      <h3>{diaSemana.nombre}</h3>
      <p>Sin turnos</p>
    </article>
  );
}

export default Dia;
