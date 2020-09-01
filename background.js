// const bears = {}
window.bears = {}
// chrome.runtime.onMessage.addListener(function(request,sender ,sendResponse){
//   //  bears[request.url] = request.count



// })

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request == "activated"){
            onActivation()
        }
        if(request == "deactivated"){
            onDeactivation()
        }
        if(request == "resetTimer"){
            resetTimer()
        }
    }
);


// chrome.browserAction.onClicked.addListener(function(tab){
//     chrome.tabs.create({url:'popup.html'})


//     //setupTimers()
// })



var active =false

var badgeTextId;
var currentBadgeText;

var timeoutInMiliseconds = 10000;
var timeoutId; 



function onActivation(){

    chrome.browserAction.setBadgeBackgroundColor({
        color: '#2d7a39'
    });

    chrome.storage.local.set({ 
        active: true
    })

    active =true
    currentBadgeText = timeoutInMiliseconds
    setupTimers()
}


function onDeactivation(){
    chrome.storage.local.set({ 
        active: false
    })

    active =false
    chrome.browserAction.setBadgeText({text:"OFF"})
    chrome.browserAction.setBadgeBackgroundColor({
        color: '#C15612'
    });
    desetupTimers()
    stopTimer()
    
}

function setupTimers () {

    
    chrome.tabs.query({},
        function(tabs){
            
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "setupListeners");
            }
        })
     
    startTimer();
}

function desetupTimers () {

    
    chrome.tabs.query({},
        function(tabs){
            
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "desetupListeners");
            }
        })
     
    
}
 
  
function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    doActive() 

    chrome.browserAction.setBadgeText({text:`${currentBadgeText/1000}`})
    badgeTextId = window.setInterval(function(){
        
        currentBadgeText -= 1000
        chrome.browserAction.setBadgeText({text:`${currentBadgeText/1000}`})



    },1000)

    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}

function resetTimer() { 

    window.clearInterval(badgeTextId)
    currentBadgeText = timeoutInMiliseconds

    window.clearTimeout(timeoutId)
    startTimer();
}

function stopTimer(){
    window.clearInterval(badgeTextId)
    window.clearTimeout(timeoutId)
}


function doActive(){
    chrome.tabs.query({},
        function(tabs){
            
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "play");
            }
        })
}
  
function doInactive() {
    // does whatever you need it to actually do - probably signs them out or stops polling the server for info

    chrome.tabs.query({},
        function(tabs){
            
            for (var i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "pause");
            }
        })
}




chrome.tabs.query({},
    function(tabs){
        
        for (var i=0; i<tabs.length; ++i) {
            chrome.tabs.sendMessage(tabs[i].id, "play");
        }
        // chrome.tabs.sendMessage(tabs[0].id,'hi',setCount)
    })