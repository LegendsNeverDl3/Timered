/*  
    This is the main countdown page
*/
// these variables are holders that can be accessed anywhere  
var countDownTemp;
var setTime;
var timeron;

window.onload = function(){
    var timeBu = document.getElementById("timeBu");
    var clearbut = document.getElementById("stopAlarm");
    var mainPg = document.getElementById("return");
    timeBu.onclick = timerandcount;
    clearbut.onclick = clearAlarm;
    mainPg.onclick = retur;
    getChanges();
}
// Onclick of button, changes the page back to the mainpage 
function retur(){
    location.href = "popup.html";
}


// Saveing changes to the three holders
function saveChanges(){
    chrome.storage.sync.set({'count' : countDownTemp, 'time' : setTime, 'timeon' : timeron}, function(){
    });
   
}
// Accessing the Changes saved 
function getChanges(){
    chrome.storage.sync.get(['count', 'time', 'timeon'], function(data){
        if(data.count > 0 && data.count <= 40){
            var outputon = document.getElementById("outputon");
            var ou = document.getElementById("outputtime");
            ou.innerHTML = data.time;
            outputon.innerHTML = data.timeon;
        }
    });
}
// Combines to functions so that both can be called in the window.onload function
function timerandcount(){
  timerSet();
}
// Setting The Timer 
function timerSet(){
    var ti = document.getElementById("time");
    var ou = document.getElementById("outputtime");
    if(ti.value > 40){
        warningText("Please input a number that is 40 min or less!");
    }else if(ti.value.includes("-")){
        warningText("Please input a POSITIVE number!");
    }else if(ti.value == ""){
        warningText("Please input a number!");
    }else if(ti.value == 0){
        warningText("Please input a number greater than zero!");
    }else{
        ou.innerHTML = "The time is set to(min) : " + ti.value;
        countDownTemp = ti.value;
        setTime = "The time is set to(min) : " + ti.value;
        timeron = "The Timer is : On";
        theAlarm();
        saveChanges();
    }
    ti.value="";
}



// Timer function 
function theAlarm(){
    var outputon = document.getElementById("outputon");
    outputon.innerHTML = "The Timer is : On";
    msg(countDownTemp);
    chrome.alarms.create("myAlarm", {
        delayInMinutes : parseInt(countDownTemp)
    }); 
}

// Clears the countdown and resets the values
function clearAlarm(){
    // clearing alarm will also clear the synced data so it wwon't remeber the last number inputted
    var ou = document.getElementById("outputtime");
    var outputon = document.getElementById("outputon");
    chrome.alarms.clear("myAlarm");
    chrome.storage.sync.clear();
    outputon.innerHTML = "The Timer is : Off";      
    ou.innerHTML = "The time is set to(min) : ";
    // message to background script
    msg("0");
    // message to foreground/content script
    chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
        tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, "Timer Cleared");
        });
    });
}


/*  Styleing Methods */

// none currently

/*  HELPER METHODS   */

// Does what it says; outputs warning text
function warningText(warn){
    var max = document.getElementById("max");
    max.innerHTML = warn;
    setTimeout(function () {
        max.innerHTML = "";
    }, 5000);
}

// Sending Messages 
function msg(messgg) {
    chrome.runtime.sendMessage(messgg);
}


/* Extra ideas  */

/*
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"countDownTemp"}, function(response){

    });
});
*/