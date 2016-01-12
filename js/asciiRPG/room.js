
var Room = function(room_data){

	this.gameObjects = [];

	this.tiles = [];
	this.defaultSpawnLoc = room_data.defaultSpawnLoc;
	for(var row_i=0;row_i < room_data.tiles.length; row_i++){
		var row = room_data.tiles[row_i];
		this.tiles.push([]);
		for(var col_i=0;col_i < row.length; col_i++){
			var go_data = row[col_i];
			if(go_data !== undefined){
				var go = new GameObject(gameObjects[go_data]);
				go.y = row_i*TILE_HEIGHT;
				go.x = col_i*TILE_WIDTH;
				this.add(go);
				this.tiles[row_i].push(go);
			}
		}
	}
	if(room_data.hasOwnProperty('music'))
		this.music = room_data.music;
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
};

Room.prototype.objectAt = function(x, y){
	for(var i=0;i<this.gameObjects.length;i++){
		if(this.gameObjects[i].x == x && this.gameObjects[i].y == y){
			return this.gameObjects[i];
		}
	}
	return null;
};

Room.prototype.removeGameObject = function(go, x, y){
	for(var i=0;i<this.gameObjects.length;i++){
		if(this.gameObjects[i].x == x && this.gameObjects[i].y == y){
			this.gameObjects.splice(i, 1);
		}
	}
	return null;
};
