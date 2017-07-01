import mongojs from 'mongojs';
const password = 'rmfUxI0sxakaMCnw';
const database = 'skyhigh-data';
const connectionString = `mongodb://redfu01:${password}@skyhigh-shard-00-00-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-01-kuqxv.mongodb.net:27017,
                         skyhigh-shard-00-02-kuqxv.mongodb.net:27017/${database}?ssl=true&replicaSet=skyhigh-shard-0&authSource=admin`;

const db = mongojs(connectionString);
const collection = process.argv[2]
db[collection].drop((err, res) => {
    console.log(err, res)
});