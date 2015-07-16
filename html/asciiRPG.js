

// http://stackoverflow.com/a/21574562/4187005
function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 2;
  var lines = text.split("\n");
  for (var i = 0; i < lines.length; ++i) {
    ctx.fillText(lines[i], x, y);
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
var FPS = 30;

var Compositor = function(canvasElement){
	this.el = canvasElement;
	this.clearFrame();
};

Compositor.prototype.render = function(){
		var ctx = this.el.getContext("2d");
		
		ctx.fillStyle = "white";
    ctx.fillRect(0,0,1000,900);
		
		//ctx.font = "bold 16.6px Courier New";
		ctx.font = "bold 16.6px Courier New";
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
	this.image = " <> ";
	this.map = "####";
};

Sprite.prototype.update = function(frameNum){
};

Sprite.prototype.getImage = function(){
	return this.image;
};

Sprite.prototype.getMap = function(){
	return this.map;
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
	this.y = 22;
	this.sprite = new Sprite();
	this.sprite.image = generateTerrain(10, 5, 40);
	this.sprite.map = this.sprite.image;
};

GameObject.prototype.update = function(frameNum){
	this.sprite.update(frameNum);
};

var Game = function(canvasElement){
	this.player = new GameObject();
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

