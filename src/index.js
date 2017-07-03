require("babel-polyfill");
//
import Reader from 'line-by-line';
import { parseLine, entry2WayPoint } from './utils/lineParser';
import DB from './utils/DB';
import Flight from './utils/Flight';

const fileName = process.argv[2];

const reader = new Reader(`./resrc/${fileName}.csv`);

const flights = {};
const doneFlights = [];
let index = 0;
let finishedIndex = 0;


reader.on('error', (err) => {
    console.error('An error occured: ');
    console.error(err);
});

reader.on('line', (line) => {
    index++;
    const wayPoint = parseLine(line);
    if (isInBounds(wayPoint.lat, wayPoint.lng) && !doneFlights.includes(wayPoint.key)) {
        if (flights[wayPoint.key]) {
            flights[wayPoint.key].addPoint(entry2WayPoint(wayPoint));
        } else {
            flights[wayPoint.key] = new Flight(wayPoint);
        }
        if (flights[wayPoint.key].isLanded()) {
            writeFlight(flights[wayPoint.key]);
            delete flights[wayPoint.key];
            doneFlights.push(wayPoint.key);
        }
    }
});

reader.on('end', () => {
    Object.keys(flights).map(async function (key) {
        writeFlight(flights[key])
    })
    clearInterval(interval);
    console.log('Done')
});

async function writeFlight(flight) {
    try {
        await DB.insert('n_new2_' + fileName, flight.export());
    } catch (e) {
        console.log(e)
    }
    //console.log(`inserted ${finishedIndex++} of ${index}`);
}

const BOUNDS = {
    minLat: 30,
    maxLat: 65,
    minLng: -55,
    maxLng: -10
}

function isInBounds(lat, lng, bounds = BOUNDS) {
    let { minLat, maxLat, minLng, maxLng } = bounds;
    return lat && lng && lat <= maxLat && lat >= minLat && lng <= maxLng && lng >= minLng;
}

const interval = setInterval(() => console.log(`${index} lines processed, ${doneFlights.length} saved, ${Object.keys(flights).length} in queue`), 1000 * 30)
