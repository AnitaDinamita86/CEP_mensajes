import React, { useState, useEffect } from "react";

const WifiIcon = () => (
  <img src="https://img.icons8.com/ios/24/000000/wifi.png" alt="wifi-icon" />
);

const BatteryIcon = () => (
  <img
    src="https://img.icons8.com/ios/24/000000/battery.png"
    alt="battery-icon"
  />
);

const ClockIcon = () => (
  <img src="https://img.icons8.com/ios/24/000000/clock.png" alt="clock-icon" />
);

const Mensajes = () => {
  const [sel, setSel] = useState(null);
  const [res, setRes] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const m = [
    {
      f: "10/12/2024, 3:00 PM",
      r: "Luis",
      t: "¡Por fin en Fisterra! Qué ganas de explorar contigo el tema de la ciudad sumergida. Avisa si quieres que pase por tu alojamiento esta noche.",
      res: "Claro, nos vemos a las 8. Tengo mucho que contarte. Llevo días pensando en cómo avanzar esto juntos.",
    },
    {
      f: "10/12/2024, 10:15 PM",
      r: "Luis",
      t: "Qué locura lo de las luces en las cuevas. ¿Seguro que quieres meterte ahí esta noche?",
      res: "Tranquilo, solo quiero observar. Si encuentro algo, hablamos mañana.",
    },
    {
      f: "10/12/2024, 11:50 PM",
      r: "Luis",
      t: "Voy de camino al sitio que dijiste, ¿seguro que está todo bien? Hace frío y parece que viene tormenta.",
      res: "",
    },
    {
      f: "08/12/2024, 6:45 PM",
      r: "Marta Castela",
      t: "¿Sigues interesado en las historias del faro? Esta tarde escuché el sonido raro en el agua otra vez. Avísame si vienes.",
      res: "Gracias, Marta. Puede que mañana lo vea con calma, pero esta noche estoy ocupado.",
    },
    {
      f: "07/12/2024, 6:30 PM",
      r: "Andrés Carmona",
      t: "Hola, Adrián. Encontré un artículo sobre leyendas de pueblos sumergidos. Te lo mando por email. Puede que te sirva.",
      res: "¡Perfecto! Lo revisaré en cuanto tenga un rato.",
    },
    {
      f: "07/12/2024, 3:21 PM",
      r: "Noah",
      t: "Espero que tu viaje esté yendo genial. Cuando regreses, te prometo una cena como la de hace dos semanas.",
      res: "Lo estoy deseando. Esto es apasionante, pero también agotador. Pistas y yo necesitamos ese descanso.",
    },
    {
      f: "08/12/2024, 7:30 PM",
      r: "Vesper",
      t: "No puedo creer que realmente estés allí. Cuidado con los sitios peligrosos, especialmente de noche.",
      res: "Tranquila, siempre llevo a Pistas conmigo. No creo que el faro me coma.",
    },
    {
      f: "09/12/2024, 9:12 PM",
      r: "[Número desconocido]",
      t: "¿De verdad quieres saber lo que hay bajo las aguas? Te advierto, algunos misterios son mejor dejarlos donde están.",
      res: "",
    },
    {
      f: "09/12/2024, 7:45 PM",
      r: "[Número desconocido]",
      t: "Recuerda que las corrientes pueden llevarse más que objetos perdidos.",
      res: "",
    },
    {
      f: "06/12/2024, 8:45 AM",
      r: "Casa Faro",
      t: "Su reserva en Casa Rural Faro estará lista a las 14:00. ¡Disfrute de su estancia!",
      res: "",
    },
  ];

  const mensajesAgrupados = m.reduce((acc, curr) => {
    const existing = acc.find((item) => item.r === curr.r);
    if (existing) {
      existing.conversacion.push(curr);
    } else {
      acc.push({ r: curr.r, conversacion: [curr] });
    }
    return acc;
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-photo/vertical-black-white-shot-erg-desert_181624-2180.jpg)",
      }}
    >
      <div className="flex justify-between p-2 bg-white bg-opacity-50">
        <span>{formatTime(currentTime)}</span>
        <div className="flex space-x-2">
          <WifiIcon />
          <BatteryIcon />
          <span>{batteryLevel}%</span>
        </div>
      </div>
      {sel ? (
        <div
          className="p-4 flex flex-col"
          style={{ height: "calc(100vh - 90px)" }}
        >
          <div className="bg-white bg-opacity-50 p-4 rounded-md flex-grow overflow-y-auto">
            <h2 className="text-lg font-bold uppercase">{sel.r}</h2>
            {sel.conversacion.map((msg, i) => (
              <div key={i} className="mt-4">
                <p className="text-sm">{msg.f}</p>
                <p className="text-lg mt-2">{msg.t}</p>
                {msg.res && (
                  <>
                    <h2 className="mt-2 font-semibold">Respuesta:</h2>
                    <p>{msg.res}</p>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col items-center">
            <input
              type="text"
              value={res}
              onChange={(e) => setRes(e.target.value)}
              placeholder="Escribe una respuesta"
              className="w-full p-2 border rounded-md"
            />
            <div className="flex space-x-2 mt-2">
              <button
                className="p-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => (setRes(""), setSel(null))}
              >
                Enviar
              </button>
              <button
                className="p-2 bg-gray-200 text-gray-600 rounded-md"
                onClick={() => setSel(null)}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <h2>Mensajes</h2>
          {mensajesAgrupados.map((grupo, i) => (
            <div
              key={i}
              onClick={() => setSel(grupo)}
              className="bg-white bg-opacity-50 p-2 mb-2 rounded-md cursor-pointer"
            >
              <h2 className="text-base font-bold uppercase">{grupo.r}</h2>
              <p className="text-sm">
                {grupo.conversacion[grupo.conversacion.length - 1].f}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around bg-gray-50">
        <button
          className="flex flex-col items-center p-2"
          onClick={() =>
            (window.location.href =
              "https://http://www.cronicasdelosecosperdidos.com/clonemobile1/")
          }
        >
          <img
            src="https://img.icons8.com/ios/24/000000/home.png"
            alt="home-icon"
          />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <img
            src="https://img.icons8.com/ios/24/000000/phone.png"
            alt="phone-icon"
          />
          <span className="text-xs">Llamadas</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <img
            src="https://img.icons8.com/ios/24/000000/web.png"
            alt="browser-icon"
          />
          <span className="text-xs">Navegador</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <img
            src="https://img.icons8.com/ios/24/000000/music.png"
            alt="music-icon"
          />
          <span className="text-xs">Música</span>
        </button>
        <button className="flex flex-col items-center p-2">
          <img
            src="https://img.icons8.com/ios/24/000000/clock.png"
            alt="clock-icon"
          />
          <span className="text-xs">Alarmas</span>
        </button>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-25 pointer-events-none z-10"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-photo/fissured-glass-texture_23-2149428051.jpg)",
        }}
      />
    </div>
  );
};
export default Mensajes;
