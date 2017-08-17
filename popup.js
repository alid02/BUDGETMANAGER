$(function(){

    chrome.storage.sync.get('total',function(budget){
        $('#total').text(budget.total);
        //here we are storing the spend data when ever we click we get the old data
    })


    // we need a define an event when we click it should do something
    $('#spendAmount').click(function(){ //click the spend button
        chrome.storage.sync.get('total',function(budget){
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

            chrome.storage.sync.set({'total': newTotal});

            $('#total').text(newTotal);
            $('#amount').val(''); // to make our spend text clear

        });
    });
});