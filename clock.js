
// data/settings
let cur_hr = 0

// settings
let hr_12_24 = 12
let colour = "b"
// TODO badge colour



// now (Date) is the current date (time to update clock to)
function updateIcon(now) {
    let hr = now.getHours(),
        min = now.getMinutes();

    // adjust hour for 12-hour clock
    let hours12_24 = localStorage["simple_clock_hours"]
    if (typeof hours12_24 == "undefined" || hours12_24 == 12) { // if 12-hour time
        if ( hr > 12 ) hr -= 12;
        if ( hr == 0 ) hr = 12;
    }

    let col = localStorage["simple_clock_colour"]
    if (typeof col == "undefined") col = "b"; //default colour

    // update icon if hour changed (or colour)
    if ( hr != cur_hr || col != colour) {
        chrome.browserAction.setIcon({
            path: {"32": "images/" + hr + "_" + col + "_32.png"}
        });
        cur_hr = hr;
        colour = col;
    }

    // Set badge to minutes. Prepend 0 if required to make 2 digits
    minStr = min.toString();
    if (min < 10) { // make minutes 2 digits
        minStr = "0" + minStr
    }
    chrome.browserAction.setBadgeText({text: minStr})
    // TODO badge colour
}

// listener for the timer
chrome.alarms.onAlarm.addListener(function(alarm){   
    if(alarm.name == "clock_timer") {
        updateIcon(new Date(alarm.scheduledTime))
    }
});

// initialize timer
let now = new Date();
let msDelay = 0; // TODO remove this
let time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, msDelay);
chrome.alarms.create("clock_timer", {when: time.getTime(), periodInMinutes: 1})

// set initial icon
updateIcon(now)


// chrome.browserAction.onClicked.addListener(function(){
//     alert("clicked")
//     updateIcon(new Date())
//     chrome.browserAction.setPopup({popup: "settings.html"})
// })

// References/resources:
// chrome://extensions/
// https://developer.chrome.com/extensions/api_index
// https://developer.chrome.com/extensions/getstarted
