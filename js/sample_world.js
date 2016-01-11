
var gameObjects = {
	grass: {
		name:"grass",
		sprite: "grass"
	},
	empty: {
		name:"empty",
		sprite: "empty"
	},
	wall: {
		name:"wall",
		sprite: "wall",
		properties: {
			solid:true,
			description: "It's a wall.",
		},
	},
	potion: {
		name:"potion",
		sprite: "item",
		properties: {
			solid:true,
			description: "It's a POTION.",
			collectible: true,
			use: function(actor){
				actor.world.hud.addMessage(actor.name + " used a Potion");
				return true;
			},
			singleUse: true,
		},
	},
	item: {
		name:"item",
		sprite: "item",
		properties: {
			solid:true,
			collectible: true,
			use: function(actor){
				actor.world.hud.addMessage(actor.name + " used an item");
				return true;
			},
			singleUse: true,
		},
	},
	key: {
		name:"key",
		sprite:  "item",
		properties: {
			solid:true,
			description: "It's a key.",
			collectible: true,
			use: function(actor){
				var room = actor.room;
				var nextOb = actor.nextObject();
				if(nextOb && nextOb.name === 'lock'){
					actor.world.hud.addMessage(actor.name + " opened the lock");
					setTimeout(function(){
						actor.room.removeGameObject(nextOb, nextOb.x, nextOb.y);
						play('unlock');
					}, 1000);
					return true;
				}else{
					actor.world.hud.addMessage("nothing happened...");
					return false;
				}
			},
			singleUse: true,
		},
	},
	lock: {
		name:"lock",
		sprite: "lock",
		properties: {
			solid:true,
			inspect: function(actor){
				var hud = actor.world.hud;
				var keyOb_i = -1;
				var keyObj = null;
				for(var item_i=0;item_i< actor.bag.items.length;item_i++){
					if(actor.bag.items[item_i].name === "key"){
						keyOb_i = item_i;
						keyObj = actor.bag.items[item_i];
					}
				}
				hud.addMessage("It's a lock");
				if(keyOb_i >= 0){	
					hud.prompt("Do you want to unlock it with your key?", function(resp){
						switch(resp){
							case "YES":
								keyObj.use(actor);
								
								// remove single use items
								if(keyObj.singleUse === true)
									actor.bag.items.splice(keyOb_i, 1);
								break;
							case "NO":
								hud.addMessage("Ok, then");
								break;
						}
					});
				}
					return "";
			}
		},
	},
	water: {
		name:"water",
		sprite: "water",
		properties: {
			solid:true,
			description: "It's water.",
		},
	},
	ledgeR: {
		name:"ledgeR",
		sprite: "ledgeR",
		properties: {},
	},
	ledgeL: {
		name:"ledgeL",
		sprite: "ledgeL",
		properties: {},
	},
	ledgeU: {
		name:"ledgeU",
		sprite: "ledgeU",
		properties: {},
	},
	ledgeD: {
		name:"ledgeD",
		sprite: "ledgeD",
		properties: {},
	},
	ledgeRD: {
		name:"ledgeRD",
		sprite: "ledgeRD",
		properties: {},
	},
	ledgeRU: {
		name:"ledgeRU",
		sprite: "ledgeRU",
		properties: {},
	},
	ledgeLU: {
		name:"ledgeLU",
		sprite: "ledgeLU",
		properties: {},
	},
	ledgeLD: {
		name:"ledgeLD",
		sprite: "ledgeLD",
		properties: {},
	},
	spinner: {
		name:"spinner",
		sprite: "spinner",
		properties: {
			solid:true,
			description: "It's Spinner.",
		},
	},
	portal: {
		name:"portalToMaze",
		sprite: "portal",
		properties: {
			onEnter: function(actor){
				actor.world.setRoom("demo");
			}
		}
	},
	portalToMaze: {
		name:"portalToMaze",
		sprite: "portal",
		properties: {
			onEnter: function(actor){
				actor.world.setRoom("maze");
			}
		}
	},
	portalToTMXTest: {
		name:"portalToDemo",
		sprite: "portal",
		properties: {
			onEnter: function(actor){
				actor.world.setRoom("tmx_test");
			}
		}
	},
	start: {
		name:"start",
		sprite: "start",
	},
	star: {
		name:"star",
		sprite: "star",
	},
	title: {
		name:"title",
		sprite: "title",
	},
	player: {
		name:"player",
		sprite: "player",
		properties: {
			'autostart': false
		}
	}
};

// use jquery deepcopy to duplicate sprite and rotate frames
gameObjects.star2 = jQuery.extend(true, {}, gameObjects.star);
sprites[gameObjects.star2.sprite].states[0].frames.unshift(sprites[gameObjects.star2.sprite].states[0].frames.pop());
gameObjects.star2.name = "star2";
gameObjects.star3 = jQuery.extend(true, {}, gameObjects.star2);
sprites[gameObjects.star3.sprite].states[0].frames.unshift(sprites[gameObjects.star3.sprite].states[0].frames.pop());
gameObjects.star3.name = "star3";


var BagMode = function(game){
	this.selectMode = 'category';
	
	this.selectedCategory = -1;
	this.categories = [];
	
	this.selectedItem = -1;
	this.items = [];
	
	this.game = game;	
};

BagMode.prototype.draw = function(compositor){
	var box = generateBox(SCREEN_WIDTH, SCREEN_HEIGHT);
	compositor.clearFrame();
	compositor.addText("BAG", 2, 2);
	
	if(this.selectMode === 'category')
		compositor.addText("[Category:]", 2, 5);
	else
		compositor.addText(" Category: ", 2, 5);
	var i = 8;
	for(var category in this.bag){
		if(category === this.categories[this.selectedCategory]){
			compositor.addText("> " + category, 2, i);
		}else{
			compositor.addText("  " + category, 2, i);
		}
		i += 2;
	}
	
	if(this.selectMode === 'item')
		compositor.addText("[Item:]", 50, 5);
	else
		compositor.addText(" Item: ", 50, 5);
	i = 8;
	for(var item_i=0; item_i< this.items.length; item_i++){
		var item = this.items[item_i];
		if(item_i == this.selectedItem)
			compositor.addText("> " + item.name, 50, i);
		else
			compositor.addText("  " + item.name, 50, i);
		i += 2;
	}
	
	compositor.add(box.split('\n'), box.split('\n'), 0,0);
};

BagMode.prototype.handleInput = function(key){
	var numCategories = this.categories.length;
	var numItems = this.items.length;
	switch(key)
	{
		case KeyEvent.DOM_VK_W:
			if(this.selectMode === 'category'){
				this.selectedCategory = (this.selectedCategory - 1 + numCategories) % numCategories;
				this.items = this.bag[this.categories[this.selectedCategory]];
			}else if(this.selectMode === 'item'){
				if(numItems > 0)
					this.selectedItem = (this.selectedItem + 1 + numItems) % numItems;
			}
			play('selectChange');
			break;
		case KeyEvent.DOM_VK_S:
			if(this.selectMode === 'category'){
				this.selectedCategory = (this.selectedCategory + 1 + numCategories) % numCategories;
				this.items = this.bag[this.categories[this.selectedCategory]];
			}else if(this.selectMode === 'item'){
				if(numItems > 0)
					this.selectedItem = (this.selectedItem + 1 + numItems) % numItems;
			}
			play('selectChange');
			break;
		case KeyEvent.DOM_VK_A:
			if(this.selectMode === 'item'){
					this.selectMode = 'category';
					play('selectChange');
				}
			break;
		case KeyEvent.DOM_VK_D:
			if(this.selectMode === 'category'){
					this.selectMode = 'item';
					play('selectChange');
				}
			break;
		case KeyEvent.DOM_VK_E:
			if(this.selectMode === 'category'){
				this.selectMode = 'item';
			}else if(this.selectMode === 'item'){
				if(this.selectedItem >= 0){
					if(this.items[this.selectedItem].hasOwnProperty('use')){
						var used = this.items[this.selectedItem].use(this.actor);
						
						// remove single use items
						if(used && this.items[this.selectedItem].singleUse === true){
							this.items.splice(this.selectedItem, 1);
						}
					}
					this.game.switchMode('world');
				}
			}
			play('select');
			break;
		case KeyEvent.DOM_VK_Q:
			if(this.selectMode === 'item')
				this.selectMode = 'category';
			else
				this.game.switchMode('world');
			play('select');
			break;
	}
};
 
BagMode.prototype.onEnterMode = function(params){
	this.actor = params.actor;
	this.bag = this.actor.bag;
	
	this.categories = Object.keys(this.bag);
	if(this.categories.length > 0){
		this.selectedCategory = 0;
		this.items = this.bag[this.categories[0]];
		if(this.items.length > 0){
			this.selectedItem = 0;
		}else
			this.selectedItem = -1;
	}else
		this.selectedCategory = -1;
}

BagMode.prototype.onExitMode = function(){
}


var maze_width = 20;
var maze_height = 20;
var maze = Maze.generate(maze_width, maze_height);
var mazeTiles = maze.toArray({true: "wall", false: "grass"});
mazeTiles[0][Math.floor(maze_width/2)] = "wall";  // close maze to keep them in :D
var last_row = [];
for(var i=0;i<maze_width;i++){
	if(i === Math.floor(maze_width/2)){
		last_row.push("portalToTMXTest");
	}else
		last_row.push(undefined);
}
mazeTiles.push(last_row);
for(var endpoint in maze.endpoints){
	var rand = Math.random();
	if(rand < .30)
		mazeTiles[maze.endpoints[endpoint][1]][maze.endpoints[endpoint][0]] = "potion";	
	else if(rand < .6)
		mazeTiles[maze.endpoints[endpoint][1]][maze.endpoints[endpoint][0]] = "spinner";	
	else
		mazeTiles[maze.endpoints[endpoint][1]][maze.endpoints[endpoint][0]] = "empty";
}

var gameData = {
		modes: {
			world: {
				name:"ASCII RPG",
				rooms: [
					{
						name:"demo",
						tiles: [
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","wall","wall","wall","wall","wall","water","water","water","water","water","water"],
							["water","water","water","water","ledgeLU","ledgeU","ledgeU","wall","water","water","water","water","water","wall","water","water"],
							["water","water","water","water","ledgeL","empty","empty","ledgeR","water","water","water","water","water","wall","water","water"],
							["water","water","water","water","ledgeL","empty","potion","ledgeR","water","ledgeLU","ledgeU","ledgeRU","water","wall","water","water"],
							["water","water","water","water","ledgeL","empty","grass","ledgeR","water","ledgeL","spinner","ledgeRD","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","empty","ledgeU","grass","ledgeR","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","grass","ledgeD","empty","key","ledgeRU","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","ledgeR","water","ledgeLD","ledgeD","ledgeRD","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","ledgeR","water","water","water","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","ledgeR","water","water","water","water","water","wall","water","water"],
							["water","water","water","water","wall","wall","wall","lock","wall","wall","wall","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","grass","empty","empty","ledgeR","water","water","wall","water","water"],
							["water","water","water","water","wall","spinner","grass","grass","empty","empty","ledgeR","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","portalToMaze","grass","grass","spinner","ledgeR","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","grass","grass","grass","grass","ledgeR","water","water","wall","water","water"],
							["water","water","water","water","wall","empty","spinner","grass","grass","grass","ledgeRD","water","water","wall","water","water"],
							["water","water","water","water","wall","ledgeD","ledgeD","ledgeD","ledgeD","ledgeRD","water","water","water","wall","water","water"],
							["water","water","water","water","wall","water","water","water","water","water","water","water","water","wall","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"],
							["water","water","water","water","water","water","water","water","water","water","water","water","water","water","water","water"]
						],
						defaultSpawnLoc: [5, 5],
					},
					{
						name:"maze",
						tiles: mazeTiles,
						defaultSpawnLoc: [Math.floor(maze_width/2), 1],
					},
					{
						name:"tmx_room",
						url: "\\test_sheet.tmx",
					},
					{
						name:"tmx_test",
						url: "\\tmx_test.tmx",
					}
				],
				player: "player",
			},
			title: {
				//music: 'sounds/Intro_by_ALF.wav',
				objects:[
					{
						gameObject: "start",
						location: [42,30],
					},
					{
						gameObject: "star",
						location: [2,3],
					},
					{
						gameObject: "star2",
						location: [80,10],
					},
					{
						gameObject: "star3",
						location: [16,25],
					},
					{
						gameObject: "star2",
						location: [65,27],
					},
					{
						gameObject: "star3",
						location: [2,39],
					},
					{
						gameObject: "title",
						location: [18,12],
					},
				]
			},
			'bag': BagMode
		}
	};
