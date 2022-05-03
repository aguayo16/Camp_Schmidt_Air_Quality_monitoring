import * as AQIcalculator from './AQIcalculator.js';

async function getData(URL) {
    const response = await fetch(URL,
        {
          headers: {
            "X-API-Key": "14349495-BB81-11EC-B330-42010A800004",
          },
        }
      );
      const result = await response.json();

      const sensors  = result.data;
      return sensors;
      
}

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

async function mainEvent() {
    const humidityText = document.querySelectorAll('.humidity');
    const tempText = document.querySelectorAll('.temp');
    const pressureText = document.querySelectorAll('.pressure')
    const nameText = document.querySelectorAll('.sensor-name');
    const AQIvalue = document.querySelectorAll('.air-quality');
    const AQIstatus = document.querySelectorAll('.air-quality-status');
    const AQImessage = document.querySelectorAll('.message');
    const URL = "https://api.purpleair.com/v1/groups/1039/members?fields=name,temperature,humidity,pressure,pm2.5";
    let counter = 0;


    const sensorArray = await getData(URL)
    console.log(sensorArray);

    sensorArray.forEach(sensor => {
        const sensorName = sensor[1];
        const temp = sensor[2];
        const pressure = sensor[4];
        const humidity = sensor[3];

        humidityText[counter].textContent += (humidity===null) ? 'N/A' : humidity + " (RH)%"
        tempText[counter].textContent += (temp===null) ? 'N/A': temp + ' ˚F'
        pressureText[counter].textContent += (pressure===null) ? 'N/A' : pressure + ' Millibars'
        nameText[counter].textContent += sensorName
       
        //Calls AQIcalcultor file to convert PM2.5 -> AQI
        const calculatedAQI = AQIcalculator.aqiFromPM(parseFloat(sensor[5]));
       
        const AQIdescription = AQIcalculator.getAQIDescription(calculatedAQI);
        
        const AQImsg = AQIcalculator.getAQIMessage(calculatedAQI);
       
        AQIvalue[counter].textContent =  calculatedAQI;
        AQIstatus[counter].textContent = AQIdescription;
        AQIstatus[counter].style.color = setStatusColor(calculatedAQI);
        AQImessage[counter].textContent = AQImsg;

        counter++;
    });
    console.log(setStatusColor(105));
}


document.addEventListener("DOMContentLoaded", async () => mainEvent());