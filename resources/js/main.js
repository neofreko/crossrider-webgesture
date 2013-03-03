
var LAST_COORD = false;
var tolerance = 10; // box
var init = function() {

var smoother = new Smoother(0.85, [0, 0, 0, 0, 0]);

$(document).mousemove(function(e){console.log('mousemove', e)})
    $(document.body).append($("<div id='webgesture' style='z-index: 1000; position: absolute; top: 0; left: 0'/>").append('<video id="video" style="float:left; margin-right:1em; width: 400px"></video>'))
	$(document).ready(function() {
	
		var video = $("#video").get(0);
		try {
			compatibility.getUserMedia({video: true}, function(stream) {
				try {
					video.src = compatibility.URL.createObjectURL(stream);
				} catch (error) {
					video.src = stream;
				}
				video.play();
				compatibility.requestAnimationFrame(tick);
			}, function (error) {
				alert("WebRTC not available");
			});
		} catch (error) {
			alert(error);
		}
		
		function tick() {
			compatibility.requestAnimationFrame(tick);
			
			if (video.readyState === video.HAVE_ENOUGH_DATA) {
				$(video).objectdetect("all", {scaleMin: 3, scaleFactor: 2.1, classifier: objectdetect.frontalface}, function(coords) {
					if (coords[0]) {
						coords = smoother.smooth(coords[0]);
						//console.log(coords)
						var point = { pointerX: coords[0] + coords[2], pointerY: coords[1] + coords[3] }
						
						if (LAST_COORD) {
							movement = {x: point.pointerX-LAST_COORD.pointerX, y: point.pointerY-LAST_COORD.pointerY}
							if (Math.abs(movement.x) < tolerance && Math.abs(movement.y) < tolerance) {
								//console.log('not moving')
							} else {
								console.log('moving to', point)
								simulate(document.body, "mousemove", point);
							}
							//console.log('movement', movement)
						}
						LAST_COORD = point
						
					} else {
						//$("#glasses").css("display", "none");
					}
				});
			}
		}
		
		/*$("#list img").click(function () {
			$("#glasses").attr("src", $(this).attr("src"));
		});*/
		
	});
};

function simulate(element, eventName)
{
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers)
    {
        if (eventMatchers[name].test(eventName)) { eventType = name; break; }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent)
    {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else
        {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
            options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
            options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else
    {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
}

function waitForJquery() {
	setTimeout(function () {
		if (typeof $ == 'function' && typeof Smoother == 'function' && typeof compatibility == 'object' && typeof objectdetect.frontalface == 'object') {
			console.log('ready')
			init()
		} else {
			console.log('not ready', $) 
			waitForJquery()
		}
	}, 500)	
}

waitForJquery()
