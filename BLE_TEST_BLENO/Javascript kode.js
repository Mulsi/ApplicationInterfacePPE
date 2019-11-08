  /*GROUP1 = [
    {sensorName: "Light", uuid: "8998934"},
    {sensorName: "Radiator", uuid: "8998934"}
  ]*/

var devices = [
  {DeviceId: 1, DeviceName: "Light", WantToSubscribe: false,  groupId: 1},
  {DeviceId: 2, DeviceName: "Radiator", WantToSubscribe: true,  groupId: null}
];

var DevicesWhoWantToSubscribe = [];




var GROUP;
var IsGroupVisible = false;

function AddNewGroup(){
GROUP = [];
}

function DeleteGroup(){
GROUP = null;
}

function OpenGroup(){
  IsGroupVisible = true;
}

function CloseGroup(){
  IsGroupVisible = false;
}

function DeviceWhoWantToSubScribe (){
  for(let i = 0; i < devices.length; i++ ){
      if(devices[i].WantToSubscribe && devices[i].groupId === null ){
    //  console.log(i);
    //  console.log(devices[i].WantToSubscribe);
      DevicesWhoWantToSubscribe.push(devices[i]);
      }
  }
  //console.log(DevicesWhoWantToSubscribe);
  return DevicesWhoWantToSubscribe;
}

DeviceWhoWantToSubScribe();

function GetSubscribers (groupIdValue){
  let subscribers = [];
  for(let i = 0; i < devices.length; i++ ){
      if(devices[i].groupId != groupIdValue){
        console.log(i);
        console.log(devices[i].WantToSubscribe);
        subscribers.push(devices[i]);
      }
  }
  //console.log(DevicesWhoWantToSubscribe);
  return subscribers;
}
GetSubscribers(1);

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