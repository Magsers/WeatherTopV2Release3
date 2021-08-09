"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationList = {
  store: new JsonStore("./models/station-list.json", {
    stationList: []
  }),
  collection: "stationList",

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStationss() {
    this.store.removeAll(this.collection);
    this.store.save();
  },
  
  getAllReadings(id) {
    const station = this.getStation(id);
    const readings = station.readings;
    return readings;
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },

   removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  
  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = stationList;