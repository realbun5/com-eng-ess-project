//  timeline


function addNewReminderLine(item, onclickFunction){
    // create element
    const div = document.createElement('div');

    const start_time = item.timeperiod.start_time;
    const stop_time = item.timeperiod.stop_time;
    
    const lengthpercent = (stop_time - start_time)*100 / 1440;
    const marginpercent = (start_time)*100 / 1440;

    // add class
    div.classList.add('each-reminder-line');
    div.style.width = `${lengthpercent}%`;
    div.style['margin-left'] = `${marginpercent}%`;
    div.style['border-bottom'] = `solid ${item.color} 4px`;
    div.style['border-radius'] = `0px`;
    div.style['margin-top'] = `20px`;
    div.innerText = item.name;

    div.onmouseover = function(){
        div.style['border-bottom'] = `solid ${item.color} 6px`;
        div.style['box-shadow'] = `0px 0px 15px rgb(0 0 0 / 0.2)`;
        div.style['overflow'] = `visible`;
        div.style['color'] = item.color;
    }

    div.onmouseleave = function(){
        div.style['border-bottom'] = `solid ${item.color} 4px`;
        div.style['box-shadow'] = ``;
        div.style['overflow'] = `hidden`;
        div.style['color'] = `black`;
    }

    div.addEventListener('click', () => {
      onclickFunction(item)
    })

    document.getElementById('row-container').appendChild(div);
}

export { addNewReminderLine }

function dateIntToList(timenum){
    const date = new Date(timenum);

    //return as list of [d,m,y,hour,min]
    return [date.getDate, date.getMonth+1, date.getFullYear, date.getHours, date.getMinutes]
}
