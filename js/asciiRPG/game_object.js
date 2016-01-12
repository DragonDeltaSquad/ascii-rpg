
var GameObject = function(game_object_data){
	this.x = 0;
	this.y = 0;
	this.width = 10; // in chars
	this.height = 5;
	
	this._moving = false;
	this.room = null;
	
	this.mayEnterDirections = [UP,DOWN,LEFT,RIGHT];
	this.mayExitDirections = [UP,DOWN,LEFT,RIGHT];

	this.description = "";

	if(game_object_data !== undefined){
		this.name = game_object_data.name;

		if(spriteObjects.hasOwnProperty(game_object_data.name)){
			this.sprite = spriteObjects[game_object_data.name];
		}else{
			this.sprite = new AnimatedSprite(sprites[game_object_data.sprite]);
			this.sprite.name = game_object_data.name;
			spriteObjects[game_object_data.name] = this.sprite;
		}

		if(game_object_data.properties !== undefined){
			if(game_object_data.properties.solid === true)
				this.setSolid(true);
			$.extend(this, game_object_data.properties);
		}
	}else{
		this.sprite = new Sprite();
	}
};



GameObject.prototype.setSolid = function(value){
	if(value)
		this.mayEnterDirections = [];
	else
		this.mayEnterDirections = [UP,DOWN,LEFT,RIGHT];
};

GameObject.prototype.mayWalkOn = function(actor, x, y, fromDirection){
	// if we cover that square and players may not enter from that direction
	if(this.covers(x, y) && $.inArray(fromDirection, this.mayEnterDirections) === -1)
			return false;
	return true;
};

GameObject.prototype.mayWalkOff = function(actor, x, y, toDirection){
	// if we cover that square and players may not enter from that direction
	if(this.covers(actor.x, actor.y) && $.inArray(toDirection, this.mayExitDirections) === -1)
			return false;
	return true;
};

GameObject.prototype.onEnter = function(actor){
};

GameObject.prototype.covers = function(x, y){
	if( x >= this.x && x < this.x + this.width &&
			y >= this.y && y < this.y + this.height){
		return true;
	}
	return false;
};

GameObject.prototype.inspect = function(actor){
		return this.description;
}
