interface Trip {
    pickups: string[]; // Pickup points
    drops: string[]; // Drop points
    warehouse?: string; // Optional warehouse (via point)
}

/**
 * Validates the trips to ensure that drop points are visited after pickups or warehouse.
 * @param trips Array of Trip objects to validate
 * @returns True if all points are visited correctly, false otherwise
 */
function validateTrips(trips: Trip[]): boolean {
    const visitedPoints = new Set<string>();

    for (const trip of trips) {
        for (const pickup of trip.pickups) {
            visitedPoints.add(pickup);
        }

        if (trip.warehouse) {
            visitedPoints.add(trip.warehouse);
        }

        for (const drop of trip.drops) {
            if (!visitedPoints.has(drop)) {
                // Drop point visited before pickup or warehouse
                return false;
            }
        }
    }

    // All points visited correctly
    return true;
}

// Example usage
const validTrips: Trip[] = [
    { pickups: ['A'], drops: ['W'] },
    { pickups: ['B'], drops: ['W'] },
    { pickups: ['W'], drops: ['C'] },
    { pickups: ['W'], drops: ['D'] },
];

const invalidTrips: Trip[] = [
    { pickups: ['A'], drops: ['W1'] },
    { pickups: ['B'], drops: ['W2'] },
    { pickups: ['W3'], drops: ['C'] },
    { pickups: ['W4'], drops: ['D'] },
];

console.log('Valid trips:', validateTrips(validTrips)); // Should be true
console.log('Invalid trips:', validateTrips(invalidTrips)); // Should be false
