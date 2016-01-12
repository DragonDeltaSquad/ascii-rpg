
var World = function(world_data, game){
	this.game = game;
	if(world_data === undefined){
		world_data = {
			name:"New World",
			rooms: [
				{
					name:"Room1",
					tiles: [
					],
					defaultSpawnLoc: [0,0]
				},
			],
			player: {
				name:"player",
				sprite: {
					states: [{
						frames: [
							"   ___    \n  /mmm\\   \n  \\@,@/   \n q mmm p  \n   n n    \n",
						],
						frameRate: 1.5,
					}]
				},
			}
		};
	}
	
	this.data = world_data;
	this.player = new Actor(gameObjects[world_data.player]);
	this.player.world = this;
	this.setRoomNow(world_data.rooms[0].name);
	if(this.room.hasOwnProperty('music'))
		this.music = new AudioLoop(this.room.music);
	else
		this.music = undefined;
	
	
	this.hud = new HUD(this, game);
};

World.prototype.draw = function(compositor){
	var viewport_x = this.player.x - (SCREEN_WIDTH/2 - TILE_WIDTH);
	var viewport_y = this.player.y - (Math.floor(SCREEN_HEIGHT/2) - TILE_HEIGHT) - 3;

	compositor.clearFrame();
	for(var i=0; i < this.room.gameObjects.length;i++){
		if(this.room.gameObjects[i].x - viewport_x >= 0 - TILE_WIDTH &&
		this.room.gameObjects[i].x - viewport_x < SCREEN_WIDTH &&
		this.room.gameObjects[i].y - viewport_y >=0 - TILE_HEIGHT &&
		this.room.gameObjects[i].y - viewport_y < SCREEN_HEIGHT)
			compositor.add(
				this.room.gameObjects[i].sprite.getImage(),
				this.room.gameObjects[i].sprite.getMap(),
				this.room.gameObjects[i].x - viewport_x,
				this.room.gameObjects[i].y - viewport_y
			);
	}
	this.hud.draw(compositor);
};

// set the current room (Immediately -- see setRoom for transitions)
World.prototype.setRoomNow = function(roomName, callback){
	var world = this;
	for(var i=0;i<world.data.rooms.length;i++){
		if(world.data.rooms[i].name === roomName){
			var room_data = world.data.rooms[i];
			if(room_data.hasOwnProperty('url')){ // lazy load
				var current_room_i = i;
				$.get(room_data.url, function(tmxData){
					world.data.rooms[current_room_i] = tmxToRoomData(tmxData);
					world.data.rooms[current_room_i].name = roomName;
					world.setRoomNow(roomName);
					if(callback)callback();
				});
				return;
			}else{ // we have the data, don't lazy load
				world.room = new Room(room_data);
				world.room.add(world.player);
				world.player.enterRoom(world.room);
				if(callback)callback();
				return;
			}
		}
	}
};

// Transition into a room
World.prototype.setRoom = function(roomName){
	var world = this;
	disableInput = true; // disable all input for transition
	var fadeIn = function(){
		world.game.compositor.fadeIn(500, function(){
			disableInput = false;
		});
	};
	world.game.compositor.fadeOut(500, function(){
		var foundRoom = false;
		for(var i=0;i<world.data.rooms.length;i++){
			if(world.data.rooms[i].name === roomName){
				world.setRoomNow(roomName, fadeIn);
				foundRoom = true;
			}
		}
		if(!foundRoom)
			fadeIn();
	});
};

World.prototype.addRoom = function(roomData){
	var contains_room = false;
	for(var i=0;i<this.data.rooms.length;i++){
		if(this.data.rooms[i].name === roomData.name){
			contains_room = true;
		}
	}
	if(!contains_room)
		var room = new Room(roomData);
		this.data.rooms.push(roomData);
};

World.prototype.handleInput = function(key){
	//basic WASD movement
	if(this.hud.isUp)
		this.hud.handleInput(key);
	else
		this.player.handleInput(key);
};

World.prototype.onEnterMode = function(params){
	if(this.music !== undefined)
		this.music.play();
}

World.prototype.onExitMode = function(){
	if(this.music !== undefined)
		this.music.pause();
}
