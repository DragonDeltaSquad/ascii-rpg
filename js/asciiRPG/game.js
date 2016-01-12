
var Game = function(canvasEl, game_data){
	this.modes = game_data.modes;
	this.compositor = new Compositor(canvasEl);
	for(var mode in this.modes){
		switch(mode){
			case 'world':
				this.modes.world = new World(this.modes.world, this);
				break;
			case 'title':
				this.modes.title = new TitleScreen(this.modes.title, this);
				break;
			default:
				this.modes[mode] = new this.modes[mode](this);
		}	
	}
	this.switchMode('title');
	
	// true if holding down WASD repeats presses
	this.repeatPressMovementKeys = true;
};

Game.prototype.run = function(){
	var g = this;
	if(g.activeMode)
		g.activeMode.draw(this.compositor);
	this.compositor.render();
	
	
	gameFrame++;
	var now = new Date();
	if(now - start > 1000){
		current_fps = gameFrame/(now-start)*1000;
		var err = FPS - current_fps;
		//console.log(current_fps + " fps FPS: " + FPS + " err:" + err);
		actual_fps = Math.min(actual_fps + err, MAX_FPS);
		start = now;
		gameFrame = 0;
	}
	
	setTimeout(function(){g.run();}, 1000/actual_fps);
};

Game.prototype.handleInput = function(key){
	if(this.activeMode)
		this.activeMode.handleInput(key);
};

Game.prototype.switchMode = function(modeName, params){
	if(this.modes.hasOwnProperty(modeName)){
		if(this.activeMode && this.activeMode.onExitMode !== undefined)
			this.activeMode.onExitMode();
			
		this.activeMode = this.modes[modeName];
		
		if(this.activeMode.onEnterMode !== undefined)
			this.activeMode.onEnterMode(params);
		
		// HACK: Some sprites stop playing when you switch modes... 
		// so restart them all
		var i;
		for(i in sprites){
			if(sprites[i].stop !== undefined){
				sprites[i].stop();
				sprites[i].start();
			}
		}
	}
};
