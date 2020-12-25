
class controllerClass {
    constructor() { }

    // Initiates the application
    init() {
        this.loadCities();
        View.createFramework();
    }

    // Loads city data from json file on disc.
    loadCities() {
        let url = 'json/cities.json';

        Model.loadData(url)
            .then(response => response.json())
            .then(function (data) {
                Current.cities = data;
                //console.log('cities', Current.cities); // Checking content in Current.cities
                // Event runs Controller.setSelector() and Controller.initSections()
                // both depending on that city data loaded properly.
                document.dispatchEvent(cityDataLoaded);
            })
            .catch(error => alert(error))
    }

    // Loads exchange rates from external server.
    loadExchangeRate(data) {
        let url = 'https://v6.exchangerate-api.com/v6/';
        url += ExchangeRateAPIKey + '/latest/' + data.currency;

        Model.loadData(url)
            .then(response => response.json())
            .then(function (data) {
                Current.currency = data;
                //console.log('currency', Current.currency); // Checking content in Current.currency
                // Event runs Controller.setExchngeRate()
                document.dispatchEvent(currencyDataLoaded);
            })
            .catch(error => alert(error))
    }

    // Loads weather data from external server.
    loadWeather(data) {
        let url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
        url += data.name + ', ' + data.country + '&appid=' + WeatherAPIKey + '&lang=se';

        Model.loadData(url)
            .then(response => response.json())
            .then(function (data) {
                Current.weather = data;
                //console.log('wether', Current.weather); // Checking content in Current.weather
                // Event runs Controller.setSelector() and Controller.initSections()
                document.dispatchEvent(weatherDataLoaded);
            })
            .catch(error => alert(error))
    }

    // Initiates the loading of data to be used and sets the default city defined in index.html.
    initSections() {
        let city = Model.findCityById(DefaultCity);
        Current.city = city;
        Controller.loadWeather(city);
        Controller.loadExchangeRate(city);
        //console.log(Current); // Checking content in Current
    }

    // Responds to changes in dropdown list under "Välj Ditt Resmål".
    changeCity(id) {
        let city = Model.findCityById(id);

        Current.city = city;
        View.setCityCountryFlag(city);
        Controller.loadWeather(city);
        Controller.loadExchangeRate(city);
        //console.log(Current); // Checking content in Current after updates.
    }

    // Assmebles the URL to use for country flag.
    // Note two-letter country symbol "MUST" be in lowercase.
    getFlagURL(size, country) {
        return "https://flagcdn.com/" + size + "/" + country.toLowerCase() + ".png";
    }

    // Forwards requsts to translate the weather main text in forecast from English to Swedish.
    translateWeather(data) {
        return Model.translateWeatherMain(data);
    }

    // Forwards call to View.setSelector() i.e. create the dropdown list of available cities.
    setSelector() {
        View.setSelector();
    }

    // Forwards calls to Model.refineWeatherData responds to event weatherDataLoaded
    refineWeatherData() {
        Model.refineWeatherData();
    }

    // Called from Model.refineWeatherData() to forward new weather data to View.setWeatherData().
    weatherRefined() {
        View.setWeatherData();
    }

    // Responds to event currencyDataLoaded
    setExchangeRate() {
        View.setCurrencyData();
        Helper.focus('currency_input1');
    }

    // Forwards call to Model.calculateExchangeRate() called from View.setCurrencyData()
    calculateExchangeRate(data) {
        return Model.calculateExchangeRate(data);
    }

    // Forwards calls to View.uppdateCurrencyAmounts from Model.calculateNewAmount().
    // Responds to event onkeyup from <input /> tags.
    calculateNewAmount(data) {
        // Easier way of handling calls that are passed between View and Model's calculations.
        // Saves one function.
        View.uppdateCurrencyAmounts(Model.calculateNewAmount(data));
    }
}