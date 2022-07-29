/*
STILL IN PROGRESS
What it should do is be able to allow an input whhere
it will popup an input to set how many hours / minutes you want to do that for
and you can set several of those all at once
*/

window.onload = function(){
    var switchBack = document.getElementById("sw");
    var plus = document.getElementById("plussign");
    var minus = document.getElementById("minussign");
    var startSave = document.getElementById("start");
    switchBack.onclick = swit;
    plus.onclick = newInputSet;
    minus.onclick = minusInput;
    
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
// function activated when user click a button that says start.
function saveUserData(){
    var minHourIndex = 0;
    var saveMin = document.getElementsByClassName("minI");
    var saveHour = document.getElementsByClassName("hourI");
    var numbOfInputs = document.getElementsByTagName("div");
    const storeMH = {
        min: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hour: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }  
    for(var i = 0; i < saveMin.length; i++){
        if(parseInt(saveMin[i].value) == 0 && parseInt(saveMin[i].value) == 0){
            // be careful for cases e.g. if user leaves random set empty
            // could use below to deal w/ that
            numbOfInputs[(6 + i)].remove();

        }else{
            storeMH.min[i] = parseInt(saveMin[i].value);
            storeMH.Hour[i] = parseInt(saveMin[i].value);
        }
    }
    

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
