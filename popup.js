$(function(){

    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total); //gettting the total
        //here we are storeing the spend data when ever we click we get the old data
        $('#limit').text(budget.limit);
        // here we getting the value of limit
    })


    // we need to define an event when we click it should do something
    $('#spendAmount').click(function(){ //click the spend button
        chrome.storage.sync.get(['total','limit'],function(budget){
        //chrome api to store the data to total when we enter
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total); // parseInt for the integer
            }
            // user enter amount
            var amount = $('#amount').val();
            if(amount){
                newTotal += parseInt(amount);
            }
            //now we want to store our new total to total

            chrome.storage.sync.set({'total': newTotal}, function(){
                // we took a call back function check if the new total exisited the limit
                if (amount && newTotal >= budget.limit){   //if the limit is equal or greater the limit
                    var notifOptions = {            // we define notification options
                        type : 'basic',                // type of notification we can change it in chrome developer tools
                        iconUrl: 'icon48.png',          // icon appear for limit
                        title: 'Limit reached!',
                        message: "Uh oh! looks like you've reached your Limit!"

                    };
                    console.log('hello')
                    chrome.notifications.create(notifOptions);
                    //here we use chrome api to create the notification
                }
            });

            $('#total').text(newTotal);
            $('#amount').val(''); // to make our spend text clear

        });
    });
});