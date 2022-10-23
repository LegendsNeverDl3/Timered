/* 
This is my content script, where the code excecuted here gets
executed into a website. It's main use currently is to popup a
countdown inside a webpage.
*/

var x = 0;
// listens for messages from popup page or background script
chrome.runtime.onMessage.addListener(
    // creates or deletes a span tag to allow for a countdown at the top of a website
    function(message, sender, sendResponse){
            if(x == 0){
                createSpan(message);
                x++;
            }else if(parseInt(message) == 0){
                removeSpan();
                createSpan(message);
                setTimeout(function () {
                    removeSpan();
                }, 3000);
            }else{
                removeSpan();
                createSpan(message);
            }
        
    }
)

/*  HelperMethods  */
//creates a span element with text
function createSpan(messg){
    var tag = document.createElement("span"); // <span></span>
    var text = document.createTextNode(messg); 
    tag.appendChild(text); // <span>Timer stopped</span>
    var element = document.getElementsByTagName("body")[0];
    element.prepend(tag);
}

//removes the span tag with the message in it
function removeSpan(){
    document.getElementsByTagName("span")[0].remove();
}

