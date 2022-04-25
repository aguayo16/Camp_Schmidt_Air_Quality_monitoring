// 102898, PGCPS_Schmidt_CenterBldg (outside) ID 102898
// 104786, PGCPS_Schmidt_Orme (outside) ID 104786 currently offline
// 102890, PGCPS_GwynnPHS_Temp3 (outside)
// 102830, PGCPS_LargoIntl_Rm125 (outside)
// 131815, Riverdale Park (outside)
// 114799, Cheverly (outside)
// 53775, CheverlyAQM_W2_2 (outside)
// 53677, CheverlyAQM_W1_1 (outside)
// 53663, CheverlyAQM_W1_3 (outside)
// 57841, CheverlyAQM_W3_1 (outside)
// 52833, CheverlyAQM_W1_2 (outside)


const URL = 'https://api.purpleair.com/v1/sensors/114799?api_key=14349495-BB81-11EC-B330-42010A800004';
async function getData () {
    const response = await fetch(URL);
    const data = await response.json();
   
    const airQua = "pm1.0"
    document.getElementById('sensor_name').textContent = "Location: " + data.sensor.name;
    document.getElementById('temp').textContent = "Temperature: " + data.sensor.temperature;
    document.getElementById('humi').textContent = "Humidity: " + data.sensor.humidity;
    document.getElementById('pm').textContent = "Air Quality (PM): " + data.sensor["pm1.0"];
}
getData();

function initGroup() {

    const url = "https://api.purpleair.com/v1/groups";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-Key", "14353505-BB81-11EC-B330-42010A800004");

    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
       }};

    const data = '{"name":"My Group"}';

    xhr.send(data);
}

// TODO - Member ID updates every refresh
function addSensor() {

    const url = "https://api.purpleair.com/v1/groups/970/members";

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-API-Key", "14353505-BB81-11EC-B330-42010A800004");

    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
       }};

    const data = '{"sensor_index":"131815"}';

    xhr.send(data);
}


initGroup();
addSensor();


