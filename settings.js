
// save the settings
function saveSettings(event){
  localStorage["simple_clock_colour"] = document.clockSettingsForm.textColour[0].checked ? "b" : "w"
  localStorage["simple_clock_hours"] = document.clockSettingsForm.clockHours[0].checked ? 12 : 24
  localStorage["simple_clock_badge_red"] = document.clockSettingsForm.badgeRed.value
  localStorage["simple_clock_badge_green"] = document.clockSettingsForm.badgeGreen.value
  localStorage["simple_clock_badge_blue"] = document.clockSettingsForm.badgeBlue.value

  // update the icon again
  updateIcon(new Date())
}

// fill in the form with current/default settings
function fillForm() {
  // listen for changes to the form to update the icon
  document.clockSettingsForm.addEventListener("change",saveSettings)
  
  // 12 or 24 hours
  let hours = localStorage["simple_clock_hours"];
  if (typeof hours == "undefined") hours = 12;
  if (hours == 12) { // 12 hours
    document.clockSettingsForm.clockHours[0].checked = true;
  } else { // 24 hours
    document.clockSettingsForm.clockHours[1].checked = true;
  }

  // clock text colour
  let colour = localStorage["simple_clock_colour"];
  if (typeof colour == "undefined") colour = "b";
  if (colour == "b") { // black text
    document.clockSettingsForm.textColour[0].checked = true;
  } else { // white text
    document.clockSettingsForm.textColour[1].checked = true;
  }

  // badge colour
  let r = localStorage["simple_clock_badge_red"]
  let g = localStorage["simple_clock_badge_green"]
  let b = localStorage["simple_clock_badge_blue"]
  if (typeof r == "undefined") r = default_badge_colour[0]; // default colour
  if (typeof g == "undefined") g = default_badge_colour[1];
  if (typeof b == "undefined") b = default_badge_colour[2];
  document.clockSettingsForm.badgeRed.value = r;
  document.clockSettingsForm.badgeGreen.value = g;
  document.clockSettingsForm.badgeBlue.value = b;
}

window.addEventListener("load", fillForm)
