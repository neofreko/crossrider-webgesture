/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/background_scope
*************************************************************************************/


// Place your code here (ideal for handling browser button, global timers, etc.)
appAPI.ready(function() {
    // Add a semi-transparent badge
    //
    // NOTE: Call the setBadgeUpdate method again to update the badge
    appAPI.browserAction.setBadgeText('extn', [255,0,0,125]);
    
    // Add the icon from the Resources folder
    // See the note following this code.
    appAPI.browserAction.setResourceIcon('class-m.png');
    
    
    // Add a tooltip
    //appAPI.browserAction.setTitle('Open mySite in a new tab');
    
    // And most importantly, add the click action
    /*appAPI.browserAction.onClick(function() {
        //e.g. Open a page in a new tab
        appAPI.openURL("http://www.example.com", "tab");
    });*/
    
    appAPI.browserAction.onClick(function() {
		//alert('oi');
        appAPI.message.toActiveTab({
	        action:'enable'
	    });
    });
    
    //appAPI.browserAction.setPopup({resourcePath:'popup.html'});
    //appAPI.browserAction.setPopup({html:'<h1>hahahha</h1>'});
});