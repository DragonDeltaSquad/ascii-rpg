
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

/**
TMX Assumptions
one layer named 'background'
one object group named 'spawn' that contains one object which
	will be the spawn point for the room
**/
var tmxToRoomData = function(tmxData){

	var tiles = [];
	var layer = $(tmxData).find("layer[name='background']").eq(0);
	var height = layer.attr("height");
	var width = layer.attr("width");
	for(var h=0;h<height;h++){
		tiles.push([]);
		for(var w=0;w<width;w++){
			tiles[h].push(
				sprite_arr[
					layer.find("tile").eq(h*width + w).attr("gid") - 1
				].name
			);
		}
	}
	var spawnX = $(tmxData).find(
		"objectgroup[name='spawn'] object:first"
	).attr('x')/100;
	var spawnY = $(tmxData).find(
		"objectgroup[name='spawn'] object:first"
	).attr('y')/100 - 1;
	if(spawnX === undefined)spawnX = 0;
	if(spawnY === undefined)spawnY = 0;
	
	return {
		name: "tmx_room" + Math.random(),
		tiles: tiles,
		defaultSpawnLoc: [spawnX, spawnY],
	};
};
