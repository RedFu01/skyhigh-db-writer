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
    const wayPoint = parseLine(line);
    if (!doneFlights.includes(wayPoint.key)) {
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
    console.log('Done')
});

async function writeFlight(flight) {
    try {
        await DB.insert(fileName, flight.export());
    } catch (e) {
        console.log(e)
    }
    console.log(`inserted ${finishedIndex++} of ${index}`);
}