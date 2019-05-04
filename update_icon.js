
// data
let cur_hr = 0

// settings
let hr_12_24 = 12
let colour = "b"
let default_badge_colour = [0, 100, 255, 255]
let badge_colour = [0, 0, 0, 255]


// now (Date) is the current date (time to update clock to)
function updateIcon(now) {
  let hr = now.getHours()
  let min = now.getMinutes()

  // adjust hour for 12-hour clock
  let hours12_24 = localStorage["simple_clock_hours"]
  if (typeof hours12_24 == "undefined" || hours12_24 == 12) { // if 12-hour time
    if ( hr > 12 ) hr -= 12;
    if ( hr == 0 ) hr = 12;
  }

  // hour text colour
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

  // set badge to minutes, prepend 0 if required to make 2 digits
  minStr = min.toString();
  if (min < 10) { // make minutes 2 digits
    minStr = "0" + minStr
  }

  // badge colour
  let r = Number(localStorage["simple_clock_badge_red"])
  let g = Number(localStorage["simple_clock_badge_green"])
  let b = Number(localStorage["simple_clock_badge_blue"])
  if (typeof r == "undefined") r = default_badge_colour[0]; // default colour
  if (typeof g == "undefined") g = default_badge_colour[1];
  if (typeof b == "undefined") b = default_badge_colour[2];
  
  // set badge text/colour
  chrome.browserAction.setBadgeText({text: minStr})
  if (badge_colour[0] != r || badge_colour[1] != g || badge_colour[2] != b) {
    badge_colour = [r, g, b, 255]
    chrome.browserAction.setBadgeBackgroundColor({color: badge_colour})
  }
}
