getUpcoming();

function getUpcoming() {
    let upcoming = "https://api.spacexdata.com/v4/launches/upcoming";

    fetch(upcoming)
        .then(function (response_upcoming) {
            let data_upcoming = response_upcoming.json();
            return data_upcoming;
        })
        .then(function (data_upcoming) {
          launches = data_upcoming;
          console.log(launches[0]);
          displayUpcoming();
        })
        .then(function () {
        });
}

function displayUpcoming() {

}
