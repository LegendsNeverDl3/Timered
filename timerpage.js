/*
The popup timerpage which will ativate when the timer reaches zero.
It has a snooze option, and music input.
*/

window.onload = function(){
    // this call covers the background images
    backg();
    var audio = document.getElementById("temp");
    audio.play();
    var snoozebutton = document.getElementById("snooze");
    var musicInput = document.getElementById("musicInput");
    snoozebutton.onclick = snooze;
    // for music input i.e. when user clicks enter we use a listener to catch that
    musicInput.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            music();
            return false;
        }
    });

}
// This deals wih the music with input
function music(){
    var audio = document.getElementById("temp");
    var musicInput = document.getElementById("musicInput");
    // if statements to account for different cases e.g. if user adds .mp3 to the name of song
    if(musicInput.value.includes(".mp3")){
        audio.src = musicInput.value.substring(0,1).toUpperCase() + musicInput.value.substring(1,musicInput.value.length).toLowerCase();
    }else{
        audio.src = musicInput.value.substring(0,1).toUpperCase() + musicInput.value.substring(1,musicInput.value.length).toLowerCase() + ".mp3";
    }
    audio.load();
    audio.play();
}
// This function combines to other functions so I can call both of them on the window. onload
function snooze(){
    snooze2();
    snooze1();
}
// Adds a confirmation for the user to choose yes or no to snooze the timerpage
function snooze1(){
    if(confirm("Snooze?")){
        window.close("timerpage.html");
    }  
}
//snoozes the current timerpage for 5,4,3,2, or 1 minutes
function snooze2(){
    var snoozeoption = document.getElementById("snoozeoption");
    var opt = snoozeoption.options[snoozeoption.selectedIndex].value;
    if(opt === "5min") {
        openWindow(5);
    }else if(opt === "4min"){
        openWindow(4);
    }else if(opt === "3min"){
        openWindow(3);
    }else if(opt === "2min"){
        openWindow(2);
    }else if(opt === "1min"){
        openWindow(1);
    }else{
        // do nothing
    }
}

// Runs the background image slide
var background = ["time2.jpg", "time3.jpeg", "time4.jpeg", "time5.jpeg","time1.jpg"];
function backg(){
    var j = 0;
    var image = document.getElementById("backg");
    setInterval(function(){
        if(j == background.length){
            j=0;
        }else{
            image.style.backgroundImage = "url(" + background[j]+ ")";
            j++;
        }
    },5000);
         
}

/* helper methods */

// Creates a timer/alarm that runs in the background and goes off in the set time num
function openWindow(num){
    chrome.alarms.create("myAlarm", {
        delayInMinutes : parseInt(num)
    });
}