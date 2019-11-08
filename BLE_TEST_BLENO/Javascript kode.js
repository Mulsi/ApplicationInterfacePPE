console.log("Hello");

var devices = [
  {DeviceId: 1, DeviceName: "Light", WantToSubscribe: true,  groupId: null},
  {DeviceId: 2, DeviceName: "Radiator", WantToSubscribe: true,  groupId: null}
];

var DevicesWhoWantToSubscribe = [];


var allGroups = [];
var IsGroupVisible = false;

function AddNewGroup(){
  let newGroup = {
    groupId: 0,
    groupSubscribers: []
  }
  allGroups.push(newGroup);
  console.log(allGroups);
}
AddNewGroup();

function DeleteGroup(){
allGroups = null;
}

function OpenGroup(){
  IsGroupVisible = true;
}

function CloseGroup(){
  IsGroupVisible = false;
}

function DeviceWhoWantToSubScribe (){
  if(IsGroupVisible === true){
    for(let i = 0; i < devices.length; i++ ){
          if(devices[i].WantToSubscribe && devices[i].groupId === null ){
          console.log(i);
          console.log(devices[i].WantToSubscribe);
          DevicesWhoWantToSubscribe.push(devices[i]);
          }
      }
      console.log(DevicesWhoWantToSubscribe);
    return DevicesWhoWantToSubscribe;
  }else{
    return "HEY, the group is not open";
  }
  
}
DeviceWhoWantToSubScribe();

function GetSubscribers (groupIdValue){
  
  for(let i = 0; i < allGroups.length; i++ ){
      if(allGroups[i].groupId === groupIdValue){
        return allGroups[i].groupSubscribers;
      }
  }
}
console.log(GetSubscribers(0));

function addSubscribers(deviceId, groupId){
  let devicesToAdd;
  for(let j = 0; j < devices.length; j++){
        if(devices[j].DeviceId === deviceId){
          console.log(devices[j].DeviceId);
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
 // GROUP.push(GetSubscribers(1));
 // console.log(GROUP);
}
addSubscribers(1, 0);
console.log(GetSubscribers(0));
console.log("SUBSCRIBER:", GetSubscribers(0));

function deleteSubscriber(deviceId, groupId){
  let devicesToDelete;
  for(let i = 0; i < allGroups.length; i++){
    if(allGroups[i].groupId === groupId){
          $.each(allGroups[i].groupSubscribers, function(j){
            if(allGroups[i].groupSubscribers[j].DeviceId === deviceId) {
                allGroups[i].groupSubscribers.splice(j,1);
                return false;
            }
          });
    }
  }
}
deleteSubscriber(1,0);
console.log("SUBSCRIBER:", GetSubscribers(0));


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
//AddNewGroup();*/