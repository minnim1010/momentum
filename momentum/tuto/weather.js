const COORDS = "coords",
    KeyAPI = "c11376a1ee288be4dc99e6927fa49408",
    weather = document.querySelector(".js-weather");

function GetWeather(coordsObj){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}&appid=${KeyAPI}&units=metric`
        ).then(
            response => { return response.json();}
            ).then(json => {
                const temperature = json.main.temp;
                const place = json.name;
                weather.innerText = `${temperature} @${place}`;
            });
}

function SaveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function HandleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    SaveCoords(coordsObj);
    GetWeather(coordsObj);
}

function HandleGeoError(){
    console.log("Can't access geo location");
}

function AskForCoords(){
    navigator.geolocation.getCurrentPosition(HandleGeoSuccess, HandleGeoError);
}

function LoadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        AskForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadCoords);
        GetWeather(parsedCoords);
    }
}

function init(){
    LoadCoords();
}
init();