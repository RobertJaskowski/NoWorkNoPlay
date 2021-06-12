// const bears = {}
window.bears = {}
// chrome.runtime.onMessage.addListener(function(request,sender ,sendResponse){
//   //  bears[request.url] = request.count



// })

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request == "activated") {
            Start()
        }
        if (request == "deactivated") {
            Stop()
        }
        if (request == "resetTimer") {
            if (!ActiveTimerActive)
                ResetTimer()
        }

        if (request == "ActiveTimerActivated") {
            OnActiveTimerActivation()
        }
        if (request == "ActiveTimerDectivated") {
            OnActiveTimerDectivation();
        }


    }
);




// chrome.browserAction.onClicked.addListener(function(tab){
//     chrome.tabs.create({url:'popup.html'})


//     //setupTimers()
// })



var active = false
var ActiveTimerActive = false

var badgeTextId;
var currentBadgeText;

var timeoutInMiliseconds = 5000;
var timeoutId;

var fetchTimeoutInMiliseconds = 2000;
var fetchTimeoutId;

var loopTimeoutId;



Init()

function Init() {

    chrome.storage.local.get('active', function(data) {
        if(data.active==true){
            Start()
        }else{
            Stop()
        }
    });

}

function Start() {

    chrome.browserAction.setBadgeBackgroundColor({
        color: '#2d7a39'
    });

    chrome.storage.local.set({
        active: true
    })

    active = true
    currentBadgeText = timeoutInMiliseconds



    chrome.storage.local.get('ActiveTimerActive', function(data) {
        if(data.ActiveTimerActive ==true){
            OnActiveTimerDectivation();
        }else{
            OnActiveTimerDectivation()
        }
    });


    StartTimer()


    //loopTimeoutId = window.setTimeout(OnCheck, timeoutInMiliseconds)


}

function Stop() {

    chrome.storage.local.set({
        active: false
    })

    active = false
    chrome.browserAction.setBadgeText({ text: "OFF" })
    chrome.browserAction.setBadgeBackgroundColor({
        color: '#C15612'
    });
    chrome.storage.local.get('ActiveTimerActive', function(data) {
        if(data.ActiveTimerActive ==true){
            OnActiveTimerDectivation()
        }else{
        }
    });



    DesetupListeners()
    StopTimer()
}





function OnActiveTimerActivation() {
    chrome.storage.local.set({
        ActiveTimerActive: true
    })
    ActiveTimerActive = true;

    fetchTimeoutId = window.setInterval(function () {

        fetchData()

    }, fetchTimeoutInMiliseconds)


}

function OnActiveTimerDectivation() {
    chrome.storage.local.set({
        ActiveTimerActive: false
    })

    ActiveTimerActive = false;

    window.clearInterval(fetchTimeoutId)

    SetupListeners();
}


function fetchData() {
    fetch('http://localhost:1337/value/ActiveTimer').then(r => r.text()).then(result => {
        if (result.includes("IsActive")) {
            ResetTimer()
        } else if (result.includes("IsNotActive")) {
            Pause()
            StopTimer()
        } else {
            chrome.browserAction.setBadgeText({ text: "err" })

        }
    })
}


function SetupListeners() {


    chrome.tabs.query({},
        function (tabs) {

            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "setupListeners");
            }
        })

}

function DesetupListeners() {


    chrome.tabs.query({},
        function (tabs) {

            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "desetupListeners");
            }
        })


}


function StartTimer() {
    // window.setTimeout returns an Id that can be used to start and stop a timer
    Play()

    chrome.browserAction.setBadgeText({ text: `${currentBadgeText / 1000}` })
    badgeTextId = window.setInterval(function () {

        currentBadgeText -= 1000
        chrome.browserAction.setBadgeText({ text: `${currentBadgeText / 1000}` })



    }, 1000)

    timeoutId = window.setTimeout(Pause, timeoutInMiliseconds)
}

function ResetTimer() {

    window.clearInterval(badgeTextId)
    currentBadgeText = timeoutInMiliseconds

    window.clearTimeout(timeoutId)
    StartTimer();
}

function StopTimer() {
    window.clearInterval(badgeTextId)
    window.clearTimeout(timeoutId)
}


function Play() {
    chrome.browserAction.setBadgeBackgroundColor({
        color: '#2d7a39'
    });

    chrome.tabs.query({},
        function (tabs) {

            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "play");
            }
        })
}

function Pause() {

    chrome.browserAction.setBadgeText({ text: "||" })
    chrome.browserAction.setBadgeBackgroundColor({
        color: '#C15612'
    });


    chrome.tabs.query({},
        function (tabs) {

            for (var i = 0; i < tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, "pause");
            }
        })
}

