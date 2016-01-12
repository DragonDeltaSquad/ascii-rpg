
var disableInput = false;
// if WASD is down, mash move every 100ms (so we have regular continued movement)
var keyPressers = {};

var firePressedKey = function(event){
	switch(event.keyCode){
        case 87: //up 'w'
		case 38: //up arrow
        case 83: //down 's'
		case 40: //down arrow
        case 65: //left 'a'
		case 37: //left arrow
        case 68: //right 'd'
		case 39: //right arrow
            // if a keypresser is already pressing the key don't re-trigger
			if(keyPressers[event.keyCode]){
				return;
			}
            //send gameHandleInput movement related keycode
			if(!disableInput)game.handleInput(event.keyCode);
            
			if(game.repeatPressMovementKeys)
				keyPressers[event.keyCode] = setInterval(function(){
					if(!disableInput)game.handleInput(event.keyCode);
				}, 100);
			else
				keyPressers[event.keyCode] = true;
			break;
		default:
            if(keyPressers[event.keyCode]){
				return;
			}
            // give game handleInput anyway?
			if(!disableInput)game.handleInput(event.keyCode);
			keyPressers[event.keyCode] = true;
			break;
	}
};

$(document).keydown(firePressedKey);

var refirePressedKeys = function(){
	for(var key in keyPressers){
		var kp = keyPressers[key];
		if(kp !== null)
			firePressedKey(key);
	}
};

var isPressed = function(key){
	if(key in keyPressers && keyPressers[key] !== null)
		return true;
	return false;
}

$(document).keyup(function(event){
	switch(event.keyCode){
		case 87: //up 'w'
        case 38: //up arrow
        case 83: //down 's'
        case 40: //down arrow
        case 65: //left 'a'
        case 37: //left arrow
        case 68: //right 'd'
        case 39: //right arrow
			clearInterval(keyPressers[event.keyCode]);
			keyPressers[event.keyCode] = null;
			break;
		default:
			keyPressers[event.keyCode] = null;
			break;
	}
});
