
// listener for the timer
chrome.alarms.onAlarm.addListener(function(alarm){   
    if(alarm.name == "clock_timer") {
        updateIcon(new Date(alarm.scheduledTime))
    }
});

// initialize timer
let now = new Date();
let time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1);
chrome.alarms.create("clock_timer", {when: time.getTime(), periodInMinutes: 1})

// set initial icon
updateIcon(now)
