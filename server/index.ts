import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";

const servidor = createServer((peticion: IncomingMessage, respuesta: ServerResponse) => {
  if (peticion.method === "GET" && peticion.url === "/api/salud") {
    respuesta.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });

    respuesta.end(
      JSON.stringify({
        mensaje: "El servidor de Whataweek funciona",
      }),
    );

    return;
  }
    if (peticion.method === "POST" && peticion.url === "/api/propuesta") {
    let cuerpo = "";

    peticion.setEncoding("utf8");

    peticion.on("data", (fragmento: string) => {
      cuerpo += fragmento;
    });

    peticion.on("end", () => {
      try {
        const datos = JSON.parse(cuerpo);

        console.log("Datos recibidos:", datos);

        respuesta.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
        });

        respuesta.end(
          JSON.stringify({
            mensaje: "Petición y turnos recibidos correctamente",
          }),
        );
      } catch {
        respuesta.writeHead(400, {
          "Content-Type": "application/json; charset=utf-8",
        });

        respuesta.end(
          JSON.stringify({ error: "El cuerpo no contiene un JSON válido" }),
        );
      }
    });

    return;
  }
  respuesta.writeHead(404, {
    "Content-Type": "application/json; charset=utf-8",
  });

  respuesta.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

servidor.listen(3001, "127.0.0.1", () => {
  console.log("Servidor disponible en http://127.0.0.1:3001");
});