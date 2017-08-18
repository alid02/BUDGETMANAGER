// we are going to set the limit in option page and the reset value to 0

$(function() {

    chrome.storage.sync.get("limit",function(budget){
        $("#limit").val(budget.limit);
        console.log("asdd");

        //we store the limit on text on input text h2 element
    })

    $("#saveLimit").click(function(){
         //when we click the save button
         console.log("ttttttt");
        var limit = $("#limit").val();
        console.log(limit);       // limit value will save in var limit
        if(limit){                            // if the limit is given
            chrome.storage.sync.set({"limit": limit}, function(){
                close();                     // set limit and store in chrome storage and close tab
            });
            console.log("zzzzzz");
        }
    });

    $("#resetTotal").click(function(){
             //when click the reset
        chrome.storage.sync.set({"total": 0});
    });      // total value will set to 0 and store in the chrome storage
});