const nameElement = document.getElementById('content_name')
const contentElement = document.getElementById('content_des')
const dateElement = document.getElementById('content_date')
const timeElement = document.getElementById('content_time')
const Late_button = document.getElementById('late')
const isDoneButton = document.getElementById('done')

const removeButton = document.getElementById('remove')

function setContentDisplay(item) {
  if (!item) {
    item = {
      name:'-',
      content:'-',
      timeperiod: {
        date: '',
        start_time: '',
        stop_time: ''
      },
      isLate: false,
    }
  }
  nameElement.textContent = `Name: ${item.name}`
  contentElement.textContent = `Description: ${item.content}`
  dateElement.textContent = `Date: ${formatDate(item.timeperiod.date)}`
  timeElement.textContent = `Time: ${formatTime(item.timeperiod.start_time)} - ${formatTime(item.timeperiod.stop_time)}`

  if (!item.isLate) {
    Late_button.style.color = "rgb(150, 150, 150)";
    Late_button.style.backgroundColor = "transparent";
    Late_button.style.borderColor =  "rgb(186, 186, 186)";
    Late_button.textContent = 'Not Late'
  }else{
      Late_button.style.color = "black";
      Late_button.style.backgroundColor = "rgb(255, 230, 64)";
      Late_button.style.borderColor =  "transparent";
      Late_button.textContent = 'Late'
    }

  if (!item.isDone) {
      isDoneButton.innerText = "Mark Done"
  } else {
     isDoneButton.innerText = "Mark Undone"
  }
  
}


function initializeButton(removeFunction, setDone) {
  removeButton.addEventListener('click', () => {
    removeFunction()
  })
  isDoneButton.addEventListener('click',() =>{
    setDone()
  })

  
}

export { setContentDisplay, initializeButton }

// utils
function formatTime(time) {
  if (time === '') {
    return ''
  }
  let hour = Math.floor(time / 60)
  if (hour < 10) {
    hour = '0' + hour
  }
  let minute = time % 60
  if (minute < 10) {
    minute = '0' + minute
  }
  return `${hour}:${minute}`
}

function formatDate(date) {
  if (!date) {
    return '-'
  }
  return date.toLocaleDateString()
}