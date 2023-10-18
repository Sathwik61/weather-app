const inn = document.getElementById('area')
const btn = document.getElementById('btn')
const ddata = document.getElementById('ddata')
const loading = document.getElementById('loading');


if (inn.value == '') {

}
inn.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        btn.click();
    }
});

btn.addEventListener("click", (e) => {
    e.preventDefault();
    ddata.innerText = "";
    loading.style.display = 'block';
    let city_name = inn.value;

    const API_key = "YOUR_API_KEY";
    if (city_name) {

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}`;

        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((d) => {

                let wdata = d.list[0].main;
                let wind = d.list[0].wind.speed
                let desc = d.list[0].weather[0].description
                let c = parseInt(wdata.temp - 273);



                let outputElement = document.createElement('div');
                let cssStyles = `
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #7b3fa9;
            `;
                let content = `
            <p style="${cssStyles}">Temperature: ${c}°C</p>
            <p style="${cssStyles}">Humidity: ${wdata.humidity}%</p>
            <p style="${cssStyles}">Wind: ${wind} km/h </p>
            <p style="${cssStyles}">Weather: ${desc}  </p>
            `;
                outputElement.innerHTML = content; // Set innerHTML first
                ddata.innerText = ""
                loading.style.display = 'none';

                ddata.appendChild(outputElement); // Then append it to the parent element


            })
            .catch((e) => {
                loading.style.display = 'block';

                ddata.innerText = "";
                let outputElement = document.createElement('div');
                let cssStyles = `
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #7b3fa9;
    `;
                let content = `
    <p style="${cssStyles}">Enter the valid city </p>
    
    `;
                outputElement.innerHTML = content; // Set innerHTML first
                loading.style.display = 'none';
                ddata.appendChild(outputElement); // Then append it to the parent element


            })

    }
})
