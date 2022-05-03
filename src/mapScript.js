import * as AQIcalculator from './AQIcalculator.js';
//TO-DO: Hide API key,
//       hide group ID,
//       Update the map without refresh,
//       Add Marker Clusters for better functionality and look (If there is time)

//Makes Map
function initMap() {
  const map = L.map("map", {
    //Figure out the smoothest  zooming for usability
    zoomSnap: 0.1,
    zoomDelta: 0,
  }).setView([38.7849, -76.8721], 10);

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

//Changes circle color based on value
function setStatusColor(aqi) {
  let color = '';

  if (aqi >= 301) {
      color = '#7e0022';
  } else if (aqi >= 201) {
      color = '#8f3f97';
  } else if (aqi >= 151) {
      color = '#ff0100';
  }else if (aqi >= 101) {
      color = '#ff7d00';
  }else if (aqi >= 51) {
      color = '#feff00';
  }else if (aqi >= 0) {
      color = '#00e400';
  }else {
      color = '#969696';
  }
  
  return color;
}

//Adds Circles to each sensor's location
function addCircles(map, collection) {
  console.log(collection.length);
  collection.forEach((index) => {
    console.log(index);

    const calculatedAQI = AQIcalculator.aqiFromPM(parseFloat(index[6]));
    const AQIdescription = AQIcalculator.getAQIDescription(calculatedAQI);

    console.log(calculatedAQI);
    const circle = L.circleMarker([index[4], index[5]], {
      color: setStatusColor(calculatedAQI),
      fillColor: setStatusColor(calculatedAQI),
      fillOpacity: 0.8,
      radius: 15,
    }).addTo(map);

    map.on('click', function(e) {
      map.flyTo(e.latlng, 13, {
        animate: true,
        duration: 1.5
      });
    });

    L.gridLayer({updateWhenZooming: false});

    const popUpMessage = `
    <div style="
            text-align: center;
            background-color: yellow;
            padding: 15px;
            border-radius: 10px
            width: 500px">
      <strong>Label: </strong>  ${index[1]} <br/>
      <strong>Sensor ID: </strong> ${index[0]}  <br/>
      <strong>AQI: </strong> ${calculatedAQI} <br/>
      <strong>AQI Status Description: </strong> ${AQIdescription} <br/>
    </div>
    `;

    //Adds Pop Up Message when a circle is clicked
    circle.bindPopup(popUpMessage);

    //Centers Pop Up message in the circle when clicked
    circle.on("click", function (ev) {
      circle.openPopup(circle.getLatLng());
    });

    //Adds Temp value to the circles
    const myIcon = L.divIcon({
      className: "my-div-icon",
      html: `<strong style="color: black" >` + calculatedAQI + `</strong>`,
  
      iconAnchor: [6, 9],
    });
    L.marker([index[4], index[5]], {
      icon: myIcon,
    }).addTo(map);
  });
}

async function mainEvent() {
  const myMap = initMap();

  const response = await fetch(
    "https://api.purpleair.com/v1/groups/1039/members?fields=name,temperature,humidity,latitude,longitude,pm2.5",
    {
      headers: {
        "X-API-Key": "14349495-BB81-11EC-B330-42010A800004",
      },
    }
  );
  const result = await response.json();
  addCircles(myMap, result.data);

  
  
}

//Loads the map with the API data
document.addEventListener("DOMContentLoaded", async () => mainEvent());
