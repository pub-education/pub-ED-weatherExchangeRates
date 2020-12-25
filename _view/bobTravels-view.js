
class viewClass {
    constructor() { }

    //Adds the framework to 'container' in <main> and populates the 'headline' with the default city, country and flag.
    createFramework() {
        let html = '';

        // Creates the outline of the page with all container elements in place.
        html += '<div id="selector" class="selector"></div>';
        html += '<div id="presentation_box" class="presentation_box">';
        html += ''
        html += '<div id="headline" class="headline"></div>';
        html += '<div id="section_box" class="section_box">';
        html += '<div id="weather_section" class="weather_section"></div>';
        html += '<div id="currency_section" class="currency_section"></div>';
        html += '</div></div>';

        Helper.setHtml('container', html);

        html = '';
        // create framework for city name, flag and country with default city and country
        html += '<p id="city_country" class="city_country" style="display: inline">';
        html += '<img src="' + Controller.getFlagURL("40x30", "us") + '" id="country_flag" class="country_flag" />';
        html += '<span id="headline_city">New York, United States of America</span></p>';

        Helper.setHtml('headline', html);

        html = '';

        // create the frame for the weather section
        html += '<table class="weather_table"><thead><tr><th class="weather_head" colspan=2>Femdygnsprognos</th></tr></thead>';
        html += '<tbody><tr><td id="weather_data" class="align_center"></td></tr>';
        html += '</tbody></table>';
        Helper.setHtml('weather_section', html);

        html = '';

        //creates the frame for the currency section.
        html += '<table class="currency_table"><thead><tr><th class="currency_head" colspan=2>Valuta Kurs</th></tr></thead>';
        html += '<tbody><tr><td id="currency_data" class="currency_data"></td></tr>';
        html += '</tbody></table>';

        Helper.setHtml('currency_section', html);
    }

    // Sets the weather_table table data.
    setWeatherData() {
        let html = '';
        let timezoneCode = Current.forecast.city.timezone;
        let date;

        // Creates the confining div element and each of the 5 forecasts each contained in a separate weather box div.
        html += '<div class="weather_box_holder">';
        for (let i = 0; i < Current.forecast.list.length; i++) {
            html += '<div class="weather_box"><table><thead><tr><th class="align_center dayHead" colspan=2>';
            date = new Date((Current.forecast.list[i].dt + timezoneCode) * 1000);
            html += Helper.weekDayTable(date.getUTCDay(), 'SE') + ', ' + Helper.monthTable(date.getMonth(), 'SE');
            html += ' ' + date.getUTCDate() + ' ' + date.getUTCFullYear();
            html += ' at ' + Helper.calculateTime(Current.forecast.list[i].dt, timezoneCode);
            html += '</th></tr></thead>';
            html += '<tbody><tr><td><img class="weather_image" src="';
            html += View.weatherIconString(Current.forecast.list[i].weather[0].icon) + '" />';
            html += '<br><span class="weather_main">' + Controller.translateWeather(Current.forecast.list[i].weather[0].main) + '</span>';
            html += '<br><span class="weather_description">' + Current.forecast.list[i].weather[0].description + '</span></td>';
            html += '<td><table><tr><td class="align_right head_list">Temp:</td><td>';
            html += View.kelvinToCelcius(Current.forecast.list[i].main.temp) + '&deg;C \/ ';
            html += View.kelvinToFahrenheit(Current.forecast.list[i].main.temp) + '&deg;F</td>';
            html += '<td class="align_right head_list">Fuktighet:</td><td class="align_right">';
            html += Current.forecast.list[i].main.humidity + '\%</td></tr>';
            html += '<tr><td class="align_right head_list">Känns som:</td><td>';
            html += View.kelvinToCelcius(Current.forecast.list[i].main.feels_like) + '&deg;C \/ ';
            html += View.kelvinToFahrenheit(Current.forecast.list[i].main.feels_like) + '&deg;F</td>';
            html += '<td class="align_right head_list">Soluppgång:</td><td>';
            html += Helper.calculateTime(Current.forecast.city.sunrise, timezoneCode) + '</td></tr>';
            html += '<tr><td class="align_right head_list">Vind hastighet:</td><td class="align_right">';
            html += Current.forecast.list[i].wind.speed + ' m\/s';
            html += '</td>';
            html += '<td class="align_right head_list">Solnedgång:</td><td>';
            html += Helper.calculateTime(Current.forecast.city.sunset, timezoneCode) + '</td></tr>';
            html += '</tbody></table>';
            html += '</table></div>';

            date = ''; // Clear date
        }
        html += '</div>';
        Helper.setHtml('weather_data', html);
    }

    setCurrencyData(data) {
        let html = '';

        // Create headline and foregin currency based on selection.
        html += '<div class="currency_box"><table><thead><tr>';
        html += '<th class="currency_label align_center" colspan=2>Utländsk Valuta';
        html += '</th></tr></thead><tbody><tr><td id="foreign_currency" class="align_center" colspan=2>';
        html += Current.city.currency_name + ' (' + Current.city.currency + ')';
        html += '</td></tr>';

        //Create the "Aktuell Kurs" for selected city/country. 
        html += '<tr><th class="currency_label align_center"colspan=2>Aktuell Kurs</th></tr><tr>';
        html += '<td id="exchange_rate" colspan=2 class="align_center">';
        html += Current.currency.conversion_rates['SEK'] + ' SEK\/';
        html += Current.city.currency + '</td></tr>';

        //Create nominal value of 100 SEK in foreign currency and nominal value of 100 in foreign currency in SEK.
        html += '<tr><td class="align_center currency_separator" colspan=2>100 SEK = ';
        html += Controller.calculateExchangeRate({ "currency": 'SEK', 'amount': 100 }) + ' ' + Current.city.currency;
        html += '</td></tr>';
        html += '<tr><td class="align_center" colspan=2>100 ';
        html += Current.city.currency + ' = ';
        html += Controller.calculateExchangeRate({ "currency": Current.city.currency, 'amount': 100 }) + ' SEK';
        html += '</td></tr>';

        // Create currency inputs
        html += '<tr><td class="head_list align_right currency_separator">SEK</td><td class="currency_separator">';
        html += '<input id="currency_input1" class="currency_input align_right" name="currency_input1" onkeyup="Controller.calculateNewAmount(this)" />';
        html += '</td></tr>';
        html += '<tr><td class="head_list align_right">' + Current.city.currency + '</td><td>';
        html += '<input id="currency_input2" class="currency_input align_right" name="currency_input2" onkeyup="Controller.calculateNewAmount(this)" />';
        html += '</td></tr></tbody></table></div>';

        Helper.setHtml('currency_data', html);
    }

    // Creates the headline containing nation flag, city and country name.
    setCityCountryFlag(data) {
        let html = data.name + ', ' + data.country_name;
        let src = Controller.getFlagURL("40x30", data.country);

        // Had no pre-written helper functions for these.
        document.getElementById('headline_city').innerText = html;
        document.getElementById('country_flag').src = src;
    }

    // Populates the selector section.
    setSelector() {
        let html = '';
        let tmp = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania']; // Could have been read from file.

        html += '<div id="selector_box" class="selector_box">';
        html += '<label for="selected_city" id="selected_city_label">Välj <span style="font-style: italic">Ditt</span> Resmål</label>';
        html += '<select name="selected_city" id="selected_city"  onchange="Controller.changeCity(this.value)">';

        for (let i = 0; i < tmp.length; i++) {
            html += '<optgroup class="city_optgroup" label="' + tmp[i] + '">';
            for (let j = 0; j < Current.cities.length; j++) {
                if (Current.cities[j].region == tmp[i]) {
                    html += '<option value="' + Current.cities[j].id + '"';
                    if (Current.cities[j].name == 'New York') {
                        html += ' selected';
                    }
                    html += '>';
                    html += Current.cities[j].name + ', ' + Current.cities[j].country + '</option>';
                }
            }
            html += '</optgroup>';
        }
        html += '</select></div>';

        Helper.setHtml('selector', html);
    }

    // ***** Helper functions START *****

    // Creates the string to use for retrieving the right weather icon.
    weatherIconString(icon) {
        let q1 = 'http://openweathermap.org/img/wn/';
        let q2 = '@2x.png';

        return q1 + icon + q2;
    }

    // Conversion method from Kelvin to Celcius
    kelvinToCelcius(data) {
        return (Number(data) - 273.15).toFixed(0);
    }

    //  Conversion method from Kelvin to Fahrenheit
    kelvinToFahrenheit(data) {
        return (View.kelvinToCelcius(data) * 1.8 + 32).toFixed(0);
    }

    // Updates the currency input elements after the rate has been calcualted.
    uppdateCurrencyAmounts(data) {
        if (data.id == "currency_input1") {
            if (data.value.toString() != '') {
                Helper.setValue('currency_input2', data.value.toString());
            }
            else {
                Helper.setValue('currency_input2', '');
            }
            Helper.focus('currency_input1');
        }
        else {
            Helper.setValue('currency_input1', data.value.toString());
            Helper.focus('currency_input2');
        }
    }

    // ***** Helper functions END *****
}