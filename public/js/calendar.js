// calendar

// select element
const select_month = document.getElementById("select-month");
const select_year = document.getElementById("select-year");

// row element
const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const row3 = document.getElementById("row3");
const row4 = document.getElementById("row4");
const row5 = document.getElementById("row5");
const row6 = document.getElementById("row6");


const months = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

// call when select month and year
function update(month, year) {
  const firstdate_in_week = new Date(year, month, 1).getDay();
  const lastdate_in_week = new Date(year, month + 1, 0).getDate();

  let dateCount = 1;

  for (let column = 0; column < row1.children.length; column++) {
    if (column >= firstdate_in_week) {
      changeDateValue(row1.children[column], dateCount)
      dateCount++;
    } else {
      changeDateValue(row1.children[column], "")
    }
  }

  for (let column = 0; column < row2.children.length; column++) {
    changeDateValue(row2.children[column], dateCount)
    dateCount++;
  }

  for (let column = 0; column < row3.children.length; column++) {
    changeDateValue(row3.children[column], dateCount)
    dateCount++;
  }

  for (let column = 0; column < row4.children.length; column++) {
    changeDateValue(row4.children[column], dateCount)
    dateCount++;
  }

  for (let column = 0; column < row5.children.length; column++) {
    if (dateCount <= lastdate_in_week) {
      changeDateValue(row5.children[column], dateCount)
      dateCount++;
    } else {
      changeDateValue(row5.children[column], "")
    }
  }
  if (dateCount > lastdate_in_week) {
    row6.classList.add("hidden")
    return
  }

  row6.classList.remove("hidden")
  for (let column = 0; column < row6.children.length; column++) {
    if (dateCount <= lastdate_in_week) {
      changeDateValue(row6.children[column], dateCount)
      dateCount++;
    } else {
      changeDateValue(row6.children[column], "")
    }
  }
}

function changeDateValue(column, date) {
    column.children[0].textContent = date
    // column.children[0].addEventListener('click', updateSelectedDate)
}

function initializeCalendar(selectedDate, updateSelectedDate) {
  let currentMonth = selectedDate.getMonth()
  let currentYear = selectedDate.getFullYear()
  // add event listener to selector
  select_month.addEventListener("change", function (e) {
    currentMonth = Number(e.target.value);
    update(currentMonth, currentYear);
  });
  
  select_year.addEventListener("change", function (e) {
    currentYear = Number(e.target.value);
    update(currentMonth, currentYear);
  });

  // change selector value
  select_month.value = currentMonth
  select_year.value = currentYear

  // update upon initializing
  update(currentMonth, currentYear)
}

// initialize column listener
function initializeColumn(onClickFunction) {
  const rows = Array.from(document.getElementsByClassName('calendar-row'))
  rows.forEach((row) => {
    row.childNodes.forEach((td) => {
      td.addEventListener('click', () => {
        if (td.children[0].textContent === '') {
          return
        }
        const day = Number(td.children[0].textContent)
        const month = Number(select_month.value) + 1
        const year = Number(select_year.value)

        if (day === '') {
          return
        }

        // change date title on timeline
        document.getElementById("date-title").innerHTML = `Date: ${day}/${month}/${year}`

        // stuffs that i dont understand
        const date = new Date(`${year}-${month}-${day}`)
        onClickFunction(date)
      })
    })
  })
}

const dateElementAll = document.querySelectorAll(".calendar-row > td");

dateElementAll.forEach((td) => {
  td.addEventListener("click", (e) => {
    if (!td.firstElementChild.textContent) return;

    // remove all selected styles
    dateElementAll.forEach((_td) => _td.classList.remove("date-selected"));

    // add selected class to td
    td.classList.add("date-selected");
  });
});

export { initializeCalendar, initializeColumn }