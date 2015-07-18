

// http://stackoverflow.com/a/21574562/4187005
function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
    ctx.strokeText(lines[i], x, y);
		y += lineHeight;
  }
}


function generateTerrain(width, height, startingChar){
	var out = "";
	for(var row=0;row<height;row++){
		var line = "";
		for(var col=0;col<width;col++){
			line += String.fromCharCode(startingChar + (row + col)%5);
		}
		line += "\n";
		out += line;
	}
	return out;
}

function generateBox(width, height){
	var out = "";
	for(var row=0;row<height;row++){
		var line = "";
		for(var col=0;col<width;col++){
			if( (row == 0 && col == 0) ||
					(row == height - 1 && col == width -1) ||
					(row == 0 && col == width - 1) ||
					(row == height - 1 && col == 0))
					line += "+";
			else if(row == 0 || row == height-1)
				line += "-";
			else if(col == 0 || col == width - 1)
				line += "|";
			else
				line += " ";
		}
		line += "\n";
		out += line;
	}
	return out;
}

function generateTile(character){
	var out = "";
	for(var row=0;row<5;row++){
		var line = "";
		for(var col=0;col<10;col++){
			line += character;
		}
		line += "\n";
		out += line;
	}
	return out;
}



var SCREEN_WIDTH = 100;
var SCREEN_HEIGHT = 45;

var SCREEN_PX_WIDTH = 1000;
var SCREEN_PX_HEIGHT = 900;

var TILE_HEIGHT = 5;
var TILE_WIDTH = 10;

var FPS = 30;

var DOWN = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;

var Compositor = function(canvasElement){
	this.el = canvasElement;
	this.clearFrame();
};

Compositor.prototype.render = function(){
		var ctx = this.el.getContext("2d");
		
		ctx.fillStyle = "white";
    ctx.fillRect(0,0,SCREEN_PX_WIDTH,SCREEN_PX_HEIGHT);
		
		//ctx.font = "bold 16.6px Courier New";
		ctx.font = "16.6px Courier New";
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		fillTextMultiLine(ctx, this.frame, 0, 13);
};

Compositor.prototype.clearFrame = function(){
	this.frame = "";
	for(var i=0;i<SCREEN_HEIGHT;i++){
		for(var j=0;j<SCREEN_WIDTH;j++){
			this.frame += " ";
		}
		this.frame += "\n";
	}
};

Compositor.prototype.add = function(content, map, x, y){
	var img = content.split("\n");
	var mapImg = map.split("\n");
	var frameImg = this.frame.split("\n");
	this.frame = "";
	for(var row=0;row<SCREEN_HEIGHT;row++){
		var line = "";
		for(var col=0;col<SCREEN_WIDTH;col++){
			var img_row = row - y;
			var img_col = col - x;
			if(img_row >= 0 && img_row < mapImg.length &&
				img_col >= 0 && img_col < mapImg[0].length &&
				mapImg[img_row] != "" && 
				mapImg[img_row][img_col] != " ")
				line += img[img_row][img_col];
			else
				line += frameImg[row][col];
		}
		line += "\n";
		this.frame += line;
	}
};

var Sprite = function(){
	this.image = "<   >";
	this.map = "## ##";
};

Sprite.prototype.getImage = function(){
	return this.image;
};

Sprite.prototype.getMap = function(){
	return this.map;
};

var AnimatedSprite = function(imageString, mapString){
	Sprite.call(this);
	this.fromString(imageString, mapString);
	
	this.state = 0;
	this.frame = 1;
	var cycleInterval = null;
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
		for(var i=0;i<4;i++){
			states[i][3] = states[i][1];
		}
		return states;
	};
	
	this.image = parse(imageString);
	this.map = parse(mapString);
};

AnimatedSprite.prototype.getImage = function(){
	return this.image[this.state][this.frame];
};

AnimatedSprite.prototype.getMap = function(){
	return this.map[this.state][this.frame];
};

AnimatedSprite.prototype.cycle = function(){
	this.frame = (this.frame + 1)%4;
};
AnimatedSprite.prototype.start = function(){
	var sprite = this;
	if(this.cycleInterval === null)
		this.cycleInterval = setInterval(function(){sprite.cycle();}, 170);
};
AnimatedSprite.prototype.stop = function(){
	clearInterval(this.cycleInterval);
	this.cycleInterval = null;
	this.frame = 1; // standing position
};


var Room = function(){
	this.gameObjects = [];
	this.frameNum = 0;
};

Room.prototype.add = function(gameObject){
	this.gameObjects.push(gameObject);
	gameObject.room = this;
};

Room.prototype.isAvailable = function(actor, x, y, fromDirection){
	for(var i=0;i<this.gameObjects.length;i++){
		if( !this.gameObjects[i].mayWalkOn(actor,x, y, fromDirection) ||
				!this.gameObjects[i].mayWalkOff(actor,x, y, fromDirection)){
			return false;
		}
	}
	return true;
}


var GameObject = function(){
	this.x = 0;
	this.y = 0;
	this.width = 10; // in chars
	this.height = 5;

	this.sprite = new Sprite();
	this.sprite.image = generateTerrain(10, 5, 40);
	this.sprite.map = this.sprite.image;
	
	this._moving = false;
	this.room = null;
	
	this.mayEnterDirections = [UP,DOWN,LEFT,RIGHT];
	this.mayExitDirections = [UP,DOWN,LEFT,RIGHT];
	
	this.setSolid(true);
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

GameObject.prototype.covers = function(x, y){
	if( x >= this.x && x < this.x + this.width &&
			y >= this.y && y < this.y + this.height){
		return true;
	}
	return false;
};



var Actor = function(imageString, mapString){
	GameObject.call(this);
	
	this.sprite = new AnimatedSprite(imageString, mapString);
	
	this.direction = DOWN;
	
	this._moving = false;
};

Actor.prototype = new GameObject();

Actor.prototype.setDirection = function(direction){
	this.direction = direction;
	this.sprite.state = direction;
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
					break;
				case DOWN:
					return this.room.isAvailable(this, this.x, this.y + 5, direction);
					break;
				case LEFT:
					return this.room.isAvailable(this, this.x - 10, this.y, direction);
					break;
				case RIGHT:
					return this.room.isAvailable(this, this.x + 10, this.y, direction);
					break;
			}
			return false;
};

Actor.prototype.move = function(direction, _countdown){
	// recursively move 1 tile for smooth transition

	var actor = this;
	if(!actor._moving || _countdown != undefined){
		
		
		//change direction if needed immediately
		if(this.direction !== direction){
			actor.setMoving(true);
			this.setDirection(direction);
			setTimeout(function(){actor.setMoving(false);}, 50);
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
					game.player.y -= 1;
					break;
				case DOWN:
					game.player.y += 1;
					break;
				case LEFT:
					game.player.x -= 2;
					break;
				case RIGHT:
					game.player.x += 2;
					break;
			}
			setTimeout(function(){actor.move(direction, _countdown - 1)}, 50);
		}else{  // base case
			actor.setMoving(false);
		}
	}
};

var Game = function(canvasElement){
	this.player = new Actor(playerString, playerString);
	this.room = new Room();
	this.room.add(this.player);
	
	this.compositor = new Compositor(canvasElement);
	this.frameNum = 0;
};

Game.prototype.draw = function(){
	var viewport_x = this.player.x - SCREEN_WIDTH/2;
	var viewport_y = this.player.y - Math.floor(SCREEN_HEIGHT/2);

	this.compositor.clearFrame();
	for(var i=this.room.gameObjects.length-1;i>=0;i--){
		this.compositor.add(
			this.room.gameObjects[i].sprite.getImage(),
			this.room.gameObjects[i].sprite.getMap(),
			this.room.gameObjects[i].x - viewport_x,
			this.room.gameObjects[i].y - viewport_y
		);
	}
	this.compositor.render();
};

Game.prototype.run = function(){
	this.draw();
	this.frameNum += 1;
	var g = this;
	setTimeout(function(){g.run()}, 1000/FPS);
};

var keyPressers = {};

function inputHandler(key){
	switch(key){
		case 87: //up
			game.player.move(UP);
			break;
		case 83: //down
			game.player.move(DOWN);
			break;
		case 65: //left
			game.player.move(LEFT);
			break;
		case 68: //right
			game.player.move(RIGHT);
			break;
	}
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 87: //up
		case 83: //down
		case 65: //left
		case 68: //right
			if(keyPressers[event.keyCode]){
				return;
			}
			inputHandler(event.keyCode);
			keyPressers[event.keyCode] = setInterval(function(){inputHandler(event.keyCode);}, 100);
			break;
	}
});

$(document).keyup(function(event){
	switch(event.keyCode){
		case 87: //up
		case 83: //down
		case 65: //left
		case 68: //right
			clearInterval(keyPressers[event.keyCode]);
			keyPressers[event.keyCode] = null;
			break;
	}
});


var parseSpriteSheet = function(imageString){
	var states = [];
	var grid = imageString.split("\n");
	
	//iterate over each frame 
	for(var state_i=0;state_i < grid.length-1; state_i += TILE_HEIGHT){
		var row = grid[state_i];
		states.push([]);
		for(var frame_i=0;frame_i < row.length-1; frame_i += TILE_WIDTH){
			states[state_i/TILE_HEIGHT].push([]);
			
			// now parse a single frame
			for(var y = state_i; y < state_i + TILE_HEIGHT; y++){
				var line = "";
				for(var x = frame_i; x < frame_i + TILE_WIDTH; x++){
					line += grid[y][x];
				}
				states[state_i/TILE_HEIGHT][frame_i/TILE_WIDTH] += line + "\n";
			}
		}
	}
	return states;
};