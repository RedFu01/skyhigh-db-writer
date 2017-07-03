'use strict';

var _DB = require('./utils/DB');

var _DB2 = _interopRequireDefault(_DB);

var _Flight = require('./utils/Flight');

var _Flight2 = _interopRequireDefault(_Flight);

var _flightUtils = require('./utils/flightUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

const startTime = 1408752000;
const endTime = startTime + 60 * 60 * 24 * 3;
const deltaT = 60;

function main() {
    var flights, t, positionMap, i, position;
    return regeneratorRuntime.async(function main$(_context) {
        while (1) switch (_context.prev = _context.next) {
            case 0:
                _context.prev = 0;
                _context.next = 3;
                return regeneratorRuntime.awrap(_DB2.default.find('n_new2_flightdata_2014-08-23', {}));

            case 3:
                flights = _context.sent;


                console.log(`Found: ${flights.length}`);

                t = startTime;

            case 6:
                if (!(t < endTime)) {
                    _context.next = 23;
                    break;
                }

                console.log('t', t);
                positionMap = [];
                i = 0;

            case 10:
                if (!(i < flights.length)) {
                    _context.next = 18;
                    break;
                }

                //console.log('f', i)
                position = (0, _flightUtils.getPositionAtMoment)(flights[i], t);

                if (position) {
                    _context.next = 14;
                    break;
                }

                return _context.abrupt('continue', 15);

            case 14:
                positionMap.push([position.lat, position.lng]);

            case 15:
                i++;
                _context.next = 10;
                break;

            case 18:
                _context.next = 20;
                return regeneratorRuntime.awrap(_DB2.default.insert('posMap', { id: t, positionMap }));

            case 20:
                t += deltaT;
                _context.next = 6;
                break;

            case 23:
                console.log('Done');
                _context.next = 29;
                break;

            case 26:
                _context.prev = 26;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

            case 29:
            case 'end':
                return _context.stop();
        }
    }, null, this, [[0, 26]]);
}

main();