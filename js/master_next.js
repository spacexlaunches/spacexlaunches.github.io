getNext();

function getNext() {
    let next = "https://api.spacexdata.com/v4/launches/next";

    fetch(next)
        .then(function (response_next) {
            let data_next = response_next.json();
            return data_next;
        })
        .then(function (data_next) {
            nextName = data_next.name;
            nextPatch = data_next.links['patch']['large'];
            nextRocket = data_next.rocket;
            nextTime = data_next.date_unix;
            landingType = data_next.cores['0']['landing_type'];
            nextInformation = data_next.details;
        })
        .then(function () {
            displayNext();
            getRocket();
            convertTime();
            countdown();
        });
}

function displayNext() {

  launch_name.innerHTML = nextName;
  launch_patch.innerHTML = `<img src="${nextPatch}"/>`;
  landing_type.innerHTML = landingType;
  launch_information.innerHTML = nextInformation;

}

function getRocket() {

  let rocket = "https://api.spacexdata.com/v4/rockets/" + nextRocket;

  console.log(rocket);

  fetch(rocket)
      .then(function (response_rocket) {
          let data_rocket = response_rocket.json();
          return data_rocket;
      })
      .then(function (data_rocket) {
          rocketName = data_rocket.name;
      })
      .then(function () {
          displayRocket();
      });

}

function displayRocket() {
  if (rocketName == "Falcon 9") {
    launch_rocket.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Falcon_9_logo.svg"/>`;
  }

  else if (rocketName == "Falcon Heavy") {
    launch_rocket.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Falcon_Heavy_logo.svg"/>`;
  }

  else {
    launch_rocket.innerHTML = "unknown";
  }
}

function convertTime(){

 var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

 var date = new Date(nextTime*1000);

 var year = date.getFullYear();
 var month = months_arr[date.getMonth()];
 var day = date.getDate();
 var hours = date.getHours();
 var minutes = "0" + date.getMinutes();

 var convdataTime = day+'. '+month+' '+year+' '+hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2);

 launch_time.innerHTML =  convdataTime;

}

function countdown() {
  const unixTime = Math.floor(Date.now() / 1000);
  countdown_unix = nextTime - unixTime

  seconds = countdown_unix;
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d < 10 ? "0" + d : d;
  var hDisplay = h < 10 ? "0" + h : h;
  var mDisplay = m < 10 ? "0" + m : m;
  var sDisplay = s < 10 ? "0" + s  : s;

  launch_countdown.innerHTML = "T - " + dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;

  setTimeout(countdown, 1000);
}
