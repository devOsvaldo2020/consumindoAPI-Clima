let weatherImages = [
    {
        url: './assets/img/clear-sky.png',
        ids: [800]
    },
    {
        url: './assets/img/broken-clouds.png',
        ids: [803, 804]
    },
    {
        url: './assets/img/few-clouds.png',
        ids: [801]
    },
    {
        url: './assets/img/mist.png',
        ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
    },
    {
        url: './assets/img/rain.png',
        ids: [500, 501, 502, 503, 504]
    },
    {
        url: './assets/img/scattered-clouds.png',
        ids: [802]
    },
    {
        url: './assets/img/shower-rain.png',
        ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321]
    },
    {
        url: './assets/img/snow.png',
        ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
    },
    {
        url: './assets/img/thnderstorm.png',
        ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
    },
];

const searchClima = async (event) => {
    event.preventDefault();
    const clima = document.getElementById("clima").value;
    const result = await searchCity(clima);

    showLoading();
    clearInfo();

    setTimeout(() => {
        hideLoading();
        if (result.cod === 200) {
            // console.log(result);
            showInfo({
                name: result.name,
                country: result.sys.country,
                temp: result.main.temp,
                tempIcon: result.weather[0].id,
                clounds: result.weather[0].main,
                description: result.weather[0].description,
                windAngle: result.wind.deg,
                windSpeed: result.wind.speed,
                humidity: result.main.humidity,
                pressure: result.main.pressure

            });
        } else {
            showWaring('Não encontramos a localização');
        };
    }, 500);
};

const carregar = () => {
    let data = new Date();
    let dw = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    document.getElementById('dias').innerHTML = `${dw[data.getDay()]} <br/> ${data.toLocaleDateString("pt-BR")}`;
};
carregar();

const showInfo = (result) => {
    hideLoading();
    document.querySelector('.titulo').innerHTML = `${result.name}, ${result.country}`;
    document.querySelector('.tempInfo').innerHTML = `${result.temp},ºC`;
    document.querySelector('.ventoInfo').innerHTML = `Vento: ${result.windSpeed},<span>km/h</span>`;
    weatherImages.forEach(obj => {
        if (obj.ids.includes(result.tempIcon)) {
            document.querySelector('.img').setAttribute('src', obj.url);
        };
    });

    document.querySelector('.tempDesc').innerHTML = `${result.description}`; // descricao ex: nublado
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${result.windAngle - 90}deg)`; // vento


    let windDirection;
    if (result.windAngle > 45 && result.windAngle <= 135) {
        windDirection = 'Leste';
    } else if (result.windAngle > 135 && result.windAngle <= 225) {
        windDirection = 'Sul';
    } else if (result.windAngle > 225 && result.windAngle <= 315) {
        windDirection = 'Oeste';
    } else {
        windDirection = 'Norte';
    };

    document.querySelector('.windDeg>.value').textContent = windDirection + ', ' + result.windSpeed,  // direcao do vento
        document.querySelector('.humidity>.value').textContent = `Umidade: ${result.humidity}%`, // umidade
        document.querySelector('.pressure>.value').textContent = `Presão: ${result.pressure}hPa`, // presao
        document.querySelector('.resultado').style.display = 'block';
};

const searchCity = async (clima) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(clima)}&appid=ba8dcc66aa29776dc4b4df2f7a5c8f06&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

searchClima();

const clearInfo = () => {
    showWaring('')
    document.querySelector('.resultado').style.display = 'none';
};

const showWaring = (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
};

const hideLoading = () => {
    document.querySelector('.icon').style.display = 'none';
};

const showLoading = () => {
    document.querySelector('.icon').style.display = 'flex';
};

const pesquisar = document.getElementById("search");
pesquisar.addEventListener("click", searchClima);