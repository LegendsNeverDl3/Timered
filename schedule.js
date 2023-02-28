/*
STILL IN PROGRESS
What it should do is be able to allow an input whhere
it will popup an input to set how many hours / minutes you want to do that for
and you can set several of those all at once
*/
var mainHours = 0;
var mainmin = 0;
var mainSec = 0;
window.onload = function(){
    var switchBack = document.getElementById("sw");
    var plus = document.getElementById("plussign");
    var minus = document.getElementById("minussign");
    var startSave = document.getElementById("start");
    switchBack.onclick = swit;
    plus.onclick = newInputSet;
    minus.onclick = minusInput;
    startSave.onclick = saveUserData;
    //PLEASE NOTE, NEED TO ADD A RESET BUTTON
    
}

// This code switches the current page (schedule.html) back to the "main page"
function swit(){
    location.href = "popup.html";
}


// Adds a bulleted list with extra input
function newInputSet(){
    var numbOfInputs = document.getElementsByTagName("div");
    if(numbOfInputs.length < 26){
        var inputElement = document.createElement('input');
        var div = document.createElement('div');
        var ul = document.createElement('ul');
        var hourLi = document.createElement('li');
        var minLi = document.createElement('li');
        var hourInput = document.createElement('input');
        var minInput = document.createElement('input');
        var hourLabel = document.createElement('label');
        var minLabel = document.createElement('label');

        hourInput.id = "hI";
        hourInput.className = "hourI";
        minInput.id = "mI";
        minInput.className = "minI";
        inputElement.className = "addedInput";
        inputElement.id = "addedInput";

        hourLabel.textContent = "Hours : ";
        minLabel.textContent = "Min : ";

        inputElement.type = "text";
        hourInput.type = "number";
        minInput.type = "number";

        document.body.appendChild(div);
        div.prepend(inputElement);
        div.appendChild(ul);
        ul.appendChild(hourLi);
        ul.appendChild(minLi);
        hourLi.appendChild(hourLabel);
        minLi.appendChild(minLabel);
        hourLabel.appendChild(hourInput);
        minLabel.appendChild(minInput);
    }else{
        warningText("The amount of activites is currently maxed at 20!");
    }
}

// Removes bulleted list
function removeBulletList(){
    document.getElementsByTagName("ul")[0].remove();
    document.getElementsByTagName("li")[0].remove();
}

// Deletes each "section"
function minusInput(){
    var numbOfInputs = document.getElementsByTagName("div");
    // If statement used so user can't delete extra divs.
    if(numbOfInputs.length > 6){
        numbOfInputs[(numbOfInputs.length - 1)].remove();
    }
}
//TODO: Make an extra section called "change position" will ring a timer or whatever every 40 ish min to change position and / or rest from computer
//TODO: Make a project that changes the image on the lockscreen to my TODO list I neeed to coplete (calendar style)
//TODO: Include  a stopwatch function
// function activated when user click a button that says start.
function saveUserData(){
    var minHourIndex = 0;
    var saveMin = document.getElementsByClassName("minI");
    var saveHour = document.getElementsByClassName("hourI");
    var numbOfInputs = document.getElementsByTagName("div");
    var h = document.getElementsByClassName("h");
    var m;
    //max limit is 20
    const storeMH = {
        min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }  
    for(var i = 0; i < saveMin.length; i++){
        // if both min and hour is zero or empty
        if((parseInt(saveMin[i].value) == 0 && parseInt(saveHour[i].value) == 0) || (saveMin[i].value == "" && saveHour[i].value == "")){
            // be careful for cases e.g. if user leaves random set empty
            // could use below to deal w/ that
            numbOfInputs[(6 + i)].remove();
        }else{
            if(saveMin[i].value == ""){
                storeMH.min[i] = 0;
            }else if(saveHour[i].value == ""){
                storeMH.hour[i] = 0;
            }else{
                storeMH.min[i] = formatMin(parseInt(saveMin[i].value));
                storeMH.hour[i] = formatHour(parseInt(saveHour[i].value));
                mainHours = formatHour(parseInt(saveHour[i].value));
                mainMin = formatMin(parseInt(saveMin[i].value));
            }
        }
    }
    

}

/* Helper Methods */

// formats min to 60 or below
function formatMin(theMin){
    if(theMin > 60){
        return theMin % 60;
    }else{
        return theMin;
    }
}

// formats hour according to min(if min is > 60)
function formatHour(theMin, theHour){
    if(theMin > 60){
        return theHour + Math.floor(theMin / 60);
    }else{
        return theHour;
    }
}

// displays a warning text
function warningText(warn){
    var max = document.createElement("p");
    max.textContent = warn;
    max.style.color = "red";
    document.body.appendChild(max);
    setTimeout(function () {
        max.remove();
    }, 8000);
}

// Runs the interval countdown
function theCount(mainCountDown){
    var timerr = setInterval(function(){
        if(temp){
            clearInterval(timerr);
            temp = false;
        }else if(mainHours == 0 && mainMin == 0 && mainSec == 0){
            clearInterval(timerr);
        }else if(mainMin == 0 && mainSec == 0){
            mainHours--; 
            mainMin = 59;
            mainSec = 60;
            mainSec--;
            printNum(mainCountDown);                
        }else if(mainSec == 0){ 
            mainMin--;
            mainSec = 60;
            mainSec--;
            printNum(mainCountDown);
        }else{
            mainSec--;
            printNum(mainCountDown);
        }

    },1000);
}

function printNum(mainCountDown){
    mainCountDown.innerHTML = parseInt(mainHours) + ":" + parseInt(mainMin) + ":" + parseInt(mainSec);
}

/* Ideas I'm trying out */
/* 
var inputClick1 = document.getElementById("hI");
var inputClick2 = document.getElementById("mI");
var addedInput = document.getElementById("addedInput");
addedInput.addEventListener("focus", bulletList, true);
or use document.addEvent......
var x = setTimeout(() => {
    removeBulletList();
}, 10000);
inputClick1.addEventListener("click", () =>{
    clearTimeout(x);
}, true)
inputClick2.addEventListener("click", () =>{
    clearTimeout(x);
}, true)

*/
/*
function amntOfTime(){
    var inElement = document.createElement('input');
    inElement.
    document.body.appendChild();
}
*/
