
var AnimatedSprite = function(sprite_data, options){
    Sprite.call(this);
	var frame, state;

	this.image = jQuery.extend(true, [], sprite_data.states);
	this.map = jQuery.extend(true, [], sprite_data.states);
	
	for(state=0;state<this.image.length;state++){
		for(frame=0;frame<this.image[state].frames.length;frame++){
			this.image[state].frames[frame] = this.image[state].frames[frame].split('\n');
		}
	}
	for(state=0;state<this.map.length;state++){
		for(frame=0;frame<this.map[state].frames.length;frame++){
			this.map[state].frames[frame] = this.map[state].frames[frame].split('\n');
		}
	}
	
	this.frameDelay = 170;
	this.cycleInterval = null;
	this.frame = 0;
	this.setState(0);
	
	if(options !== undefined){
		if(options.autostart !== false){
			this.start();
		}
	}else{
		this.start();
	}
};

AnimatedSprite.prototype = new Sprite();

AnimatedSprite.prototype.fromString = function(imageString, mapString){

	var parse = function(spriteSheet){
		var states = [
			["","","",""],
			["","","",""],
			["","","",""],
			["","","",""]
		];
		// 4 directions: down, left, right, up
		var rows = imageString.split("\n");
		for(var row_i=0; row_i < rows.length; row_i++){
			var row = rows[row_i];
			for(var col_i=0; col_i < row.length; col_i++){
				states[Math.floor(row_i/TILE_HEIGHT)][Math.floor(col_i/TILE_WIDTH)] += row[col_i];
			}
			for(var i=0;i<3;i++){
				states[Math.floor(row_i/TILE_HEIGHT)][i] += "\n";
			}
		}
		for(var j=0;j<4;j++){
			states[j][3] = states[j][1];
		}
		return states;
	};
	
	this.image = parse(imageString);
	this.map = parse(mapString);
};

AnimatedSprite.prototype.getImage = function(){
	return this.image[this.state].frames[this.frame];
};

AnimatedSprite.prototype.getMap = function(){
	return this.image[this.state].frames[this.frame];
};

AnimatedSprite.prototype.setState = function(state){
	if(state >= 0 && state < this.image.length){
		this.state = state;
		this.frameDelay = 1000/this.image[this.state].frameRate;
	}
};

AnimatedSprite.prototype.cycle = function(){
	this.frame = (this.frame + 1)%this.image[this.state].frames.length;
};
AnimatedSprite.prototype.start = function(){
	var sprite = this;
	if(this.cycleInterval === null){
		this.cycleInterval = setInterval(function(){sprite.cycle();}, sprite.frameDelay);
	}
};
AnimatedSprite.prototype.stop = function(){
	clearInterval(this.cycleInterval);
	this.cycleInterval = null;
	this.frame = 1%this.image[this.state].frames.length; // standing position
};
