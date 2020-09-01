document.addEventListener('DOMContentLoaded',function(){




var checkbox = document.querySelector("input[name=checkbox]");


chrome.storage.local.get('active', function(data) {
    if(data.active==true){
        checkbox.checked =true
    }
});


checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        chrome.runtime.sendMessage("activated")
    } else { 
        chrome.runtime.sendMessage("deactivated")
    }
});




    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach(function(url){
    //     const div = document.createElement('div')
    //     div.textContent = `${url}: ${bg.bears[url]}`
    //     document.body.appendChild(div)
    // })

    // document.querySelector('button').addEventListener('click',onclick,false)
    // function onclick (){
    //     chrome.tabs.query({currentWindow:true,active:true},
    //         function(tabs){
    //             chrome.tabs.sendMessage(tabs[0].id,'hi',setCount)
    //         })
    // }


    // function setCount(res){
    //     const div = document.createElement('div')
    //     div.textContent = `${res.count} bears`
    //     document.body.appendChild(div)
    // }
},false)