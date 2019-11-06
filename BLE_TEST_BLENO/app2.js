const bleno = require('bleno');

const UUID = '69d9fdd724fa4987aa3f43b5f4cabcbf';
const MINOR = 2;
const MAJOR = 1;
const TX_POWER = -60;

console.log("Starting Bleno...");

console.log(bleno.state);
bleno.on('StateChange', state => {
	console.log("Yo", state);
	if (state === 'poweredOn') {
		console.log("Starting Broadcast...");

		bleno.startAdvertisingIBeacon(UUID, MAJOR, MINOR, TX_POWER, err => {
			if(err) {
				console.error(err);
			}
			else {
				console.log('Broadcasting as IBeacon uuid:${UUID}, major: ${MAJOR}, minor: ${MINOR}')
			}
		});
	}
	else {
		console.log("Stopping Broadcast...");
		bleno.stopAdvertising();
	}
}); 

console.log("Hi");
