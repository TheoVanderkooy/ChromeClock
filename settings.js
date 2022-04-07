import { updateIcon, storageGet, default_badge_colour } from './update_icon.mjs'

// apparently this isn't already defined on Number because of course not
function clamp(x, min, max) {
  return Math.min(max, Math.max(min, x))
}

// save the settings
async function saveSettings(event){
  await chrome.storage.local.set({"simple_clock_colour": document.clockSettingsForm.textColour[0].checked ? "b" : "w",
    "simple_clock_hours": document.clockSettingsForm.clockHours[0].checked ? 12 : 24,
    "simple_clock_badge_red": clamp(document.clockSettingsForm.badgeRed.value, 0, 255),
    "simple_clock_badge_green": clamp(document.clockSettingsForm.badgeGreen.value, 0, 255),
    "simple_clock_badge_blue": clamp(document.clockSettingsForm.badgeBlue.value, 0, 255)
  })

  // update the icon again
  await updateIcon(new Date())
}

// fill in the form with current/default settings
async function fillForm() {
  // listen for changes to the form to update the icon
  document.clockSettingsForm.addEventListener("change", saveSettings)

  // 12 or 24 hours
  let hours = (await storageGet("simple_clock_hours")) ?? 12
  document.clockSettingsForm.clockHours[hours == 12 ? 0 : 1].checked = true;

  // clock text colour
  let colour = (await storageGet("simple_clock_colour")) ?? 'b'
  document.clockSettingsForm.textColour[colour == "b" ? 0 : 1].checked = true;


  // badge colour
  let r = await storageGet("simple_clock_badge_red")
  let g = await storageGet("simple_clock_badge_green")
  let b = await storageGet("simple_clock_badge_blue")
  if (isNaN(r)) r = default_badge_colour[0]; // default colour
  if (isNaN(g)) g = default_badge_colour[1];
  if (isNaN(b)) b = default_badge_colour[2];
  document.clockSettingsForm.badgeRed.value = r;
  document.clockSettingsForm.badgeGreen.value = g;
  document.clockSettingsForm.badgeBlue.value = b;
}

window.addEventListener("load", fillForm)
