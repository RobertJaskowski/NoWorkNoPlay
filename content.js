
chrome.storage.local.get('active', function(data) {
    if(data.active==true){
        setupListeners()
    }
});

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



function setupListeners(){
    this.addEventListener("mousemove", ResetTimer, false);
    this.addEventListener("mousedown", ResetTimer, false);
    this.addEventListener("keypress", ResetTimer, false);
    this.addEventListener("DOMMouseScroll", ResetTimer, false);
    this.addEventListener("mousewheel", ResetTimer, false);
    this.addEventListener("touchmove", ResetTimer, false);
    this.addEventListener("MSPointerMove", ResetTimer, false);
}

function desetupListeners(){
    this.removeEventListener("mousemove", ResetTimer, false);
    this.removeEventListener("mousedown", ResetTimer, false);
    this.removeEventListener("keypress", ResetTimer, false);
    this.removeEventListener("DOMMouseScroll", ResetTimer, false);
    this.removeEventListener("mousewheel", ResetTimer, false);
    this.removeEventListener("touchmove", ResetTimer, false);
    this.removeEventListener("MSPointerMove", ResetTimer, false);
}



function ResetTimer(){
    chrome.runtime.sendMessage("resetTimer")
}

// function responseRec(){
//     alert('responsed')
// }





const tes = document.getElementById("player-container")

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '66') {
        // up arrow 38    b
        // document.getElementById("player-container").play()
        //document.getElementsByTagName('video')[0].play()
    }
    else if (e.keyCode == '78') {
        // down arrow 40   n
        // document.getElementById("player-container").pause()
       // document.getElementsByTagName('video')[0].pause()
    }
    else if (e.keyCode == '37') {
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}