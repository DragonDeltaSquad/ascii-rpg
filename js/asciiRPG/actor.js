
var Actor = function(actor_data){
	GameObject.call(this, actor_data);

	//this.sprite = new AnimatedSprite(sprites[actor_data.sprite], {'autostart': false});
	this.x = 0;
	this.y = 0;
	
	this.direction = DOWN;
	
	this._moving = false;
	this._wereMoving = false;
	
	this.bag = {};
	this.bag.items = [];

	this.world = null;
};

Actor.prototype = new GameObject();

Actor.prototype.setDirection = function(direction){
	this.direction = direction;
	this.sprite.setState(direction);
};
Actor.prototype.setMoving = function(value){
	var actor = this;
	actor._moving = value;
	if(value){
		actor.sprite.start();
	}else{
		setTimeout(function(){
				if(!actor._moving){
					actor.sprite.stop();
				}
			}, 100);
	}
};

Actor.prototype.canMove = function(direction){
			switch(direction){
				case UP:
					return this.room.isAvailable(this, this.x, this.y - 5, direction);
				case DOWN:
					return this.room.isAvailable(this, this.x, this.y + 5, direction);
				case LEFT:
					return this.room.isAvailable(this, this.x - 10, this.y, direction);
				case RIGHT:
					return this.room.isAvailable(this, this.x + 10, this.y, direction);
			}
			return false;
};

Actor.prototype.move = function(direction, _countdown){
	// recursively move 1 tile for smooth transition

	var actor = this;
	if(!actor._moving || _countdown !== undefined){
		
		
		//change direction if needed immediately
		if(this.direction !== direction){
			this.setDirection(direction);
			if(actor._wereMoving){
				actor.move(direction, _countdown);
			}
			return;
		}
	
		if(_countdown === undefined){ //first call to move
			if(!this.canMove(direction))
				return;
			_countdown = 5;
		}
		
		//move if allowed
		actor.setMoving(true);
		if(_countdown > 0){ // general case
			switch(direction){
				case UP:
					this.y -= 1;
					break;
				case DOWN:
					this.y += 1;
					break;
				case LEFT:
					this.x -= 2;
					break;
				case RIGHT:
					this.x += 2;
					break;
			}
			var delay;
			if(isPressed(KeyEvent.DOM_VK_SHIFT))
				delay = 15;
			else
				delay = 30;
			setTimeout(
                function(){actor.move(direction, _countdown - 1);},
                delay
            );
		}else{  // base case
			actor.setMoving(false);
			this.room.objectAt(this.x, this.y).onEnter(this);
			actor._wereMoving = true;
			refirePressedKeys(); // trigger another move after we finish this one
			setTimeout(function(){actor._wereMoving = false;}, 100);
		}
	}
};

Actor.prototype.handleInput = function(key){
	// basic WASD movement
    
	switch(key){
        case 38: //up arrow
		case 87: //up 'w'
			this.move(UP);
			break;
        case 40: //down arrow
		case 83: //down 's'
			this.move(DOWN);
			break;
        case 37: //left arrow
		case 65: //left 'a'
			this.move(LEFT);
			break;
        case 39: //right arrow
		case 68: //right 'd'
			this.move(RIGHT);
			break;
		case KeyEvent.DOM_VK_E:
			this.inspect();
			break;
		case KeyEvent.DOM_VK_Q:
			this.world.hud.menuUp = true;
			play('menuUp');
			break;
	}
};

Actor.prototype.nextObject = function(){
	
	var x;
	var y;
	switch(this.direction){
		case UP:
			x = this.x;
			y = this.y - TILE_HEIGHT;
			break;
		case DOWN:
			x = this.x;
			y = this.y + TILE_HEIGHT;
			break;
		case LEFT:
			x = this.x - TILE_WIDTH;
			y = this.y;
			break;
		case RIGHT:
			x = this.x + TILE_WIDTH;
			y = this.y;
			break;
	}
	return this.room.objectAt(x, y);
};

Actor.prototype.inspect = function(){
	var go = this.nextObject();
	if(go !== null){
		var msg = go.inspect(this);
		if(msg.trim() !== ""){
			this.world.hud.addMessage(msg);
			play('select');
		}
		if(go.collectible){
			this.bag.items.push(go);
			this.room.removeGameObject(go, go.x, go.y);
		}
	}
};

Actor.prototype.enterRoom = function(room){
	this.x = room.defaultSpawnLoc[0]*TILE_WIDTH;
	this.y = room.defaultSpawnLoc[1]*TILE_HEIGHT;
};
