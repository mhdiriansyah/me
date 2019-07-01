window.addEventListener("load", () => {
    let long;
    let lat;

    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureDescription = document.querySelector('.temperature-description p');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position  => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/9f6d9225b51c337ebd62f7c3e24c7569/${lat},${long}`;
            fetch(api)
                .then(response => {
                    return response.json();
                    console.log("gagal");
                })
                .then(data => {
                    // console.log(data);
                    const { temperature, summary, icon } = data.currently
                    const timezone = data.timezone

                    //set value in element from class
                    temperatureDegree.textContent = temperature+' F';
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = timezone;

                    setIcons(icon, document.querySelector('.icon'));
                })
        });
    }

    if (navigator.onLine){
        document.querySelector('#load1').style.display = 'none';
        document.querySelector('#load2').style.display = 'none';
    } else {
        document.querySelector('#load1').style.display = 'block';
        document.querySelector('#load2').style.display = 'block';
    }


    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});