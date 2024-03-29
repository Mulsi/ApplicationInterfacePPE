//var path = require('path');//
//var EchoCharacteristic = require(path.dirname('characteristic.js'))
var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;
var Descriptor = bleno.Descriptor;
var ControllerDevice = require('./controllerDevice.js');
//var EchoCharacteristic = require('./characteristic'); 
//var UserConfigCharecteristic = require('./user-config-characteristic');

var GROUPS = [];
GROUPS.SENSORS = [];





function onreadMeth(offset, callback){
					console.log("hello OnReadRequest");
					console.log("offset:", offset);
					console.log("callback", callback);
					
					callback(this.RESULT_SUCCESS, new Buffer(
					//(this.value ? this.value.toString(): "")
					(this.value ? "Hello": "yellow")

					));
			};

function onwriteMeth(data, offset, withoutResponse, callback){
					console.log("Hello Miha")				
					console.log("data", data);	
					//data = parseInt(data);
					console.log(typeof data);
					console.log(data.toString('hex'));

					console.log("offset", offset);
					console.log("withoutResponse", withoutResponse);
					console.log("callback", callback);

					callback(this.RESULT_SUCCESS, new Buffer(
					//(this.value ? "Hello": "yellow")
					(this.value ? this.value.toString() : "err")
					))
			}
function onnotifyMeth(maxValueSize, updateValueCallback){
					console.log("hello notify");
					console.log(maxValueSize);
					console.log(updateValueCallback);
			}








bleno.on('stateChange', function (state) {
	console.log('on -> stateChagne: ' + state);
	if (state === 'poweredOn') {
		console.log('ble has been powered on');
		bleno.startAdvertising('rpi-ble-app', ['fff0']);
	} else {
		bleno.stopAdvertising();
	}	
});

bleno.on('accept', function (clientAddress) {
	console.log("Hi ", clientAddress);
	});

bleno.on('advertisingStart', function () {
	console.log('-> advertising start');
bleno.setServices([
    new BlenoPrimaryService(
            {
                uuid: '1000',
                characteristics: [
                   new Characteristic({
			// Add new group with this characteristic
                        // uuid: 'fff1', // or 'fff1' for 16-bit
			uuid: '00002415-0000-1000-8000-00805F9B34FB',
                        properties: ['read', 'write', 'notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
                        secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
                        value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
                        descriptors: [{
				uuid: '2222',
				value: 'Add new group'
			}],
                        onReadRequest: onreadMeth,  // null, // optional read request handler, function(offset, callback) { ... }
                        onWriteRequest: onwriteMeth, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
                        onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
                        onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
                        onNotify: onnotifyMeth, // null, // optional notify sent handler, function() { ...}
                        onIndicate: null // optional indicate confirmation received handler, function() { ...}
                    })
                ]
            }
    )], function (error) {
    console.log('setServices: ' + (error ? 'error ' + error : 'success'));
});
});



bleno.on('servicesSet', function () {
console.log('services set.');
});
