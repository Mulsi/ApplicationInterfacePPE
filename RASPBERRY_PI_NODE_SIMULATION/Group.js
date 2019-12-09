/*
!!!
LOG OF MAJOR CHANGES: This file used to be called:
- "Javascript kode.js"
-
!!!

This file contains the simulation methods of the simulated groups.
----
A object called devices contains a list of all the devices we are concerned with.
The contain properties:
- int deviceId
- String deviceName
- boolean wantToSubscribe
--- If true, the device wishes to be subscribed to the group
--- This can still be true if the device is in the group.
- groupId
*/

let devices = [
  {deviceId: 1, deviceName: "Light", wantToSubscribe: true,  groupId: null},
  {deviceId: 2, deviceName: "Radiator", wantToSubscribe: true,  groupId: null}
];

let devicesWhoWantToSubscribe = [];


let allGroups = [];
let isGroupVisible = false;

function addNewGroup(){
    /*
    This greates a new group object, with an id and a list of all accepted subscribers
    There should only be one group at a time in the current program format,
    but the program is designed with scaling in mind,
    allowing it to be easily changed to supprot several groups
    */
    let newGroup = {
        groupId: 0,
        groupSubscribers: []
    }
    allGroups.push(newGroup);
}
// addNewGroup();

function deleteGroup(idToDelete){
    /*
    Deletes a group by unsubscribing all internal devices, then removing it from the allGroups list
    Returns true on success, false on failure.
    */
    let groupToDelete = null;
    let index = null;
    for (int i = 0; i < allGroups.length; i++){
        if (allGroups[i] !== null){
            if (allGroups[i].groupId === idToDelete) {
                groupToDelete = allGroups[i].groupId;
                index = i
            }
        }
    }

    if (groupToDelete === null){
        return false;
    }

    for each (subscriber in groupToDelete){
        subscriber.groupId = null;
    }

    allGroups[index] = 0;
    return true;
}

function openGroup(){
    isGroupVisible = true;
}

function closeGroup(){
    isGroupVisible = false;
}

function deviceWhoWantToSubscribe (){
    if(isGroupVisible === true){
        for(let i = 0; i < devices.length; i++ ){
            if(devices[i].wantToSubscribe && devices[i].groupId === null ){
                console.log(i);
                console.log(devices[i].wantToSubscribe);
                devicesWhowantToSubscribe.push(devices[i]);
            }
        }
        console.log(devicesWhowantToSubscribe);
        return devicesWhowantToSubscribe;
    }else{
        return "HEY, the group is not open";
    }
}

//  deviceWhoWantToSubscribe();

function getSubscribers (groupIdValue){

  for(let i = 0; i < allGroups.length; i++ ){
      if(allGroups[i].groupId === groupIdValue){
        return allGroups[i].groupSubscribers;
      }
  }
}
// console.log(getSubscribers(0));

function addSubscribers(deviceId, groupId){
  let devicesToAdd;
  for(let j = 0; j < devices.length; j++){
        if(devices[j].deviceId === deviceId){
          console.log(devices[j].deviceId);
          console.log(devices[j]);
          devices[j].groupId = groupId;
          devicesToAdd = devices[j];
        }
      }

  for(let i = 0; i < allGroups.length; i++){
    if(allGroups[i].groupId === groupId){
      allGroups[i].groupSubscribers.push(devicesToAdd);
    }
  }
 // GROUP.push(getSubscribers(1));
 // console.log(GROUP);
}
addSubscribers(1, 0);
console.log(getSubscribers(0));
console.log("SUBSCRIBER:", getSubscribers(0));

function deleteSubscriber(deviceId, groupId){
  let devicesToDelete;
  for(let i = 0; i < allGroups.length; i++){
    if(allGroups[i].groupId === groupId){
          $.each(allGroups[i].groupSubscribers, function(j){
            if(allGroups[i].groupSubscribers[j].deviceId === deviceId) {
                allGroups[i].groupSubscribers.splice(j,1);
                return false;
            }
          });
    }
  }
}
deleteSubscriber(1,0);
console.log("SUBSCRIBER:", getSubscribers(0));


/*function RandomGroupGenerator (){
  var groupName
  if(GROUPS.length > 0){
    groupName = "GROUP" + (GROUPS.length + 1);
  }else{
    groupName = "GROUP" + 1;
  };


            GROUPS.push(newVar);
console.log(GROUPS);
  //return ;
}

RandomGroupGenerator();
//addNewGroup();*/
