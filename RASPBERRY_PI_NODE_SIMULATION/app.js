//var path = require('path');//
//var EchoCharacteristic = require(path.dirname('characteristic.js'))
var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;
var Descriptor = bleno.Descriptor;
// var ControllerDevice = require('./controllerDevice.js');
//var EchoCharacteristic = require('./characteristic');
//var UserConfigCharecteristic = require('./user-config-characteristic');
var javascriptFunctions = require('./Group.js');
var GROUPS = [];
GROUPS.SENSORS = [];


/*
NOTE!!: 
None of the characteristics feature functionality to specify which group you want to edit, 
and the characteristics have not yet implemented a proper input/output functionality. 
*/



function onreadMeth(offset, callback) {
	console.log("hello OnReadRequest");
	console.log("offset:", offset);
	console.log("callback", callback);

	callback(this.RESULT_SUCCESS, new Buffer(
		//(this.value ? this.value.toString(): "")
		(this.value ? "Hello" : "yellow")

	));
};

function onwriteMeth(data, offset, withoutResponse, callback) {
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

function onnotifyMeth(maxValueSize, updateValueCallback) {
	console.log("hello notify");
	console.log(maxValueSize);
	console.log(updateValueCallback);
}

function createNewGroup(maxValueSize, updateValueCallback) {
	javascriptFunctions.addNewGroup();
	console.log(maxValueSize);
	console.log(updateValueCallback);
}

function deleteGroups(maxValueSize, updateValueCallback) {
	javascriptFunctions.deleteGroup(0);
	console.log(maxValueSize);
	console.log(updateValueCallback);
}

function openGroups(maxValueSize, updateValueCallback) {
	javascriptFunctions.openGroup();
	console.log(maxValueSize);
	console.log(updateValueCallback);
}

function closeGroup(maxValueSize, updateValueCallback) {
	javascriptFunctions.closeGroup();
	console.log(maxValueSize);
	console.log(updateValueCallback);
}


function showDevicesReadyToSubscribe(offset, callback) {
	javascriptFunctions.deviceWhoWantToSubScribe();
	console.log("hello OnReadRequest");
	console.log("offset:", offset);
	console.log("callback", callback);

	callback(this.RESULT_SUCCESS, new Buffer(
		//(this.value ? this.value.toString(): "")
		(this.value ? "Hello" : "yellow")

	));
};


function listOfDevices(data, offset, withoutResponse, callback) {
	javascriptFunctions.getSubscribers(0);
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


function addNewSubscriber(data, offset, withoutResponse, callback) {
	// addSubscribers(deviceId, groupId)
	javascriptFunctions.getSubscribers(1, 0);
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

function deleteExistingSubscriber(data, offset, withoutResponse, callback) {
	// deleteSubscriber(deviceId, groupId)
	javascriptFunctions.deleteSubscriber(1, 0);
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
						// This characteritic is just for testing, has no purpose
						uuid: '00002415-0000-1000-8000-00805F9B34FB',
						properties: ['read', 'write', 'notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2222',
							value: 'TestGroup'
						}],
						onReadRequest: onreadMeth,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: onwriteMeth, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: onnotifyMeth, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '1100',
				characteristics: [
					new Characteristic({
						// Add new group with this characteristic
						// Unsure if onNotify is useful, or 
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002430-0000-1000-8000-00805F9B34FB',
						properties: ['write'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2232',
							value: 'Add new group'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: createNewGroup, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '1110',
				characteristics: [
					new Characteristic({
						// Delete group with a specified id. Does not currently support taking input. 
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002445-0000-1000-8000-00805F9B34FB',
						properties: ['write'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2233',
							value: 'Delete group with specified id'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: deleteGroups, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '1111',
				characteristics: [
					new Characteristic({
						// Should open a group with specified id
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002460-0000-1000-8000-00805F9B34FB',
						properties: ['write'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2234',
							value: 'Open group'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: openGroups, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '2111',
				characteristics: [
					new Characteristic({
						// Close group with specied id. Does not currently support id
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002490-0000-1000-8000-00805F9B34FB',
						properties: ['wite'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2235',
							value: 'Close group'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: closeGroup, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '2211',
				characteristics: [
					new Characteristic({
						// Request a list of devices that are ready to subscribe.
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002505-0000-1000-8000-00805F9B34FB',
						properties: ['notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2236',
							value: 'list of devices that can subscribe'
						}],
						onReadRequest: showDevicesReadyToSubscribe,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: null, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '2221',
				characteristics: [
					new Characteristic({
						// Request list of devices that are subscribed to group.
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002520-0000-1000-8000-00805F9B34FB',
						properties: ['notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2237',
							value: 'list of devices that are subscribed'
						}],
						onReadRequest: listOfDevices,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: null, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '2222',
				characteristics: [
					new Characteristic({
						// Add new subscriber to group
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002535-0000-1000-8000-00805F9B34FB',
						properties: ['notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2238',
							value: 'Add a new subscriber to the group'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: addNewSubscriber, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
						onIndicate: null // optional indicate confirmation received handler, function() { ...}
					})
				]
			},
			{
				uuid: '3222',
				characteristics: [
					new Characteristic({
						// Delete a subscriber from given group
						// uuid: 'fff1', // or 'fff1' for 16-bit
						uuid: '00002550-0000-1000-8000-00805F9B34FB',
						properties: ['notify'], // can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						secure: [], // enable security for properties, can be a combination of 'read', 'write', 'writeWithoutResponse', 'notify', 'indicate'
						value: null, // optional stupdateupdateatic value, must be of type Buffer - for read only characteristics
						descriptors: [{
							uuid: '2239',
							value: 'Delete an existing subscriber from the group'
						}],
						onReadRequest: null,  // null, // optional read request handler, function(offset, callback) { ... }
						onWriteRequest: deleteExistingSubscriber, // null, // optional write request handler, function(data, offset, withoutResponse, callback) { ...}
						onSubscribe: null, // optional notify/indicate subscribe handler, function(maxValueSize, updateValueCallback) { ...}
						onUnsubscribe: null, // optional notify/indicate unsubscribe handler, function() { ...}
						onNotify: null, // null, // optional notify sent handler, function() { ...}
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
