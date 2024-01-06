// add form
const addForm = document.getElementById("form")
const name_alert = document.getElementById("name_alert")
const des_alert = document.getElementById("des_alert")
const date_alert = document.getElementById("date_alert")
const time_alert = document.getElementById("time_alert")

const name_alert2 = document.getElementById("name_alert2")
const des_alert2 = document.getElementById("des_alert2")
const time_alert2 = document.getElementById("time_alert2")

const nameInput = document.getElementById("name")
const desInput = document.getElementById("description")
const dateInput = document.getElementById("date");
const start_timeInput = document.getElementById("start_time");
const stop_timeInput = document.getElementById("stop_time");

const submitButton = document.getElementById("submit-button")

const name_length_limit = 50
const des_length_limit = 250

function checkTimeError(start_time,stop_time){
  let start = start_time.split()
  let stop = stop_time.split()
  if (start_time.length && stop_time.length){
    if (start[0] > stop[0] || (start[0] == stop[0] && start[1] > stop[1])){
        return true
    }else{
        return false
    }
  }
}

function Submit_button() {
    let success = true
    const name = nameInput.value;
    const description = desInput.value;
    const date = dateInput.value;
    const start_time = start_timeInput.value;
    const stop_time = stop_timeInput.value;

    const data = {
      name: name,
      content: description,
      date: date,
      start_time: start_time,
      stop_time: stop_time,
    }

    //not input name alert
    if (!name.length){
        name_alert.style.display = "block"
        success = false
    }else{
        name_alert.style.display = "none"
    }
    //input more than 50 words
    if(name.length > name_length_limit){
        name_alert2.style.display = "block"
        success = false
      }else{
        name_alert2.style.display = "none"
    }


    //not input description
    if (!description.length){
        des_alert.style.display = "block"
        success = false
      }else{
        des_alert.style.display = "none"
    }
    //input more than 250 words
    if(description.length > 250){
        des_alert2.style.display = "block"
        success = false
      }else{
        des_alert2.style.display = "none"
    }
    //not input date
    if (!date.length){
        date_alert.style.display = "block"
        success = false
      }else{
        date_alert.style.display = "none"
    }
    //not input time
    if (!start_time.length || !stop_time){
        time_alert.style.display = "block"
        success = false
      }else{
        time_alert.style.display = "none"
    }

    //Check start time < stop time
    if(checkTimeError(start_time,stop_time)){
      time_alert2.style.display = "block"
      success = false
  }else{
      time_alert2.style.display = "none"
  }

    return {success, data}
}

function initializeFormListener(addItemFunction, updateTimeLine) {
  // add submit button listener
  submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      const {success, data} = Submit_button()
      if (success) {
        addItemFunction(data)
        updateTimeLine()
        addForm.reset()
      }
  })
  // add alert check on input
  nameInput.addEventListener('input', () => {
      if (nameInput.value.length > name_length_limit) {
          name_alert2.style.display = "block"
      } else {
          name_alert2.style.display = "none"
      }
  
      if (nameInput.value.length > 0) {
          name_alert.style.display = "none"
      }
  })
  
  desInput.addEventListener('input', () => {
      if (desInput.value.length > des_length_limit) {
          des_alert2.style.display = "block"
      } else {
          des_alert2.style.display = "none"
      }
  
      if (desInput.value.length > 0) {
          des_alert.style.display = "none"
      }
  })

  dateInput.addEventListener('input', () => {
    if (dateInput.value.length > 0) {
        date_alert.style.display = "none"
    }

})

start_timeInput.addEventListener('input', () => {
    if (start_timeInput.value.length > 0) {
        time_alert.style.display = "none"
    }
    if (!checkTimeError(start_timeInput.value,stop_timeInput.value)){
        time_alert2.style.display = "none"
    }
})

stop_timeInput.addEventListener('input', () => {
    if (stop_timeInput.value.length > 0) {
        time_alert.style.display = "none"
    }
    if (!checkTimeError(start_timeInput.value,stop_timeInput.value)){
        time_alert2.style.display = "none"
    }
})
}

export { initializeFormListener }