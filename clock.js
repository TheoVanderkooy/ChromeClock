
// data
let cur_hr = 0



function updateIcon() {
    // alert("icon updated")
    let now = new Date(), 
        hr = now.getHours(),
        min = now.getMinutes();

    // TODO 24 hour time?
    if ( hr > 12 ) {
        hr -= 12
    }

    if ( hr != cur_hr ) {
        chrome.browserAction.setIcon({
            path: {"32": "images/" + hr + "_32.png"}
        });
        cur_hr = hr
    }

    // Set badge to minutes. Prepend 0 if required to make 2 digits
    minStr = min.toString();
    if (min < 10) { // make minutes 2 digits
        minStr = "0" + minStr
    }
    chrome.browserAction.setBadgeText({text: minStr})
}

// listener for the timer
chrome.alarms.onAlarm.addListener(function(alarm){   
    if(alarm.name == "clock_timer") {
        updateIcon()
    }
});

// initialize timer
let now = new Date();
let msDelay = 100;
let time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, msDelay);
chrome.alarms.create("clock_timer", {when: time.getTime(), periodInMinutes: 1})

// set initial icon
updateIcon()

// chrome://extensions/
// https://developer.chrome.com/extensions/api_index
// https://developer.chrome.com/extensions/getstarted
