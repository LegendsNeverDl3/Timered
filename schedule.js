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
    minInput.id = "mI";
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
}
// Removes bulleted list
function removeBulletList(){
    document.getElementsByTagName("ul")[0].remove();
    document.getElementsByTagName("li")[0].remove();
}

// Deletes the bottom most input
function minusInput(){
    var numbOfInputs = document.getElementsByTagName("input");
    // if you don't do this, you will get a undefined error when removing when theres no input tag to remove
    if(numbOfInputs.length > 1){
        document.getElementsByTagName('input')[1].remove();
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
