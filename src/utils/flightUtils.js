export function getPositionAtMoment(flight, moment) {
    if (moment > flight.arrivalTime || moment < flight.depatureTime) {
        return null;
    }
    let lastPos = null;
    let nextPos = null;
    for (let i = 1; i < flight.path.length; i++) {
        if (flight.path[i].ts > moment) {
            nextPos = flight.path[i];
            break;
        }
    }
    const reversePath = flight.path.reverse();
    for (let i = 0; i < reversePath.length; i++) {
        if (flight.path[i].ts < moment) {
            lastPos = flight.path[i];
            break;
        }
    }

    if (!lastPos || !nextPos) {
        return null;
    }

    return {
        lat: lastPos.pos.lat + (nextPos.pos.lat - lastPos.pos.lat) * (nextPos.ts - moment) / (nextPos.ts - lastPos.ts),
        lng: lastPos.pos.lng + (nextPos.pos.lng - lastPos.pos.lng) * (nextPos.ts - moment) / (nextPos.ts - lastPos.ts)
    }
}