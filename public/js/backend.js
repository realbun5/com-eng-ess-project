// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5Ebtrtax9CbYHtrG_VKmvkNr3pS4lO1c",
  authDomain: "comess-project-74a81.firebaseapp.com",
  projectId: "comess-project-74a81",
  storageBucket: "comess-project-74a81.appspot.com",
  messagingSenderId: "628619590159",
  appId: "1:628619590159:web:a75ebad849f4324d61c17a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc,
    Timestamp
} from 'https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js';

const db = getFirestore(app);
const items_ref = collection(db, 'items');


async function addItem(userInputData) {
  // prepare data
  const name = userInputData.name
  const content = userInputData.content
  const date = dateToTimestamp(new Date(userInputData.date)) // TODO: convert to firebase timstamp
  const start_time = getMinute(userInputData.start_time)
  const stop_time = getMinute(userInputData.stop_time)
  const timeperiod = {
    date,
    start_time,
    stop_time
  }

  const create_time = dateToTimestamp(new Date()) // TODO: convert to firebase timstamp

  const isDone = false
  const isLate = false

  const color = getRandomColor()

  const data = {
    name,
    content,
    timeperiod,
    create_time,
    isDone,
    isLate,
    color
  }

  try {
    await addDoc(items_ref, data)
  } catch(e) {
    console.warn(e)
  }
}

async function getItemsFromDate(date) {
  const collection = await getDocs(items_ref)
  const items = collection.docs.map((item) => ({
    docId: item.id,
    ...item.data(),
  }))

  // convert time stamps to js Date
  items.forEach(item => {
    item.create_time = timestampToDate(item.create_time)
    item.timeperiod.date = timestampToDate(item.timeperiod.date)
  });

  // select only item in selectedDate
  return items.filter(item => isOnTheSameDay(item.timeperiod.date, date))
}

// delete item
async function deleteItem(docId) {
  const itemRef = doc(db, `items/${docId}`);
  await deleteDoc(itemRef);
}

async function updateLateContent() {
  const collection = await getDocs(items_ref)
  const items = collection.docs.map((item) => ({
    docId: item.id,
    ...item.data(),
  }))

  items.forEach(item => {
    const startTime = timestampToDate(item.timeperiod.date)
    startTime.setHours(Number(item.timeperiod.start_time/60))
    startTime.setMinutes(item.timeperiod.start_time % 60)

    if (startTime < new Date()) {
      item.isLate = true
      updateItem(item)
    }
  })
}

function updateItem(item) {
  const itemRef = doc(db, `items/${item.docId}`);
  const copy_item = {...item}
  delete copy_item.docId
  updateDoc(itemRef, copy_item)
}


export { addItem, getItemsFromDate, deleteItem, updateLateContent, updateItem }

// utils
function dateToTimestamp(date) {
  return Timestamp.fromDate(date)
}

function timestampToDate(timeStamp) {
  return new Date(timeStamp.seconds * 1000)
}

function getMinute(dateString) {
  const [hour, minute] = dateString.split(':')
  return 60 * parseInt(hour) + parseInt(minute)
}

function getRandomColor() {
  const [red, green, blue] = Array.from(Array(3), () => Math.floor(Math.random() * 200))
  return `rgb(${red}, ${green}, ${blue})`
}

function isOnTheSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}