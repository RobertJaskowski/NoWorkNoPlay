//alert("tset")  "default_popup":"popup.html",
// chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
//     const re = new RegExp('bear','gi')
//     const matches = document.documentElement.innerHTML.match(re)
//     sendResponse({count:matches.length})
// })

const re = new RegExp('bear','gi')
const matches = document.documentElement.innerHTML.match(re)

// chrome.runtime.sendMessage({
//     url:window.location.href,
//     count:matches.length
// })


chrome.storage.local.get('active', function(data) {
    if(data.active==true){
        setupListeners()
    }
});

function setupListeners(){
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
}

function desetupListeners(){
    this.removeEventListener("mousemove", resetTimer, false);
    this.removeEventListener("mousedown", resetTimer, false);
    this.removeEventListener("keypress", resetTimer, false);
    this.removeEventListener("DOMMouseScroll", resetTimer, false);
    this.removeEventListener("mousewheel", resetTimer, false);
    this.removeEventListener("touchmove", resetTimer, false);
    this.removeEventListener("MSPointerMove", resetTimer, false);
}



function resetTimer(){
    chrome.runtime.sendMessage("resetTimer")
}

// function responseRec(){
//     alert('responsed')
// }



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request == "play")
        document.getElementsByTagName('video')[0].play()

    if(request == "pause")
        document.getElementsByTagName('video')[0].pause()

    if(request == "testing")
        alert("testing")


    if(request == "setupListeners")
        setupListeners()

    if(request == "desetupListeners")
        desetupListeners()
})




const tes = document.getElementById("player-container")

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '66') {
        // up arrow 38    b
        // document.getElementById("player-container").play()
        document.getElementsByTagName('video')[0].play()
    }
    else if (e.keyCode == '78') {
        // down arrow 40   n
        // document.getElementById("player-container").pause()
        document.getElementsByTagName('video')[0].pause()
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}