export type EstadoWeki =
  | "bienvenida"
  | "escribiendo"
  | "pensando"
  | "propuesta"
  | "problema";

const poses = {
  bienvenida: {
    archivo: "weki.png",
    alt: "Weki sonríe con su libreta, listo para ayudarte a organizar la semana",
    texto: "¡Hola! Soy Weki. Cuéntame qué te gustaría organizar.",
  },
  escribiendo: {
    archivo: "weki_tomando_apuntes.png",
    alt: "Weki toma apuntes de lo que necesitas en su libreta",
    texto: "Te leo. Vamos a hacer espacio para lo que necesitas.",
  },
  pensando: {
    archivo: "weki_pensando.png",
    alt: "Weki piensa cómo encajar tu petición con los turnos de la semana",
    texto: "Estoy revisando tu petición y tus turnos. Vamos paso a paso.",
  },
  propuesta: {
    archivo: "weki_buena_propuesta.png",
    alt: "Weki celebra que ya tiene una respuesta para revisar contigo",
    texto: "Ya tengo una respuesta para ti. La revisamos juntos.",
  },
  problema: {
    archivo: "weki_problema.png",
    alt: "Weki muestra preocupación porque la petición no se ha completado",
    texto: "Algo se ha atascado. Podemos volver a intentarlo.",
  },
} satisfies Record<EstadoWeki, { archivo: string; alt: string; texto: string }>;

export const imagenWeki = (estado: EstadoWeki) =>
  `${import.meta.env.BASE_URL}weki/${poses[estado].archivo}`;

function Weki({ estado }: { estado: EstadoWeki }) {
  const pose = poses[estado];

  return (
    <div className="weki-companion">
      <div className="weki-portrait" data-state={estado}>
        <img
          key={estado}
          className="weki-pose"
          src={imagenWeki(estado)}
          alt={pose.alt}
          width={144}
          height={160}
        />
      </div>
      <div className="weki-caption">
        <p className="weki-name">Tu compañero de semana</p>
        <p className="weki-state-text" role="status" aria-atomic="true">
          {pose.texto}
        </p>
      </div>
    </div>
  );
}

export default Weki;
