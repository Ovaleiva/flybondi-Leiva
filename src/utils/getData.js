// src/utils/getData.js
const getData = async () => {
  try {
    const res = await fetch('/dataset.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log(`✅ ${data.length} vuelos cargados`);
    return data;
  } catch (error) {
    console.error('❌ Error cargando datos:', error);
    return [];
  }
};

export default getData;