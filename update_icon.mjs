
// data
let cur_hr = 0

// settings
let colour = "b"
export const default_badge_colour = [0, 100, 255, 255]

// helper to get a single key from local storage
export async function storageGet(k) {
  return (await chrome.storage.local.get(k))[k]
}

// now (Date) is the current date (time to update clock to)
export async function updateIcon(now) {
  let hr = now.getHours()
  let min = now.getMinutes()

  // adjust hour for 12-hour clock
  let hours12_24 = (await storageGet("simple_clock_hours")) ?? 12
  if (hours12_24 == 12) { // if 12-hour time
    if ( hr > 12 ) hr -= 12;
    if ( hr == 0 ) hr = 12;
  }

  // hour text colour
  let col = (await storageGet("simple_clock_colour")) ?? 'b'

  // update icon if hour changed (or colour)
  if ( hr != cur_hr || col != colour) {
    chrome.action.setIcon({
      path: {"32": `images/${hr}_${col}_32.png`}
    });
    cur_hr = hr;
    colour = col;
  }

  // set badge to minutes, prepend 0 if required to make 2 digits
  let minStr = min.toString()
  if (min < 10) {
    minStr = "0" + minStr
  }

  // badge colour
  let r = Number(await storageGet("simple_clock_badge_red")) || default_badge_colour[0]
  let g = Number(await storageGet("simple_clock_badge_green")) || default_badge_colour[0]
  let b = Number(await storageGet("simple_clock_badge_blue")) || default_badge_colour[0]

  // set badge text/colour
  chrome.action.setBadgeText({text: minStr})
  chrome.action.setBadgeBackgroundColor({color: [r, g, b, 255]})
}
