let vuelos = [];

// Carga dataset.json
export async function cargarVuelos() {
  try {
    const res = await fetch('/dataset.json'); // ⚡ Cambiar './' por '/'
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    vuelos = await res.json();
    console.log(`✅ ${vuelos.length} vuelos cargados`);
  } catch (error) {
    console.error('❌ Error cargando dataset:', error);
  }
}

// Filtra vuelos según presupuesto
export function buscarVuelosPorPresupuesto(budget) {
  return vuelos.filter(v => v.price <= budget);
}