"use strict";

const stationList = require('../models/station-list.js');

const stationAnalytics = {

  getLatestReading(stationId) {
    let latestReading = null;
    const station = stationList.getStation(stationId)
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length-1];  
    }
    return latestReading;
  },
  
  codeToText(code) {
     switch (code) {
      case 100:
        return "Clear";
      case 200:
        return "Partial Clouds";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers";
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "Miskate";
    }
  },
  
  weatherIcon(code){
   switch (code) {
      case 100:
        return "sun icon";
      case 200:
        return "cloud sun icon";
      case 300:
        return "cloud icon";
      case 400:
        return "cloud sun rain icon";
      case 500:
        return "cloud showers heavy icon";
      case 600:
        return "cloud rain icon";
      case 700:
        return "snowflake icon";
      case 800:
        return "poo storm icon";
      default:
        return "error";
    }
  },
  
  fahrenheit(centigrade) {
    let fahrenheit;
    fahrenheit = (centigrade * 9 / 5) + 32;
    return fahrenheit;
  },
  
  beaufort(windSpeed) {
  let beaufort;
   if (windSpeed <= 1) {
      beaufort = 0;
    } else if (windSpeed > 1 && windSpeed <= 5) {
      beaufort = 1;
    } else if (windSpeed > 5 && windSpeed <= 11) {
      beaufort = 2;
    } else if (windSpeed > 11 && windSpeed <= 19) {
      beaufort = 3;
    } else if (windSpeed > 19 && windSpeed <= 28) {
      beaufort = 4;
    } else if (windSpeed > 28 && windSpeed <= 38) {
      beaufort = 5;
    } else if (windSpeed > 38 && windSpeed <= 49) {
      beaufort = 6;
    } else if (windSpeed > 49 && windSpeed <= 61) {
      beaufort = 7;
    } else if (windSpeed > 61 && windSpeed <= 74) {
      beaufort = 8;
    } else if (windSpeed > 74 && windSpeed <= 88) {
      beaufort = 9;
    } else if (windSpeed > 88 && windSpeed <= 102) {
      beaufort = 10;
    } else if (windSpeed > 102 && windSpeed <= 117) {
      beaufort = 11;
    }
    return beaufort;
  },

  windCompass(windDirectionDegrees) {
    let windDirectionText = "";
    if ((windDirectionDegrees > 348.75 && windDirectionDegrees <= 360)
        || (windDirectionDegrees >= 0 && windDirectionDegrees <= 11.25)) {
      windDirectionText = "North";
    } else if (windDirectionDegrees > 11.25 && windDirectionDegrees <= 33.75) {
      windDirectionText = "North North East";
    } else if (windDirectionDegrees > 33.75 && windDirectionDegrees <= 56.25) {
      windDirectionText = "North East";
    } else if (windDirectionDegrees > 56.25 && windDirectionDegrees <= 78.75) {
      windDirectionText = "East North East";
    } else if (windDirectionDegrees > 78.75 && windDirectionDegrees <= 101.25) {
      windDirectionText = "East";
    } else if (windDirectionDegrees > 101.25 && windDirectionDegrees <= 123.75) {
      windDirectionText = "East South East";
    } else if (windDirectionDegrees > 123.75 && windDirectionDegrees <= 146.25) {
      windDirectionText = "South East";
    } else if (windDirectionDegrees > 146.25 && windDirectionDegrees <= 168.75) {
      windDirectionText = "South South East";
    } else if (windDirectionDegrees > 168.75 && windDirectionDegrees <= 191.25) {
      windDirectionText = "South";
    } else if (windDirectionDegrees > 191.25 && windDirectionDegrees <= 213.75) {
      windDirectionText = "South South West";
    } else if (windDirectionDegrees > 213.75 && windDirectionDegrees <= 236.25) {
      windDirectionText = "South West";
    } else if (windDirectionDegrees > 236.25 && windDirectionDegrees <= 258.75) {
      windDirectionText = "West South West";
    } else if (windDirectionDegrees > 258.75 && windDirectionDegrees <= 281.25) {
      windDirectionText = "West";
    } else if (windDirectionDegrees > 281.25 && windDirectionDegrees <= 303.75) {
      windDirectionText = "West North West";
    } else if (windDirectionDegrees > 303.75 && windDirectionDegrees <= 326.25) {
      windDirectionText = "North West";
    } else if (windDirectionDegrees > 326.25 && windDirectionDegrees <= 348.75) {
      windDirectionText = "North North West";
    } else {
      windDirectionText = "Error";
    }
    return windDirectionText;
  },
  
  windChillCalc(tempCelcius, windSpeed) {
    let windChill;
    windChill = (13.12 + (0.6215 * tempCelcius) - 11.37 * (Math.pow(windSpeed, 0.16))
        + (0.3965 * tempCelcius) * (Math.pow(windSpeed, 0.16)));
    return Math.round(windChill * 100.0) / 100.0;
  },
  
  getMinTemp(station) {
    let minTemp= null;
    if (station.readings.length > 0) {
     minTemp = station.readings[0].temp;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].temp < minTemp) {
          minTemp = station.readings[i].temp;
        }
      }
    }
    return minTemp;
  },
  
   getMaxTemp(station) {
    let maxTemp= null;
    if (station.readings.length > 0) {
     maxTemp = station.readings[0].temp;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].temp > maxTemp) {
          maxTemp = station.readings[i].temp;
        }
      }
    }
    return maxTemp;
  },
  
  getMinWind(station) {
    let minWind= null;
    if (station.readings.length > 0) {
     minWind = station.readings[0].windSpeed;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWind) {
          minWind = station.readings[i].windSpeed;
        }
      }
    }
    return minWind;
  },
  
   getMaxWind(station) {
    let maxWind= null;   
    if (station.readings.length > 0) {
     maxWind = station.readings[0].windSpeed;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWind) {
          maxWind = station.readings[i].windSpeed;
        }
      }
    }
    return maxWind;
  },
  
  getMinPressure(station) {
    let minPressure= null;
    if (station.readings.length > 0) {
     minPressure = station.readings[0].pressure;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
    }
    return minPressure;
  },
  
   getMaxPressure(station) {  
    let maxPressure= null; 
    if (station.readings.length > 0) {
     maxPressure = station.readings[0].pressure;
      for (let i=0; i<station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
    }
    return maxPressure;
  },
  
  tempTrend(station) {
    let readingOne = null;
    let readingTwo = null;
    let readingThree = null;
    let rising = 0;

    if (station.readings.length >= 3) {
      readingOne = station.readings[station.readings.length - 1].temp;
      readingTwo = station.readings[station.readings.length-2].temp;
      readingThree = station.readings[station.readings.length-3].temp;
      if ((readingThree < readingTwo) && (readingTwo < readingOne)) {
        rising = 1;

      } else if ((readingThree > readingTwo) && (readingTwo > readingOne)) {
        rising = 2;
      }
    } else {
      rising = 0;
    }
    return rising;
  },
  
  windTrend(station) {
    let readingOne = null;
    let readingTwo = null;
    let readingThree = null;
    let rising = 0;
     
   if (station.readings.length >= 3) {
      readingOne = station.readings[station.readings.length - 1].windSpeed;
      readingTwo = station.readings[station.readings.length-2].windSpeed;
      readingThree = station.readings[station.readings.length-3].windSpeed;
      if ((readingThree < readingTwo) && (readingTwo < readingOne)) {
        rising = 1;

      } else if ((readingThree > readingTwo) && (readingTwo > readingOne)) {
        rising = 2;
      }
    } else {
      rising = 0;
    }
    return rising;
  },
  
  pressureTrend(station) {
    let readingOne = null;
    let readingTwo = null;
    let readingThree = null;
    let rising = 0;
     
   if (station.readings.length >= 3) {
      readingOne = station.readings[station.readings.length - 1].pressure;
      readingTwo = station.readings[station.readings.length-2].pressure;
      readingThree = station.readings[station.readings.length-3].pressure;
      if ((readingThree < readingTwo) && (readingTwo < readingOne)) {
        rising = 1;

      } else if ((readingThree > readingTwo) && (readingTwo > readingOne)) {
        rising = 2;
      }
    } else {
      rising = 0;
    }
    return rising;
  },
  
  trendArrow(rising) {
    switch (rising) {
      case 1:
        return "arrow up icon";
      case 2:
        return "arrow down icon";
      case 0:
        return "";
      default:
        return "Error";
    }
  },
  
  alphaStationList(stations) {
    stations.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
    return stations;
  }
  
  
};

module.exports = stationAnalytics;