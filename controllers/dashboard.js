"use strict";

const logger = require("../utils/logger");
const stationList = require("../models/station-list");
const uuid = require("uuid");
const stationAnalytics = require("../utils/station-analytics");
const accounts = require ('./accounts.js');

const dashboard = {
   index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationAnalytics.alphaStationList(stationList.getAllStations(loggedInUser.id));

   const station = stationList.getAllStations();
    for (let i=0; i<stations.length; i++) {
      let station = stations[i];
      if (station.readings.length > 0) {
        station.latestReading = station.readings[station.readings.length - 1];
        station.weatherCode = stationAnalytics.codeToText(Number(station.latestReading.code));
        station.iconClass = stationAnalytics.weatherIcon(Number(station.latestReading.code));
        station.fahrenheit = stationAnalytics.fahrenheit(Number(station.latestReading.temp));
        station.beaufort = stationAnalytics.beaufort(Number(station.latestReading.windSpeed));
        station.windDirection = stationAnalytics.windCompass(Number(station.latestReading.windDirection));
        station.windChill = stationAnalytics.windChillCalc(station.latestReading.temp, station.fahrenheit);
        station.minTemp = stationAnalytics.getMinTemp(station);
        station.maxTemp = stationAnalytics.getMaxTemp(station);
        station.minWind = stationAnalytics.getMinWind(station);
        station.maxWind = stationAnalytics.getMaxWind(station);
        station.minPressure = stationAnalytics.getMinPressure(station);
        station.maxPressure = stationAnalytics.getMaxPressure(station);  
        station.tempTrend =  stationAnalytics.tempTrend(station);
        station.tempArrow = stationAnalytics.trendArrow(station.tempTrend);
        station.windTrend =  stationAnalytics.windTrend(station);
        station.windArrow = stationAnalytics.trendArrow(station.windTrend);
        station.pressureTrend =  stationAnalytics.pressureTrend(station);
        station.pressureArrow = stationAnalytics.trendArrow(station.pressureTrend);
      }
    }
    
    const viewData = {
      title: "Station Dashboard",
      stations: stationList.getUserStations(loggedInUser.id)
    };
    logger.info("about to render", stationList.getAllStations());
    response.render("dashboard", viewData);
  },
    
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationList.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      lat: request.body.lat,
      lng: request.body.lng,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationList.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;