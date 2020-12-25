
class modelClass {
    constructor() { }

    // Primary function for loading data from a given url.
    // returns a promise.
    async loadData(url) {
        let promise = await fetch(url)
        return promise;
    }

    // ***** City functions START *****
    // Finds the city with given id and returns the city's data.
    findCityById(id) {
        let city = {};
        for (let i = 0; i < Current.cities.length; i++) {
            if (Current.cities[i].id == id) {
                city = Current.cities[i];
            }
        }
        return city;
    }
    // ***** City functions END *****

    // ***** Weather functions START *****

    // sets Current.forecast with the data that is between 11 am and 1 pm from Current.weather.
    refineWeatherData() {
        let list = [];
        let timeStamp = 0;
        let city = Current.weather.city;
        let time = '';
        let cnt = 0;

        for (let i = 0; i < Current.weather.list.length; i++) {
            timeStamp = Current.weather.list[i].dt;
            time = Helper.calculateTime(timeStamp, city.timezone)
            if (time == '11:00' || time == '11:30' || time == '12:00' || time == '12:30' || time == '13:00' || time == '13:30') {
                list.push(Current.weather.list[i]);
            }
        }

        cnt = list.length;
        Current.forecast = { cnt, list, city }; // sets the forecast in global Curent.

        Controller.weatherRefined();
        //console.log(Current.forecast); // Checks content in Current.forecast
    }

    // Translates weather conditions from English to Swedish.
    translateWeatherMain(data) {
        let reply = '';

        switch (data.toString().toLowerCase()) {
            case 'thunderstorms':
                reply = 'Åskväder';
                break;
            case 'drizzle':
                reply = 'Duggregn';
                break;
            case 'rain':
                reply = 'Regn';
                break;
            case 'snow':
                reply = 'Snö';
                break;
            case 'mist':
                reply = 'Dimma';
                break;
            case 'smoke':
                reply = 'Rök';
                break;
            case 'haze':
                reply = 'Dis';
                break;
            case 'dust':
                reply = 'Damm';
                break;
            case 'fog':
                reply = 'Tjocka';
                break;
            case 'sand':
                reply = 'Sand';
                break;
            case 'ash':
                reply = 'Aska';
                break;
            case 'squall':
                reply = 'Vindbyar';
                break;
            case 'tornado':
                reply = 'Tromb';
                break;
            case 'clear':
                reply = 'Klart';
                break;
            case 'clouds':
                reply = 'Molnigt';
                break;
            default:
                reply = 'Odefinierat';
        }
        return reply;
    }
    // ***** Weather functions END *****

    // ***** Currency functions START *****
    // Calculates the amount of SEK in foreign currency and vise verse.
    calculateExchangeRate(data) {

        if (data.currency == "SEK") {
            return (data.amount / Current.currency.conversion_rates['SEK']).toFixed(2);
        }
        else {
            return (data.amount * Current.currency.conversion_rates['SEK']).toFixed(2);
        }

    }

    // Calculates the changes after an amount in ither input field has changed.
    // be careful not to assign data.value to ret.value since this will change the value in the actual input field.
    // took me a long time to figure out. It establishes a link to the input field rather than getting a
    // numeric value from data. 
    calculateNewAmount(data) {
        let ret = {};
        ret.id = data.id;
        ret.value = 0;

        if (data.value == '') {
            ret.value = '';
        }
        else {
            if (data.id == 'currency_input1') {
                ret.value = (data.value / Current.currency.conversion_rates['SEK']).toFixed(2);
            }
            else {
                ret.value = (data.value * Current.currency.conversion_rates['SEK']).toFixed(2);
            }
        }
        return ret;
    }
    // ***** Currency functions END *****
}