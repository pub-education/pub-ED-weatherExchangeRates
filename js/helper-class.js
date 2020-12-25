class Helper {
    constructor() { }

    // ***** Functions to add Event Listeners START *****

    // Adds keyUp eventlistener to tag.  
    static keyUp(tag, action) {
        document.getElementById(tag).addEventListener("keyup", action);
    };

    // Adds onChange eventlistener to tag.
    static onChange(tag, action) {
        document.getElementById(tag).addEventListener("onChange", action);
    };

    // Adds click eventlistener to tag.
    static onClick(tag, action) {
        //alert('onClick\ntag:' + tag + '\naction: ' + action);
        document.getElementById(tag).addEventListener("click", action);
    };

    // Adds click eventlistener to all elements with class class_name.
    static onClassClick(class_name, action) {
        var classes = document.getElementsByClassName(class_name);
        for (var i = 0; i < classes.length; ++i) {
            classes[i].addEventListener("click", action);
        }
    };
    // ***** END *****

    // ***** Functions to manipulate HTML code and display START *****

    // Returns the display status of element with id tag.
    static getDisplay(tag) {
        return document.getElementById(tag).style.display;
    };

    // Sets the display status of element with id tag to either "block" or "none", bool bolean.
    static setDisplay(tag, bool) {
        if (bool) {
            document.getElementById(tag).style.display = "block";
        } else {
            document.getElementById(tag).style.display = "none";
        }
    };

    // Sets the focus to element with id tag.
    static focus(tag) {
        document.getElementById(tag).focus();
    };

    // Returns the innerHTML of element with id tag.
    static getHtml(tag) {
        return document.getElementById(tag).innerHTML;
    };

    // Sets the innerHTML of element with id tag.
    static setHtml(tag, val) {
        document.getElementById(tag).innerHTML = val;
    };

    // ***** END *****

    // ***** Functions to manipulate values in dropdown and other lists START *****

    // Returns the value of element with value properties and id = tag.
    static getValue(tag) {
        return document.getElementById(tag).value;
    };

    // Sets the value of element with value properties and id = tag.
    static setValue(tag, val) {
        document.getElementById(tag).value = val;
    };

    // ***** END *****

    // ***** Functions to calculate/convert date and time START *****

    // Calculates the local time from a UTC timestamp and timezone code. 
    // Returns a string of the form 'hh:mm'
    static calculateTime(utcTimeStamp, timezoneCode) {
        //alert('timeStamp: ' + utcTimeStamp + '\ntimeZone: ' + timezoneCode);
        let data = new Date((utcTimeStamp + timezoneCode) * 1000);
        //alert(data.toUTCString().slice(17, 22));
        return data.toUTCString().slice(17, 22);
    }

    static weekDayTable(weekDay, lang) {
        let daylistEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let daylistSE = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
        //alert('weekDay\ntype: ' + '\ndaylist: ' + lang);
        if (lang.toString().toLowerCase() == 'en') {
            if (typeof (weekDay) == "string") {

            }
            else if (typeof (weekDay) == 'number') {
                return daylistEN[weekDay];
            }
        }
        else if (lang.toLowerCase() == 'se') {
            if (typeof (weekDay) == "string") {

            }
            else if (typeof (weekDay) == 'number') {
                return daylistSE[weekDay];
            }
        }
    }

    static monthTable(month, lang) {
        let listEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let listSE = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
        //alert('weekDay\ntype: ' + '\ndaylist: ' + daylist);
        if (lang.toLowerCase() == 'en') {
            if (typeof (month) == "string") {

            }
            else if (typeof (month) == 'number') {
                return listEN[month];
            }
        }
        else if (lang.toLowerCase() == 'se') {
            if (typeof (month) == "string") {

            }
            else if (typeof (month) == 'number') {
                return listSE[month];
            }
        }

    }
    // ***** END *****
}