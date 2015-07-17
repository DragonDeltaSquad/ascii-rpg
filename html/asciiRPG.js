

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
    ctx.fillRect(0,0,1000,900);
		
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

Sprite.prototype.update = function(frameNum){
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
};

Room.prototype.update = function(frameNum){
	for(var i=0;i<this.gameObjects.length;i++){
		this.gameObjects[i].update(frameNum);
	}
};

var GameObject = function(){
	this.x = 10*4;
	this.y = 20;
	this.sprite = new Sprite();
	this.sprite.image = generateTerrain(10, 5, 40);
	this.sprite.map = this.sprite.image;
	
	this._moving = false;
};

GameObject.prototype.update = function(frameNum){
	this.sprite.update(frameNum);
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

Actor.prototype.move = function(direction, _countdown){
	var actor = this;
	if(!actor._moving || _countdown != undefined){
	
		if(_countdown === undefined){
			_countdown = 5;
		}
		
		actor.setMoving(true);
		if(this.direction !== direction){
			this.setDirection(direction);
			setTimeout(function(){actor.setMoving(false);}, 50);
			return;
		}
		if(_countdown > 0){
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
		}else{
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

Game.prototype.update = function(frameNum){
	this.room.update(frameNum);
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
	this.update(this.frameNum);
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

