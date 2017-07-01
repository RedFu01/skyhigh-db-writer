'use strict';

var _mongojs = require('mongojs');

var _mongojs2 = _interopRequireDefault(_mongojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';
const connectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const db = (0, _mongojs2.default)(connectionString);
const collection = process.argv[2];
db[collection].drop((err, res) => {
                         console.log(err, res);
});