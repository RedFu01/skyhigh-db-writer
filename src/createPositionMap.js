import DB from './utils/DB';
import Flight from './utils/Flight';
import { getPositionAtMoment } from './utils/flightUtils';
require("babel-polyfill");

const startTime = 1408752000;
const endTime = startTime + 60 * 60 * 24 * 3;
const deltaT = 60;

async function main() {
    try {
        const flights = await DB.find('n_new2_flightdata_2014-08-23', {});

        console.log(`Found: ${flights.length}`)

        for (let t = startTime; t < endTime; t += deltaT) {
            console.log('t', t)
            let positionMap = [];
            for (let i = 0; i < flights.length; i++) {
                //console.log('f', i)
                let position = getPositionAtMoment(flights[i], t);
                if (!position) {
                    continue;
                }
                positionMap.push([position.lat, position.lng])
            }
            //if (positionMap.length > 0)
                await DB.insert('posMap', { id: t, positionMap })
        }
        console.log('Done')
    } catch (e) {
        console.log(e)
    }



}

main()