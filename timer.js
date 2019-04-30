
//chrome.browserAction.setIcon({path: ...})

// alert("this is a test")

let count = 0
let hr = 2;

function updateIcon() {
    // alert("icon updated")
    let now = new Date(), 
        // hr = now.getHours(),
        min = now.getMinutes();

    // TODO 24 hour time?
    hr = 3 - hr;

    chrome.browserAction.setIcon({
        path: "images/" + hr + ".bmp" // {"images", "2.bmp"}
        // path:  {  // clock extension does this for some reason?
        // 	"19": hr+color+"-19.png",
        // 	"38": hr+color+"-38.png"
        // }
    })

    chrome.browserAction.setBadgeText({text: min.toString()})
    count += 1 
}

chrome.alarms.onAlarm.addListener(function(alarm){   
    if(alarm.name == "clock_timer") {
        // alert('thingy called')
        updateIcon()
    }
});

let now = new Date();
let time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 1);
// chrome.alarms.create("clock_timer", {delayInMinutes: 0.05}); //, periodInMinutes: 0.1})
chrome.alarms.create("clock_timer", {when: time.getTime(), periodInMinutes: 1})

updateIcon()

// chrome://extensions/
//https://developer.chrome.com/extensions/api_index
    //storage, events, alarms

//https://developer.chrome.com/extensions/getstarted
//https://thoughtbot.com/blog/how-to-make-a-chrome-extension
