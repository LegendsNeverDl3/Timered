/*
This code runs in the background, meaning, it will continue operating
even when tabs, or the popup window is closed. It's main use is to save
the countdown digits.
*/
var countDownTemp1 = 0;
var countDownTemp2 = 0;
var numOfClicks = 0;
//message listener
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    // this runs the countdown for the countDownTemp1 / the origional countdown I had
    if(parseInt(message) < 61){
        countDownTemp1 = parseInt(message);
        if(message == "0"){
            clearInterval("countDow");
            countDownTemp1 = 0;
        }
            /* Send message to foreground script*/        
            chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, countDownTemp1);
                });
            });
            // Interval for the countdown to go to zero
            var countDow = setInterval(function(){
                if(countDownTemp1 == 0 || countDownTemp1 == "0" || countDownTemp1 == "clear"){
                    clearInterval(countDow);
                }else{
                    countDownTemp1--;
                    // Sends message to foreground script
                    chrome.tabs.query({active: true, currentWindow: true},(tabs) => {
                        tabs.forEach(tab => {
                            chrome.tabs.sendMessage(tab.id, countDownTemp1);
                        });
                    });
                }
            },60000);
        }else{
        // this runs the second countdown
        if(message == "clear"){
            //clearInterval(backgroundcount);
            chrome.storage.local.remove("number",function() {
            });
            countDownTemp2 = "clear";
        }else{
            countDownTemp2 = parseInt(message.thevalue);
            chrome.storage.local.set({number: (countDownTemp2)}, function() {});
            // https://stackoverflow.com/questions/12265403/passing-message-from-background-js-to-popup-js
            var backgroundcount = setInterval(function(){
                if(countDownTemp2 == 0){
                    clearInterval(backgroundcount);
                    chrome.storage.local.remove("number",function() {});
                    chrome.tabs.create({url: "timerpage.html"});
                }else if(countDownTemp2 == "clear" || message == "clear"){
                    clearInterval(backgroundcount);
                    chrome.storage.local.remove("number",function() {});
                }else{
                    countDownTemp2--;
                    chrome.storage.local.set({number: (countDownTemp2)}, function(){})
                    console.log(countDownTemp2)
                }
                
            },1000)
        }
        
    }
})


//Checking for the alarm to "ring" for the timer and pops open the timerpage
chrome.alarms.onAlarm.addListener(()=>{
    //updates the text inside "CountdownMode"
    setTime = "The time is set to(min) : ";
    timeron = "The Timer is : Off";
    chrome.storage.sync.set({'time' : setTime , 'timeon' : timeron},function(){

    })
    
    chrome.tabs.create({
       url: "timerpage.html"
    });
   
});
/* extra ideas */

/*
    chrome.windows.create({
        width : 200,
        height : 100,
        type : "popup",
        url: "options.html"
    });
*/
