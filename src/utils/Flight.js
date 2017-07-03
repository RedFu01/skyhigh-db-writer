import { entry2WayPoint } from './lineParser';
import Terraformer from 'terraformer';

export default class Flight {
    constructor(flightData) {
        this.data = {
            key: flightData.key,
            registrationNumber: flightData.registrationNumber,
            aircraftType: flightData.aircraftType,
            registration: flightData.registration,
            startAirport: flightData.startAirport,
            endAirport: flightData.endAirport,
            flightNumber: flightData.flightNumber,
            internationalFlightNumber: flightData.internationalFlightNumber,
            path: flightData.path || [entry2WayPoint(flightData)]
        }
    }

    merge(flight) {
        this.data.path.concat(flight.data.path);
    }

    addPoint(point) {
        this.data.path.push(point);
    }

    isLanded() {
        const path = this.data.path;
        const altitudeArray = path.map(p => p.altitude);
        const minAltitude = Math.min(...altitudeArray);
        const maxAltitude = Math.max(...altitudeArray);
        return this.data.path[this.data.path.length - 1].altitude <= 5 && (maxAltitude - minAltitude) > 1000;
    }

    sort() {
        this.data.path.sort((p1, p2) => p1.ts - p2.ts);
        this.data.depatureTime = this.data.path[0].ts;
        this.data.arrivalTime = this.data.path[this.data.path.length - 1].ts;
    }

    computeCover() {
        const path = this.data.path;
        const latArray = path.map(p => p.pos.lat);
        const lngArray = path.map(p => p.pos.lng);
        const minLat = Math.min(...latArray);
        const maxLat = Math.max(...latArray);
        const minLng = Math.min(...lngArray);
        const maxLng = Math.max(...lngArray);

        const multipoint = new Terraformer.MultiPoint([[minLng, minLat], [maxLng, maxLat], [minLng, maxLat], [maxLng, minLat]]);
        this.data.cover = multipoint.convexHull();
    }

    export() {
        this.sort();
        this.computeCover();
        return this.data;
    }

}