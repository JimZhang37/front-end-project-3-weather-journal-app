/* Global Variables */
const key = '26a65437d1bdae1f90df508b8759d1a4'
const country_code = 'us'
const zip = 94040
const url = 'https://api.openweathermap.org/data/2.5/weather?zip='
const url2 = ','
const url3 = '&appid='

// api.openweathermap.org/data/2.5/weather?zip=94040&appid=26a65437d1bdae1f90df508b8759d1a4
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

const getweather = async (url) => {

    const res = await fetch(url)
    try {
        const data = await res.json()
        // console.log(` data received is ${data}, ${data.main.temp}`)
        return data
    }
    catch (error) {
        console.log('error', error)
    }
}

const uploadweather = async (url, body) => {
    const rest = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });
    try {
        const newdata = await rest.json()
        // console.log(newdata)
        return newdata
    } catch (error) {
        console.log('error', error);
    }
}

const uiupdate = async (data) => {
    // console.log(data.temperature)
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('content').innerHTML = data.user_response;
    document.getElementById('temp').innerHTML = data.temperature;

}

const uirefresh = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        // console.log(data);
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('content').innerHTML = data.user_response;
        document.getElementById('temp').innerHTML = data.temperature;

        // document.querySelector('#date').innerHTML = data[0].date;
        // document.querySelector('#content').innerHTML = date[0].user_response;
        // document.querySelector('#temp').innerHTML = date[0].temperature;
    } catch (error) {
        console.log('error', error);
    }
}

async function clickbutton() {
    
    const zipcode = document.getElementById('zip').value
    const feeling = document.getElementById('feelings').value
    // console.log(`the zip is ${zipcode} and the feeling is ${feeling}`)
    const weatherurl = url + zipcode + url2 + country_code + url3 + key

    // getweather(weatherurl)
    //     .then(
    //         (data) => {
                // const localurl = 'http://localhost:8080/postdata'
                // const body = { temperature: data.main.temp, date: newDate, user_response: feeling }
                // uploadweather(localurl, body)
    //             // console.log(`a is ${a}`)
    //         })
    //     .then((data) => {
    //         uirefresh('http://localhost:8080/getdata')
    //         uiupdate(data)
    //     })
    const weather = await getweather(weatherurl)
    const localurl = 'http://localhost:8080/postdata'
    const body = { temperature: weather.main.temp, date: newDate, user_response: feeling }
    const res = await uploadweather(localurl, body)
    await uiupdate(res)

}


const button = document.querySelector('#generate')
button.addEventListener('click', clickbutton)