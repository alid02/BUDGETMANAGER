// we are going to set the limit in option page and the reset value to 0

$(function() {

    chrome.storage.sync.get("limit",function(budget){
        $("#limit").val(budget.limit);


        //we store the limit on text on input text h2 element
    })

    $("#saveLimit").click(function(){
         //when we click the save button

        var limit = $("#limit").val();
           // limit value will save in var limit
        if(limit){                            // if the limit is given
            chrome.storage.sync.set({"limit": limit}, function(){
                close();                     // set limit and store in chrome storage and close tab
            });

        }
    });

    $("#resetTotal").click(function(){
             //when click the reset
        chrome.storage.sync.set({'total': 0}, function(){
            var notifOptions = {            // we define notification options
                        type: 'basic',                // type of notification we can change it in chrome developer tools
                        iconUrl: 'icon48.png',          // icon appear for limit
                        title: 'Total reset!',
                        message: "Total has been reset to 0!"

                    };
                    chrome.notifications.create(notifOptions);
                    //here we use chrome api tocreate the notification
        });
    });      // total value will set to 0 and store in the chrome storage
});