

// fill in the form with current/default settings

function fillForm() {
  document.getElementById("save_button").addEventListener("click",function(event){
    // save settings to local storage when button clicked
    localStorage["simple_clock_colour"] = document.clockSettingsForm.textColour[0].checked ? "b" : "w"
    // localStorage["simple_clock_hours"] = document.clockSettingsForm.
    // TODO finish
    // TODO make save button state when the settings will be applied
  })

  let hours = localStorage["simple_clock_hours"];
  if (typeof hours == "undefined") hours = 12;
  // TODO check hours radio button

  let colour = localStorage["simple_clock_colour"];
  if (typeof colour == "undefined") colour = "b";
  if (colour == "b") { // black text
    document.clockSettingsForm.textColour[0].checked = true;
  } else { // white text
    document.clockSettingsForm.textColour[1].checked = true;
  }

}

window.addEventListener("load", fillForm)
