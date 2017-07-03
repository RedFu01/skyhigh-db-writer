'use strict';

var _DB = require('./utils/DB');

var _DB2 = _interopRequireDefault(_DB);

var _Flight = require('./utils/Flight');

var _Flight2 = _interopRequireDefault(_Flight);

var _flightUtils = require('./utils/flightUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-polyfill");

const startTime = 1408752000;
const endTime = startTime + 60 * 60 * 24;
const deltaT = 60;

function main() {
    var pMap;
    return regeneratorRuntime.async(function main$(_context) {
        while (1) switch (_context.prev = _context.next) {
            case 0:
                _context.prev = 0;
                _context.next = 3;
                return regeneratorRuntime.awrap(_DB2.default.find('posMap_3', {}));

            case 3:
                pMap = _context.sent;

                console.log(pMap[0]);
                _context.next = 10;
                break;

            case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

            case 10:
            case 'end':
                return _context.stop();
        }
    }, null, this, [[0, 7]]);
}

main();