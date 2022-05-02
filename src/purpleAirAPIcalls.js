// 102898, PGCPS_Schmidt_CenterBldg (outside) ID 102898, sensor_index : 102898
// 104786, PGCPS_Schmidt_Orme (outside) ID 104786 currently offline, sensor_index : 104786 NOT FOUND
// 102890, PGCPS_GwynnPHS_Temp3 (outside), sensor_index : 102890
// 102830, PGCPS_LargoIntl_Rm125 (outside), sensor_index : 102830
// 131815, Riverdale Park (outside), sensor_index : 131815
// 114799, Cheverly (outside), sensor_index : 114799
// 53775, CheverlyAQM_W2_2 (outside), sensor_index : 53775
// 53677, CheverlyAQM_W1_1 (outside), sensor_index : 53677
// 53663, CheverlyAQM_W1_3 (outside), sensor_index : 53663
// 57841, CheverlyAQM_W3_1 (outside), sensor_index : 57841
// 52833, CheverlyAQM_W1_2 (outside), sensor_index : 52833 NOT IN GROUP

// Read Key: 14349495-BB81-11EC-B330-42010A800004
// Write Key: 14353505-BB81-11EC-B330-42010A800004

//TO-DO: Hide API-Keys, organize URLs

const url =
  "https://api.purpleair.com/v1/groups?api_key=14353505-BB81-11EC-B330-42010A800004&name=PG%County%Sensors";

// Creates a new group of sensors were they can be placed
async function makeGroupOfSensors() {
  const response = await fetch(url, {
    method: "POST",
  });
  const result = await response.json();
  console.log(result);
}

const data = {
  // sensor_index: '114799',
  // sensor_index : '102898',
  // sensor_index : '114799'
  // sensor_index : '102890',
  // sensor_index : '102830',
  // sensor_index : '131815',
  // sensor_index : '53775',
  // sensor_index : '53677',
  // sensor_index : '53663',
  // sensor_index : '57841',
  // sensor_index : '52833'
};

// Adds sensors to the new group created
async function addMembersToGroup() {
  const response = await fetch(
    "https://api.purpleair.com/v1/groups/1039/members",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "14353505-BB81-11EC-B330-42010A800004",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  console.log(result);
}

async function deleteMembers() {
  fetch(
    "https://api.purpleair.com/v1/groups/1039/members/7327?api_key=14353505-BB81-11EC-B330-42010A800004",
    {
      method: "DELETE",
    }
  ).then((res) => {
    console.log(res.status);
  });
}

// makeGroupOfSensors();

// addMembersToGroup();

//Lists all the sensors in the specified group in terms of their member_id and index_id
async function getSensorList() {
  const response = await fetch(
    "https://api.purpleair.com/v1/groups/1039?api_key=14349495-BB81-11EC-B330-42010A800004"
  );
  const result = await response.json();
  console.log(result);
}

async function getSensorsData() {
  const response = await fetch(
    "https://api.purpleair.com/v1/groups/1039/members?fields=name,temperature,humidity",
    {
      headers: {
        "X-API-Key": "14349495-BB81-11EC-B330-42010A800004",
      },
    }
  );
  const result = await response.json();
  console.log(result);
}
//deleteMembers();

getSensorsData();

//getSensorList();
