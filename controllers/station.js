"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-list");
const uuid = require("uuid");
const stationAnalytics = require("../utils/station-analytics");

const station = {
  index(request, response) {
    const stationId = request.params.id;

    let latestReading = null;
    let weatherCode = null;
    let iconClass = null;
    let fahrenheit = null;
    let beaufort = null;
    let windDirection = null;
    let windChill = null;
    let minTemp = null;
    let maxTemp = null;
    let minWind = null;
    let maxWind = null;
    let minPressure = null;
    let maxPressure = null;
    let tempTrend = null;
    let tempArrow = null;
    let windTrend = null;
    let windArrow = null;
    let pressureTrend = null;
    let pressureArrow = null;
        
    const station = stationList.getStation(stationId);
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
      weatherCode = stationAnalytics.codeToText(Number(latestReading.code));
      iconClass = stationAnalytics.weatherIcon(Number(latestReading.code));
      fahrenheit = stationAnalytics.fahrenheit(Number(latestReading.temp));
      beaufort = stationAnalytics.beaufort(Number(latestReading.windSpeed));
      windDirection = stationAnalytics.windCompass(Number(latestReading.windDirection));
      windChill = stationAnalytics.windChillCalc(latestReading.temp, fahrenheit);
      minTemp = stationAnalytics.getMinTemp(station);
      maxTemp = stationAnalytics.getMaxTemp(station);
      minWind = stationAnalytics.getMinWind(station);
      maxWind = stationAnalytics.getMaxWind(station);
      minPressure = stationAnalytics.getMinPressure(station);
      maxPressure = stationAnalytics.getMaxPressure(station);
      tempTrend =  stationAnalytics.tempTrend(station);
      tempArrow = stationAnalytics.trendArrow(tempTrend);
      windTrend =  stationAnalytics.windTrend(station);
      windArrow = stationAnalytics.trendArrow(windTrend);
      pressureTrend =  stationAnalytics.pressureTrend(station);
      pressureArrow = stationAnalytics.trendArrow(pressureTrend);
    }
    logger.debug("Station id = ", stationId);
    console.log("MinTemp : " + minWind+ " " + maxWind); 
     
    const viewData = {
      title: "Station",
      station: stationList.getStation(stationId),
      latestReading: latestReading,
      weatherCode: weatherCode,
      iconClass : iconClass,
      fahrenheit : fahrenheit,
      beaufort : beaufort,
      windDirection : windDirection,
      windChill : windChill,
      minTemp : minTemp,
      maxTemp : maxTemp,
      minWind : minWind,
      maxWind : maxWind,
      minPressure : minPressure,
      maxPressure : maxPressure,
      tempTrend : tempTrend,
      tempArrow : tempArrow,
      windTrend : windTrend,
      windArrow : windArrow,
      pressureTrend : pressureTrend,
      pressureArrow : pressureArrow
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationList.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationList.getStation(stationId);
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timeStamp = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +', '+time;
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      timeStamp: timeStamp
    };
    logger.debug("New Reading = ", newReading);
    console.log("Timestamp " + timeStamp);
    stationList.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  
};

module.exports = station;
