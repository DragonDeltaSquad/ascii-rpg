
// http://stackoverflow.com/a/21574562/4187005
function fillTextMultiLine(ctx, text, x, y) {
  var lineHeight = ctx.measureText("M").width * 2;
  for (var i = 0; i < text.length; ++i) {
    ctx.fillText(text[i], x, y);
    ctx.strokeText(text[i], x, y);
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

function generateBox(width, height, fillChar){
	if(fillChar === undefined)
		fillChar = " ";

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
				line += fillChar;
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

function layerText(base, content, map, x, y){
	for(var row=0;row<base.length;row++){
		for(var col=0;col<base[row].length;col++){
			var img_row = row - y;
			var img_col = col - x;
			if(img_row >= 0 && img_row < map.length &&
				img_col >= 0 && img_col < map[0].length &&
				map[img_row] != "" && 
				map[img_row][img_col] != " ")
				base[row][col] = content[img_row][img_col];
		}
	}
};

var Compositor = function(canvasElement){
	this.el = canvasElement;
	this.clearFrame();
	this.textOverlays = [];
	this.post_processor = null;
};

Compositor.prototype.render = function(){
		var ctx = this.el.getContext("2d");
		
		ctx.fillStyle = "white";
    ctx.fillRect(0,0,SCREEN_PX_WIDTH,SCREEN_PX_HEIGHT);
		
		ctx.font = "16.6px Courier New";
		ctx.fillStyle = "black";
		ctx.textAlign = "left";
		
		if(this.post_processor !== null)
			this.post_processor(this.frameArr);
		
		var lines = [];
		for (var i = 0; i < this.frameArr.length; ++i) {
			lines.push(this.frameArr[i].join(""));
		}
		
		fillTextMultiLine(ctx, lines, 0, 13);
		
		ctx.font = "45px Courier New";
		ctx.textAlign = "left";
		for(var t=0;t<this.textOverlays.length;t++){
			var textObj = this.textOverlays[t];
			fillTextMultiLine(ctx, textObj.text.split('\n'), textObj.x*9.86, 13 + textObj.y*20.5 );
		}
		
};

Compositor.prototype.clearFrame = function(){
	this.frame = "";
	this.frameArr = [];
	for(var i=0;i<SCREEN_HEIGHT;i++){
	
		this.frameArr.push([]);
		for(var j=0;j<SCREEN_WIDTH;j++){
			this.frame += " ";
			this.frameArr[i].push(" ");
		}
		this.frame += "\n";
	}
	this.textOverlays = [];
};
/*
Compositor.prototype.add = function(content, map, x, y){
	this.frame = layerText(this.frame, content, map, x, y);
};*/

Compositor.prototype.add = function(content, map, x, y){
	layerText(this.frameArr, content, map, x, y);
};

Compositor.prototype.addText = function(text, x, y){
	this.textOverlays.push({
		'text': text,
		'x': x,
		'y': y,
	});
};

Compositor.prototype.fadeOut = function(duration, callback){
	var compositor = this;
	var when_started = new Date();
	if(duration === undefined)
		duration = 500;
	compositor.post_processor = function(frameArr){
		var runningTime = (new Date()) - when_started;
		var percentVisible = 1 - runningTime/duration;
		if(percentVisible <= 0){
			compositor.post_processor = null;
			if(callback instanceof Function)
				callback();
		}
		for(var row=0;row<frameArr.length;row++){
			for(var col=0;col<frameArr[row].length;col++){
				if(Math.random() > percentVisible)
					frameArr[row][col] = " ";
			}
		}
	};
};

Compositor.prototype.fadeIn = function(duration, callback){
	var compositor = this;
	var when_started = new Date();
	if(duration === undefined)
		duration = 500;
	compositor.post_processor = function(frameArr){
		var runningTime = (new Date()) - when_started;
		var percentVisible = runningTime/duration;
		if(percentVisible >= 1){
			compositor.post_processor = null;
			if(callback instanceof Function)
				callback();
		}
		for(var row=0;row<frameArr.length;row++){
			for(var col=0;col<frameArr[row].length;col++){
				if(Math.random() > percentVisible)
					frameArr[row][col] = " ";
			}
		}
	};
};
