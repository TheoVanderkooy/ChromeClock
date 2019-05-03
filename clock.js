
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
