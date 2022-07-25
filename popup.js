/*
This is the mainpage of the popup, where you can switch
to other pages such as countdown, timer, or schedule
*/

var countDownTemp;
var setTime;
var timeron;
// onload function holds majority of "actions"
window.onload = function(){
    var newPage = document.getElementById("cloc");
    var switches = document.getElementById("switch");
    var countDownMode = document.getElementById("ct");
    var infobu = document.getElementById("butto");
    newPage.onclick = timere;
    switches.onclick = switchToSchedule;
    ct.onclick = ctDown;
    infobu.onclick = moreInfo;
}
// Onclick of button, switches the mainpage to the timer page
function timere(){
    location.href = "timer.html";
}
// onclick of button, switches mainpage to the schedule page
function switchToSchedule(){
    location.href = "schedule.html";
}
// onclick of button, switches the mainpage to the countdown page
function ctDown(){
    location.href = "countDown.html";
}

/* Styeling Methods */
// Deals with the "moreinfo" button on the bottom of the mainpage (popup.html)
function moreInfo(){
    var about = document.getElementById("about");
    about.innerHTML = "This website allows you to input a desired time period set between [1,40] minutes. "+
     "Input a desired number into the the area and click \"Set timer\" then it will, after that specified "+
     "time, bring up a new page reminding you to rest your eyes and pause from your work temporarily."+
     " You get to choose how long your break is for and what music to input in!";
    var infobutton = document.getElementById("butto");
    if(about.style.display == "block"){
        about.style.display = "none";
        infobutton.style.color = "green";
        infobutton.innerHTML = "More Info";
    }else{
        about.style.display = "block";
        about.style.fontWeight = "bold";
        infobutton.style.color = "red";
        infobutton.innerHTML = "Hide Info";
    }
}



/* Please Ignore Below, They are just extra ideas */

/*
chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
});

chrome.action.onClicked.addListener(()=>{

})

chrome.runtime.getBackgroundPage(function(bg){
    if(bg.sessionDataHTML){
      document.body.innerHTML = bg.sessionDataHTML; 
    }
    setInterval(function(){
      bg.sessionDataHTML = document.body.innerHTML
    },1000);    
  
    //do the rest of your work here.
  })
*/
 
