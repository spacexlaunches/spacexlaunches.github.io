getUpcoming();

function getUpcoming() {
    let upcoming = "https://api.spacexdata.com/v4/launches/upcoming";

    fetch(upcoming)
        .then(function (response_upcoming) {
            let data_upcoming = response_upcoming.json();
            return data_upcoming;
        })
        .then(function (data_upcoming) {
            numUpcoming =  data_upcoming;
            numUpcomingCounter = 0;
            for(launch in numUpcoming) {
              upcomingName = data_upcoming.['0'];
            }
        })
        .then(function () {
            displayUpcoming();
        });
}

function displayUpcoming() {

  numUpcomingDIV.innerHTML = upcomingName;

}
