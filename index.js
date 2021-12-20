const $panel = document.getElementById("panel");

window.objective = {
  latitude: 4.579640132711541,
  longitude: -74.12091200066551,
};

setInterval(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    window.myPosition = position.coords;
  
    initMARK();
  }, (error) => {
    console.error(error);
  });
}, 500);

function calculateDistance({ objective, myPosition }) {
  const lat = (objective.latitude - myPosition.latitude) ** 2;
  const lon = (objective.longitude - myPosition.longitude) ** 2;

  return {
    distance: Math.sqrt(lat + lon) * 1000,
    lat,
    lon
  };
}

function initMARK() {
  const {
    distance,
    lat,
    lon
  } = calculateDistance({
    objective: window.objective,
    myPosition: window.myPosition,
  });

  const ejeX = lon < 0 ? "izquierda" : "derecha";
  const ejeY = lat < 0 ? "ve atras" : "sigue derecho";

  $panel.innerHTML = `
    <strong>Ve a la ${ejeX}, ${ejeY}</strong>
    ${distance.toFixed(3)}m
  `;
}
