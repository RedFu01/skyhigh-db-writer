'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongojs = require('mongojs');

var _mongojs2 = _interopRequireDefault(_mongojs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';

const env = 'TEST';

const liveConnectionString = `${database}`;

const testConnectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const connectionString = env === 'TEST' ? testConnectionString : liveConnectionString;

const db = (0, _mongojs2.default)(connectionString);

class DB {
    static insert(collection, data) {
        return new Promise((resolve, reject) => {
            db[collection].insert(data, err => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    static find(collection, query) {
        return new Promise((resolve, reject) => {
            db[collection].find(query, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    }

    static upsert(collection, query, newData) {
        return new Promise((resolve, reject) => {
            db[collection].update(query, newData, { upsert: true }, err => {
                console.log(err);
                if (err) reject(err);
                resolve(data);
            });
        });
    }

}
exports.default = DB;