'use strict';

var _lineByLine = require('line-by-line');

var _lineByLine2 = _interopRequireDefault(_lineByLine);

var _lineParser = require('./utils/lineParser');

var _DB = require('./utils/DB');

var _DB2 = _interopRequireDefault(_DB);

var _Flight = require('./utils/Flight');

var _Flight2 = _interopRequireDefault(_Flight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");
//


const fileName = process.argv[2];

const reader = new _lineByLine2.default(`./resrc/${fileName}.csv`);

const flights = {};
const doneFlights = [];
let index = 0;
let finishedIndex = 0;

reader.on('error', err => {
    console.error('An error occured: ');
    console.error(err);
});

reader.on('line', line => {
    index++;
    const wayPoint = (0, _lineParser.parseLine)(line);
    if (isInBounds(wayPoint.lat, wayPoint.lng) && !doneFlights.includes(wayPoint.key)) {
        if (flights[wayPoint.key]) {
            flights[wayPoint.key].addPoint((0, _lineParser.entry2WayPoint)(wayPoint));
        } else {
            flights[wayPoint.key] = new _Flight2.default(wayPoint);
        }
        if (flights[wayPoint.key].isLanded()) {
            writeFlight(flights[wayPoint.key]);
            delete flights[wayPoint.key];
            doneFlights.push(wayPoint.key);
        }
    }
});

reader.on('end', () => {
    Object.keys(flights).map(function _callee(key) {
        return regeneratorRuntime.async(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
                case 0:
                    writeFlight(flights[key]);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }, null, this);
    });
    clearInterval(interval);
    console.log('Done');
});

function writeFlight(flight) {
    return regeneratorRuntime.async(function writeFlight$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
            case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return regeneratorRuntime.awrap(_DB2.default.insert(fileName, flight.export()));

            case 3:
                _context2.next = 8;
                break;

            case 5:
                _context2.prev = 5;
                _context2.t0 = _context2['catch'](0);

                console.log(_context2.t0);

            case 8:
            case 'end':
                return _context2.stop();
        }
    }, null, this, [[0, 5]]);
}

const BOUNDS = {
    minLat: 30,
    maxLat: 65,
    minLng: -55,
    maxLng: -10
};

function isInBounds(lat, lng, bounds = BOUNDS) {
    let { minLat, maxLat, minLng, maxLng } = bounds;
    return lat && lng && lat <= maxLat && lat >= minLat && lng <= maxLng && lng >= minLng;
}

const interval = setInterval(() => console.log(`${index} lines processed, ${doneFlights.length} saved, ${Object.keys(flights).length} in queue`), 1000 * 30);