import getData from '../utils/getData';
import getHash from '../utils/getHash';

const Launch = async () => {
  const id = getHash();
  const flights = await getData();
  const flight = flights[id];

  if (!flight) {
    return `
      <div style="text-align: center; padding: 4rem 2rem;">
        <div class="no-results">
          <p style="font-size: 4rem; margin-bottom: 1rem;">✈️</p>
          <h2 style="color: var(--acento-azul); margin-bottom: 1rem;">Vuelo no encontrado</h2>
          <p style="margin-bottom: 2rem;">El vuelo que estás buscando no existe</p>
          <a href="#/" style="
            display: inline-block;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--acento-azul) 0%, #0099cc 100%);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            transition: transform 0.3s ease;
          ">
            🏠 Volver al inicio
          </a>
        </div>
      </div>
    `;
  }

  const fecha = new Date(flight.date);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <div style="max-width: 900px; margin: 0 auto; animation: fadeInUp 0.6s ease;">
      <a href="#/" style="
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--acento-azul);
        text-decoration: none;
        font-weight: 600;
        margin-bottom: 2rem;
        transition: transform 0.3s ease;
      " onmouseover="this.style.transform='translateX(-5px)'" onmouseout="this.style.transform='translateX(0)'">
        ← Volver a búsqueda
      </a>

      <div class="search-container" style="margin-top: 2rem;">
        <div style="text-align: center; margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; margin-bottom: 1rem;">
            ✈️ ${flight.origin} → ${flight.destination}
          </h1>
          <p style="color: var(--texto-claro); font-size: 1.1rem;">
            Detalles completos del vuelo
          </p>
        </div>

        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        ">
          <div class="card" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">📅</div>
            <h3 style="color: var(--acento-azul); margin-bottom: 0.5rem;">Fecha y hora</h3>
            <p style="font-size: 1.1rem;">${fechaFormateada}</p>
          </div>

          <div class="card" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">💵</div>
            <h3 style="color: var(--acento-azul); margin-bottom: 0.5rem;">Precio</h3>
            <p class="price" style="font-size: 2.5rem !important; margin: 0;">
              $${flight.price.toFixed(2)}
            </p>
          </div>

          <div class="card" style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">💺</div>
            <h3 style="color: var(--acento-azul); margin-bottom: 0.5rem;">Disponibilidad</h3>
            <p style="font-size: 1.5rem; font-weight: 700;">
              ${flight.availability} asientos
            </p>
          </div>
        </div>

        <div style="
          margin-top: 3rem;
          padding: 2rem;
          background: linear-gradient(135deg, var(--grafito-claro) 0%, var(--grafito-medio) 100%);
          border-radius: 16px;
          border: 2px solid var(--acento-azul);
        ">
          <h3 style="color: var(--acento-azul); margin-bottom: 1rem; font-size: 1.5rem;">
            📋 Información del viaje
          </h3>
          <div style="display: grid; gap: 1rem;">
            <p style="display: flex; justify-content: space-between; padding: 1rem; background: var(--grafito-oscuro); border-radius: 8px;">
              <strong>🛫 Origen:</strong>
              <span>${flight.origin}</span>
            </p>
            <p style="display: flex; justify-content: space-between; padding: 1rem; background: var(--grafito-oscuro); border-radius: 8px;">
              <strong>🛬 Destino:</strong>
              <span>${flight.destination}</span>
            </p>
            <p style="display: flex; justify-content: space-between; padding: 1rem; background: var(--grafito-oscuro); border-radius: 8px;">
              <strong>⏰ Hora de salida:</strong>
              <span>${fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          </div>
        </div>

        <div style="
          margin-top: 2rem;
          text-align: center;
        ">
          <button style="
            padding: 1.2rem 3rem;
            font-size: 1.2rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--acento-naranja) 0%, #ff8c42 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
            text-transform: uppercase;
            letter-spacing: 1px;
          " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 25px rgba(255, 107, 53, 0.6)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255, 107, 53, 0.4)'" onclick="alert('¡Función de reserva próximamente! 🎉')">
            🎫 Reservar ahora
          </button>
          <p style="margin-top: 1rem; color: var(--texto-claro); font-size: 0.9rem;">
            * La reserva te redirigirá al sitio oficial de Flybondi
          </p>
        </div>
      </div>
    </div>
  `;
};

export default Launch;