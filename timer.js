/*
This code deals with a clock function and a timer function, where you
can input the number of hours, minutes, or seconds in the timer. The 
clock is just for visual use.
*/

// the main values that are altered...temp is used when clear timer is needed
var mainHours = 0;
var mainMin = 0;
var mainSec = 0;
var temp = false;
window.onload = function(){
    clock();
    var theHour = document.getElementById("hours");
    var theMin = document.getElementById("minutes");
    var theSec = document.getElementById("seconds");
    var startButton = document.getElementById("start");
    var clearButton = document.getElementById("clear");
    var mainPage = document.getElementById("switch");
    startButton.innerHTML = "Start";
    mainPage.onclick = swi;
    startButton.onclick = startTimer;
    clearButton.onclick = changeBoolean;

     // accessing the saved data
     chrome.storage.local.get(['number', 'pausednum'], function(savedSec) {
        console.log(savedSec.number);
        if(parseInt(savedSec.number) > 0){
            mainSec = savedSec.number;
            convertTotalSecTo();
            startBackTimer();
        }
        console.log(savedSec.pausednum);
        if(parseInt(savedSec.pausednum) > 0){
            startButton.innerHTML = "Continue";
            mainSec = savedSec.pausednum;
            convertTotalSecTo();
            var mainCountDown = document.getElementById("countdown");
            printNum(mainCountDown);
        }
    });
    
}
// this function changes the boolean so that it will go through and if statement and clear the timer
function changeBoolean(){
    temp = true;
    clearTimer();
}
// switches the current page back to the mainpage
function swi(){
    location.href = "popup.html";
}
// The coding for the clock part(obviously)
function clock(){
    var clocker = document.getElementById("clock");
    var ampm;
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    if((new Date()).getHours() < 12){
        ampm = "am";
    }else{
        ampm = "pm";
    }
    if(hours > 12){
        hours = hours-12;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    clocker.innerHTML = hours + " : " + minutes + " : " + seconds + ampm;
    var clo = setInterval(function(){
        today = new Date();
        hours = today.getHours();
        minutes = today.getMinutes();
        seconds = today.getSeconds();
        if(hours > 12){
            hours = hours-12;
        }
        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        var time = hours + " : " + minutes + " : " + seconds + ampm;
        document.title = parseInt(hours) + ":" + minutes + ampm;
        clocker.innerHTML = time;
    },1000)
    
}
// Updates mainHours
function hour(){ 
    var hours = document.getElementById("hours").value; 
    if(hours == ""){
        mainHours += 0;
    }else{
        mainHours += parseInt(hours);
    } 
}
// Updates mainMin
function min(){ 
    var mins = document.getElementById("minutes").value; 
    if(mins == ""){
        mainMin += 0;
        mainHours += parseInt(Math.floor(mainMin / 60)); 
        mainMin = parseInt(mainMin) % 60;
    }else{
        if((mins) > 60){ 
            mainHours += parseInt(Math.floor((mins) / 60)); 
            mainMin = parseInt(mins) % 60; 
        }else{
            mainMin += parseInt(mins);
            mainHours += parseInt(Math.floor(mainMin / 60));
            mainMin = parseInt(mainMin) % 60; 
        }
    }  
}
// Updates mainSec
function sec(){ 
    var secs = document.getElementById("seconds").value; 
    if(secs == ""){
        mainSec = 0;
    }else{    
        if((secs) > 60){ 
            mainMin += parseInt(Math.floor((secs) / 60)); 
            mainSec = parseInt(secs) % 60; 
        }else{
            mainSec += parseInt(secs);
        }
    }
    
}
// Converts the totalSec from the background script message, to hours, mins, and secs.
function convertTotalSecTo(){
    mainMin = Math.floor(mainSec / 60);
    mainSec = mainSec % 60;
    mainHours = Math.floor(mainMin / 60);
    mainMin = mainMin % 60;
}

// Main timer function
function startTimer(){
    var startButton = document.getElementById("start");
    if(startButton.innerHTML == "Pause"){
        temp = true;
        chrome.runtime.sendMessage("clear");
        startButton.innerHTML = "Continue";
        chrome.storage.local.set({pausednum: (combineMinSecHourToSec())}, function() {
        });
    }else if(startButton.innerHTML == "Continue"){
        chrome.storage.local.remove("pausednum",function() {
        });
        chrome.runtime.sendMessage({thevalue: combineMinSecHourToSec()});
        resetInput();
        startButton.innerHTML = "Pause";
        var mainCountDown = document.getElementById("countdown"); 
        printNum(mainCountDown);
        theCount(mainCountDown);
    }else{
        sec();
        min();
        hour();
        mainHours = parseInt(Math.floor(mainHours));
        mainMin = parseInt(Math.floor(mainMin));
        mainSec = parseInt(Math.floor(mainSec));
        chrome.runtime.sendMessage({thevalue: combineMinSecHourToSec()});
        resetInput();
        startButton.innerHTML = "Pause";
        var mainCountDown = document.getElementById("countdown");
        printNum(mainCountDown);
        theCount(mainCountDown);
    }  
}

// Start back timer when you close the popup and reopen it
function startBackTimer(){
    var startButton = document.getElementById("start");
    startButton.innerHTML = "Pause";
    var mainCountDown = document.getElementById("countdown");
    printNum(mainCountDown);
    theCount(mainCountDown);
}
// Combines hours, seconds, and minutes, so that I can do a countdown in the background script
function combineMinSecHourToSec(){
    var combine = mainHours * 60 * 60 + mainMin * 60 + mainSec;
    return combine + "";
}

// Simply to remove all values and change them to zero, and empty the inputs.
function clearTimer(){
    chrome.runtime.sendMessage("clear");
    chrome.storage.local.clear();
    resetInput();
    var startButton = document.getElementById("start");
    var mainCountDown = document.getElementById("countdown");
    mainHours = 0;
    mainMin = 0;
    mainSec = 0;
    mainCountDown.innerHTML = "00:00:00";
    startButton.innerHTML = "Start";
}

/* helper methods */

// Formats that the countdown is printed in
function printNum(mainCountDown){
    
    if(mainHours < 10 && mainMin < 10 && mainSec < 10){
        mainCountDown.innerHTML = "0" + parseInt(mainHours) + ":" + parseInt(mainMin) + ":0" + parseInt(mainSec);
    }else if(mainHours < 10 && mainMin < 10){
        mainCountDown.innerHTML = "0" + parseInt(mainHours) + ":0" + parseInt(mainMin) + ":" + parseInt(mainSec);
    }else if(mainHours < 10 && mainSec < 10){
        mainCountDown.innerHTML = "0" + parseInt(mainHours) + ":" + parseInt(mainMin) + ":0" + parseInt(mainSec);
    }else if(mainMin < 10 && mainSec < 10){
        mainCountDown.innerHTML = parseInt(mainHours) + ":" + parseInt(mainMin) + ":0" + parseInt(mainSec);
    }else if(mainHours < 10){
        mainCountDown.innerHTML = "0" + parseInt(mainHours) + ":" + parseInt(mainMin) + ":" + parseInt(mainSec);
    }else if(mainMin < 10){
        mainCountDown.innerHTML = parseInt(mainHours) + ":0" + parseInt(mainMin) + ":" + parseInt(mainSec);
    }else if(mainSec < 10){
        mainCountDown.innerHTML = parseInt(mainHours) + ":" + parseInt(mainMin) + ":0" + parseInt(mainSec);
    }else{
        mainCountDown.innerHTML = parseInt(mainHours) + ":" + parseInt(mainMin) + ":" + parseInt(mainSec);
    }
    // Other forms of the code above I tried and are saving for now.
    
    /*
    if(mainHours < 10){
        mainCountDown.innerHTML = "0" + mainHours + ":" + mainMin + ":" + mainSec;
    }else{
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":" + mainSec;
    }
    if(mainMin < 10){
        mainCountDown.innerHTML = mainHours + ":0" + mainMin + ":" + mainSec;
    }else{
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":" + mainSec;
    }
    if(mainSec < 10){
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":0" + mainSec;
    }else{
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":" + mainSec;
    }
    
    */

    /*
    if(mainHours > 9 && mainMin > 9 && mainSec > 9){
        mainCountDown.innerHTML = mainHours.toString().substring(1) + ":" + mainMin.toString().substring(1) + ":0" + mainSec;
    }else if(mainHours > 9 && mainMin > 9){
        mainCountDown.innerHTML = mainHours.toString().substring(1) + ":0" + mainMin + ":" + mainSec;
    }else if(mainHours > 9 && mainSec > 9){
        mainCountDown.innerHTML = mainHours.toString().substring(1) + ":" + mainMin + ":0" + mainSec;
    }else if(mainMin > 9 && mainSec > 9){
        mainCountDown.innerHTML = mainHours + ":" + mainMin.toString().substring(1) + ":0" + mainSec;
    }else if(mainHours > 9){
        mainCountDown.innerHTML = "0" + mainHours + ":" + mainMin + ":" + mainSec;
    }else if(mainMin > 9){
        mainCountDown.innerHTML = mainHours + ":0" + mainMin + ":" + mainSec;
    }else if(mainSec > 9){
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":0" + mainSec;
    }else{
        mainCountDown.innerHTML = mainHours + ":" + mainMin + ":" + mainSec;
    }

  */
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

// Empties the input tags of text
function resetInput(){
    var theHour = document.getElementById("hours");
    var theMin = document.getElementById("minutes");
    var theSec = document.getElementById("seconds");
    theHour.value = "";
    theMin.value = "";
    theSec.value = "";
}
