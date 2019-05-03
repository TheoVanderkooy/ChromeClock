

// fill in the form with current/default settings

function saveSettings(event){
  // save settings to local storage when button clicked
  localStorage["simple_clock_colour"] = document.clockSettingsForm.textColour[0].checked ? "b" : "w"
  localStorage["simple_clock_hours"] = document.clockSettingsForm.clockHours[0].checked ? 12 : 24
  // TODO finish

  updateIcon(new Date())
}

function fillForm() {
  // document.getElementById("save_button").addEventListener("click",saveSettings)
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

}

window.addEventListener("load", fillForm)
