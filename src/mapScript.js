//TO-DO: Hide API key, 
//       hide group ID, 
//       Update the map without refresh, 
//       Calculate AQI and add it to the circle value,
//       Change circle color depending on the AQI level

//Makes Map
function initMap() {
  const map = L.map("map").setView([38.7849, -76.8721], 10);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    }
  ).addTo(map);
  return map;
}

//Adds Circles to each sensor's location
function addCircles(map, collection) {
  console.log(collection.length);
  collection.forEach((index) => {
    console.log(index);
    const circle = L.circleMarker([index[4], index[5]], {
      color: "green",
      fillColor: "green",
      fillOpacity: 0.7,
      radius: 15,
    }).addTo(map);

    const popUpMessage = `
    <div style="
            background-color: yellow;
            padding: 15px;
            border-radius: 10px">
      <strong>Label: </strong>  ${index[1]} <br/>
      <strong>Sensor ID: </strong> ${index[0]}  <br/>
      <strong>Temperature: </strong> ${index[2]} <br/>
    </div>
    `;
    //Adds Pop Up Message when a circle is clicked
    circle.bindPopup(popUpMessage);

    //Adds Temp value to the circles
    const myIcon = L.divIcon({
      className: "my-div-icon",
      html: "<strong>" + index[2] + "</strong>",
      iconAnchor: [6, 9],
    });
    L.marker([index[4], index[5]], {
      icon: myIcon,
    }).addTo(map);
  });
}

function mainEvent() {
  const myMap = initMap();

  async function getSensorsData() {
    const response = await fetch(
      "https://api.purpleair.com/v1/groups/1039/members?fields=name,temperature,humidity,latitude,longitude",
      {
        headers: {
          "X-API-Key": "14349495-BB81-11EC-B330-42010A800004",
        },
      }
    );
    const result = await response.json();

    addCircles(myMap, result.data);
  }

  getSensorsData();
}

//Loads the map with the API data
document.addEventListener("DOMContentLoaded", async () => mainEvent());
