import { initializeCalendar, initializeColumn } from './calendar.js'
import { addNewReminderLine } from './timeline.js'
import { setContentDisplay, initializeButton } from './content.js'
import { initializeFormListener } from './form.js'

import { addItem, getItemsFromDate, deleteItem, updateLateContent, updateItem } from './backend.js'

// get current month and year
let selectedDate = new Date()

// update late item
updateLateContent()

// set time to 00:00:00.000
selectedDate.setHours(0)
selectedDate.setMinutes(0)
selectedDate.setSeconds(0)
selectedDate.setMilliseconds(0)

// current item
let currentItem = null;


// initialize calendar
initializeCalendar(selectedDate, updateSelectedDate)
initializeColumn(updateSelectedDate)


// get data from today date
getItemsFromDate(selectedDate).then((items) => {
  // set date title in timeline
  const dd = selectedDate.getDate()
  const mm = selectedDate.getMonth() + 1
  const yyyy = selectedDate.getFullYear()
  document.getElementById("date-title").innerHTML = `Date: ${dd}/${mm}/${yyyy}`


  // initialize timeline
  setTimeLine(items)

  // check is there any content in timeline
  const noContentDisplay = document.getElementById('no-content-hidden')

  if (!document.getElementById('row-container').childNodes.length) {
    noContentDisplay.classList.remove('hidden')
  } else {
    noContentDisplay.classList.add('hidden')
  }

  // set currentItem to first element in timeline then display content
  setCurrentItem(items[0])

  
})

// initialize content buttons
initializeButton(removeItem, setDone)

// initialize form
initializeFormListener(addItem, function () {
  updateSelectedDate(selectedDate)
})

// function that run every time date in calendar.js change
function updateSelectedDate(date) {
  selectedDate = date
  getItemsFromDate(date).then((items) => {

    // clear old timeline
    clearTimeLine()
    // get data from firebase on selected date then add to timeline
    items.forEach(item => {
      addTimeLine(item)
    });

    // check is there any content in timeline
    const noContentDisplay = document.getElementById('no-content-hidden')

    if (!document.getElementById('row-container').childNodes.length) {
      noContentDisplay.classList.remove('hidden')
    } else {
      noContentDisplay.classList.add('hidden')
    }

    if (!currentItem) {
      setCurrentItem(items[0])
    }
  })
}

// update timeline
function setTimeLine(items) {
   items.forEach(item => {
    addTimeLine(item)
   })
}

// add new timeline
function addTimeLine(item) {
  addNewReminderLine(item, setCurrentItem)
}

// update content display
function setCurrentItem(item) {
  currentItem = item
  setContentDisplay(currentItem)
}


// clear timeline
function clearTimeLine(){
  const rowContainer = document.getElementById('row-container')
  rowContainer.innerHTML = ''
}

// remove content
function removeItem() {
  if (!currentItem) {
    return
  }
  deleteItem(currentItem.docId)

  // update both timeline and content section
  getItemsFromDate(selectedDate).then((items) => {
    // clear timeline
    clearTimeLine()
    // rewrite timeline
    setTimeLine(items)

    // check is there any content in timeline
    const noContentDisplay = document.getElementById('no-content-hidden')
    
    if (!document.getElementById('row-container').childNodes.length) {
      noContentDisplay.classList.remove('hidden')
    } else {
      noContentDisplay.classList.add('hidden')
    }
  
    // set currentItem to first element in timeline then display content
    setCurrentItem(items[0])  
  })
}

// Done button
function setDone() {
  if (!currentItem) {
    return
  }

  currentItem.isDone = !currentItem.isDone
  updateItem(currentItem)

  setContentDisplay(currentItem)
}


// update late content every 5 minute
const intervalTime = 300000
setInterval(() => {
  // update firebase
  updateLateContent()

  // update web page
  updateSelectedDate(selectedDate)
}, intervalTime);