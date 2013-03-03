  /************************************************************************************
  This is your Page Code. The appAPI.ready() code block will be executed on every page load.
  For more information please visit our docs site: http://docs.crossrider.com
*************************************************************************************/

appAPI.ready(function($) {

    // Place your code here (you can also define new functions above this scope)
    // The $ object is the extension's jQuery object

    //alert("My new Crossrider extension works! The current page is: " + document.location.href);
    
    var lid = appAPI.message.addListener(function(msg) {
		switch(msg.action) {
			// Received message to change the background color
			case 'change-color': appAPI.dom.addInlineCSS("body {background-color: " + msg.value + ";}"); break;
			// Received message to display an alert
			case 'alert': alert(msg.value); break;
			//enable
			case 'enable':
				//alert('got it')
				appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/examples/js/compatibility.js");
		        appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/examples/js/smoother.js");
		        
		        appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/js/objectdetect.js");
				appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/js/objectdetect.frontalface.js");
				//appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/js/objectdetect.handfist.js");
				
				appAPI.dom.addRemoteJS("http://code.jquery.com/jquery-1.8.0.min.js");
				appAPI.dom.addRemoteJS("https://github.com/mtschirs/js-objectdetect/raw/master/js/jquery.objectdetect.js");
				
				appAPI.resources.addInlineJS('js/main.js');
				console.log('added')
				break;
			// Received message to remove listener
			case 'remove': appAPI.message.removeListener(lid); break;
			// Received message with an unknown action
			default: alert('Received message with an unknown action\r\nType:' + msg.type + '\r\nAction:' + msg.action + '\r\nValue:' + msg.value); break;
		}
	});
});
