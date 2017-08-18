var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]       //here we specifiy context where its appear

};
chrome.contextMenus.create(contextMenuItem);    //we can use a method to create

function isInt(value) {             // check weather the value is integer or not
    return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));
}

chrome.contextMenus.onClicked.addListener(function(clickData){                  //when we click amount
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText){       //we select the click data and store it
        if (isInt(clickData.selectionText)){                                    // if it is interger then
            chrome.storage.sync.get(['total','limit'], function(budget){        //it store the data in limit and total
                var newTotal = 0;                                               // we take new total 0
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if (newTotal >= budget.limit) {
                        var notifOptions = {            // we define notification options
                        type : 'basic',
                        iconUrl: 'icon48.png',          // icon appear for limit
                        title: 'Limit reached!',
                        message: "Uh oh! looks like you've reached your Limit!"

                    };
                    chrome.notifications.create(notifOptions);
                    }
                });
            });

        }
    }

});