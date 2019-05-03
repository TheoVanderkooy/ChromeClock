
// data/settings
let cur_hr = 0 // TODO remove this
// settings
let hr_12_24 = 12
let colour = "b"
// TODO badge colour



// now (Date) is the current date (time to update clock to)
function updateIcon(now) {
    let hr = now.getHours(),
        min = now.getMinutes();

    // TODO 24 hour time?
    { // if 12-hour time
        if ( hr > 12 ) hr -= 12;
        if ( hr == 0 ) hr = 12;
    }

    if ( hr != cur_hr ) { // TODO or if colour changed
        chrome.browserAction.setIcon({
            path: {"32": "images/" + hr + "_" + colour + "_32.png"}
        });
        cur_hr = hr
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

// References/resources:
// chrome://extensions/
// https://developer.chrome.com/extensions/api_index
// https://developer.chrome.com/extensions/getstarted
