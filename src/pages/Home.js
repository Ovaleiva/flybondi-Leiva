import getData from '../utils/getData.js';

const Home = async () => {
  const html = `
    <h1>✈️ Encuentra tu vuelo ideal</h1>
    
    <div class="search-container">
      <h2>🔍 Buscar vuelos por presupuesto</h2>
      <div class="search-form">
        <div class="input-wrapper">
          <input 
            type="number" 
            id="budget" 
            placeholder="💰 Ingresá tu presupuesto (ej: 800)"
            min="0"
          >
        </div>
        <button id="buscar-vuelos">
          🚀 Buscar vuelos
        </button>
      </div>
    </div>

    <div id="resultados"></div>
  `;

  setTimeout(() => {
    const button = document.getElementById('buscar-vuelos');
    const input = document.getElementById('budget');

    if (button && input) {
      // Buscar al hacer clic
      button.addEventListener('click', buscarVuelos);

      // Buscar al presionar Enter
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          buscarVuelos();
        }
      });
    }
  }, 0);

  return html;
};

async function buscarVuelos() {
  const budgetInput = document.getElementById('budget');
  const budget = parseFloat(budgetInput.value);
  const container = document.getElementById('resultados');
  const button = document.getElementById('buscar-vuelos');

  // Validación
  if (isNaN(budget) || budget <= 0) {
    container.innerHTML = `
      <div class="no-results">
        <p>⚠️ Por favor, ingresá un presupuesto válido</p>
      </div>
    `;
    return;
  }

  // Mostrar loading
  button.innerHTML = '<span class="loading"></span> Buscando...';
  button.disabled = true;
  container.innerHTML = `
    <div class="no-results">
      <div class="loading" style="width: 50px; height: 50px; margin: 0 auto;"></div>
      <p style="margin-top: 1rem;">Buscando vuelos disponibles...</p>
    </div>
  `;

  try {
    const vuelos = await getData();
    const resultados = vuelos.filter(v => v.price <= budget);

    container.innerHTML = '';

    if (!resultados.length) {
      container.innerHTML = `
        <div class="no-results">
          <p style="font-size: 3rem; margin-bottom: 1rem;">😔</p>
          <p>No encontramos vuelos dentro de tu presupuesto de $${budget.toFixed(2)}</p>
          <p style="margin-top: 1rem; color: var(--acento-azul);">
            💡 Tip: Intentá aumentar tu presupuesto para ver más opciones
          </p>
        </div>
      `;
      return;
    }

    // Ordenar por precio (más baratos primero)
    resultados.sort((a, b) => a.price - b.price);

    resultados.forEach((vuelo, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.style.animationDelay = `${index * 0.1}s`;
      
      // Formatear fecha
      const fecha = new Date(vuelo.date);
      const fechaFormateada = fecha.toLocaleDateString('es-AR', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      div.innerHTML = `
        <h2>✈️ ${vuelo.origin} → ${vuelo.destination}</h2>
        <p><strong>📅 Fecha:</strong> ${fechaFormateada}</p>
        <p><strong>💺 Disponibilidad:</strong> ${vuelo.availability} asientos</p>
        <p class="price">💵 $${vuelo.price.toFixed(2)}</p>
      `;

      // Agregar evento de clic para ir al detalle
      div.addEventListener('click', () => {
        const vueloIndex = vuelos.indexOf(vuelo);
        window.location.hash = `#/${vueloIndex}`;
      });

      container.appendChild(div);
    });

    // Mostrar resumen
    const resumen = document.createElement('div');
    resumen.className = 'no-results';
    resumen.style.marginTop = '2rem';
    resumen.innerHTML = `
      <p style="color: var(--acento-azul); font-size: 1.2rem;">
        ✅ Encontramos <strong>${resultados.length}</strong> ${resultados.length === 1 ? 'vuelo' : 'vuelos'} 
        dentro de tu presupuesto de <strong>$${budget.toFixed(2)}</strong>
      </p>
      <p style="margin-top: 1rem; color: var(--texto-claro);">
        💰 Ahorro potencial: $${(budget - resultados[0].price).toFixed(2)}
      </p>
    `;
    container.insertBefore(resumen, container.firstChild);

  } catch (error) {
    container.innerHTML = `
      <div class="no-results">
        <p style="font-size: 3rem; margin-bottom: 1rem;">❌</p>
        <p>Hubo un error al cargar los vuelos</p>
        <p style="margin-top: 1rem; color: #888;">${error.message}</p>
      </div>
    `;
  } finally {
    button.innerHTML = '🚀 Buscar vuelos';
    button.disabled = false;
  }
}

export default Home;