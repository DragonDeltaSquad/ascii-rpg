
var HUD = function(world, game){

	this.MESSAGE = 1;
	this.PROMPT = 2;

	var hud = this;
	this.world = world;
	this.game = game;
	
	this.displayQueue = [];
	this.message = "";
	
	this.addMessage("Welcome to the ASCII RPG world!! (Press E to Continue)");
    this.addMessage("Everything is drawn with letters, numbers, and symbols.");
    this.addMessage("Use the arrow keys or WASD to move.");
    
	
	this.isUp = false;
	this.menu = new HUDMenu([
			"BAG",
			"EXIT"
		],
		function(selectedItem){
			switch(selectedItem)
			{
				case "EXIT":
					hud.game.switchMode('title');
					hud.menuUp = false;
					break;
				case "BAG":
					hud.game.switchMode('bag', {'actor': hud.game.modes.world.player});
					break;
				default:
					hud.addMessage(selectedItem + " is not available.");
			}
		}
	);
	this.yesno = new HUDMenu([
			"YES",
			"NO"
		],
		null
	);
	
	this.menuUp = false;
};

HUD.prototype.draw = function(compositor){
	var hud = this;
	// draw message/prompt box
	if(this.displayQueue.length > 0 && this.message.trim() === ""){
		var displayRequest = this.displayQueue.pop()
		this.message = displayRequest.message;
		this.yesno.isUp = displayRequest.type === this.PROMPT;
		if(this.yesno.isUp)
			this.yesno.selectHandler = function(value){
				hud.scrollMessage();
				displayRequest.callback(value);
				this.selectHandler = null;
				this.isUp = false;
			}
	}

	//3 chars padding either side with twice char size
	function formatMessage(str){
		var charsPerLine = Math.floor((SCREEN_WIDTH - 3*2)/2.65);
		var lines = str.split('\n');
		var out = [];
		for(var i=0;i<lines.length;i++)
			out = out.concat(lines[i].match(new RegExp('.{1,' + charsPerLine + '}', 'g')))
		return out.slice(0,3).join('\n');
	}
		
	if(this.message.trim() !== ""){
		this.isUp = true;
		var box = generateBox(SCREEN_WIDTH, TILE_HEIGHT*2);
		var boxMap = generateBox(SCREEN_WIDTH, TILE_HEIGHT*2, fillChar="#");

		compositor.addText(formatMessage(this.message), 2, SCREEN_HEIGHT - TILE_HEIGHT*2 + 1);

		compositor.add(box.split('\n'), boxMap.split('\n'), 0, SCREEN_HEIGHT - TILE_HEIGHT*2);
		if(this.yesno.isUp){
			this.yesno.draw(compositor);
		}

	//draw menu
	}else if(this.menuUp){
		this.isUp = true;
		this.menu.draw(compositor);
	}else{
		this.isUp = false;
	}
	
	this.game.repeatPressMovementKeys = !this.isUp;
};

HUD.prototype.scrollMessage = function(){
	var lines = this.message.split('\n')
	lines.shift()
	this.message = lines.join('\n');
};

HUD.prototype.addMessage = function(message){
	this.displayQueue.unshift({
		'type': this.MESSAGE,
		'message': message,
	});
};
HUD.prototype.prompt = function(message, callback){
	this.displayQueue.unshift({
		'type': this.PROMPT,
		'message': message,
		'callback': callback,
	});
};

HUD.prototype.handleInput = function(key){
	switch(key)
	{
		case KeyEvent.DOM_VK_W:
		case KeyEvent.DOM_VK_S:
			if(this.yesno.isUp){
				this.yesno.handleInput(key);
			}else if(this.menuUp){
				this.menu.handleInput(key);
			}
			break;
		case KeyEvent.DOM_VK_E:
			if(this.message.trim() === "" && this.menuUp)
				this.menu.handleInput(key);
			else{
				if(this.yesno.isUp){
					this.yesno.handleInput(key);
				}else{
					this.scrollMessage();
				}
			}
			play('select');
			break;
		case KeyEvent.DOM_VK_Q:
			if(this.yesno.isUp){
				this.yesno.handleInput(key);
			}else if(this.message == "" && this.menuUp){
				this.menuUp = false;
				play('menuDown');
			}else
				this.scrollMessage();
		default:
			break;
	}
};


var HUDMenu = function(options, selectHandler){
	this.menuOptions = options;
	this.selectHandler = selectHandler;
	this.selected = 0;
	this.isUp = false;
};

HUDMenu.prototype.draw = function(compositor){
	var boxHeight = this.menuOptions.length*5 + 2;
	var box = generateBox(TILE_WIDTH*3, boxHeight);
	var boxMap = generateBox(TILE_WIDTH*3, boxHeight, fillChar="#");
	
	var selectBox = generateBox(TILE_WIDTH*3 - 2, 5);
	for(var i=0;i < this.menuOptions.length; i++){
		compositor.addText(
			this.menuOptions[i], 
			SCREEN_WIDTH - TILE_WIDTH*3 + 3 , 
			SCREEN_HEIGHT - this.menuOptions.length*4.81 - 10 + i*4.8 + 2.3
		);
	}

	compositor.add(
		box.split('\n'), 
		boxMap.split('\n'), 
		SCREEN_WIDTH - TILE_WIDTH*3, 
		SCREEN_HEIGHT - this.menuOptions.length*5 - 10
	);
	compositor.add(
		selectBox.split('\n'), 
		selectBox.split('\n'), 
		SCREEN_WIDTH - TILE_WIDTH*3 + 1, 
		SCREEN_HEIGHT - this.menuOptions.length*5 - 10 + this.selected*5 + 1
	);
};

HUDMenu.prototype.handleInput = function(key){

	var max_i = this.menuOptions.length;
	switch(key)
	{
		case KeyEvent.DOM_VK_W:
			this.selected = (this.selected - 1 + max_i) % max_i;
			play('selectChange');
			break;
		case KeyEvent.DOM_VK_S:
			this.selected = (this.selected + 1 + max_i) % max_i;
			play('selectChange');
			break;
		case KeyEvent.DOM_VK_E:
			this.selectHandler(this.menuOptions[this.selected]);
			play('select');
			break;
	}
};
