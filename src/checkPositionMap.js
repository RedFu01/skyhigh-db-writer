import DB from './utils/DB';
import Flight from './utils/Flight';
import { getPositionAtMoment } from './utils/flightUtils';
require("babel-polyfill");

const startTime = 1408752000;
const endTime = startTime + 60 * 60 * 24;
const deltaT = 60;

async function main() {
    try {
        const pMap = await DB.find('posMap_3', {})
        console.log(pMap[0])
    } catch (e) {
        console.log(e)
    }



}

main()