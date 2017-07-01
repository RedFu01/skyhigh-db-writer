'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.parseLine = parseLine;
exports.entry2WayPoint = entry2WayPoint;

var _terraformer = require('terraformer');

var _terraformer2 = _interopRequireDefault(_terraformer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseLine(line) {
    const array = line2Array(line);
    return parseEntry(array);
}

function entry2WayPoint(entry) {
    return {
        ts: entry.timestamp,
        pos: {
            lat: entry.lat,
            lng: entry.lng
        },
        track: entry.track,
        altitude: entry.altitude,
        horizontalSpeed: entry.horizontalSpeed,
        verticalSpeed: entry.verticalSpeed

    };
}

function line2Array(lineString) {
    const array = lineString.split(',');
    array.splice(0, 1);
    return array;
}

function parseEntry(array) {
    return {
        key: array[0].trim(),
        timestamp: Number(array[11]),
        registrationNumber: array[1].trim(),
        lat: Number(array[2]),
        lng: Number(array[3]),
        track: Number(array[4]),
        altitude: Number(array[5]),
        horizontalSpeed: Number(array[6]),
        squawk: array[7].trim(),
        radar: array[8].trim(),
        aircraftType: array[9].trim(),
        registration: array[10].trim(),
        startAirport: array[12].trim(),
        endAirport: array[13].trim(),
        flightNumber: array[14].trim(),
        verticalSpeed: Number(array[16]),
        internationalFlightNumber: array[17].trim()
    };
}