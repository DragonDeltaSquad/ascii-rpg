var itemSprite = {
	states:[
		{frames: [
			"  ,-`'`-,  \n"+
			" /       \\ \n"+
			" |---O---| \n"+
			" \\#######/ \n"+
			"  '=:;:='  \n"
		], frameRate: 1},
	],
};

var sample_data = {
	modes: {
		world: {
			gameObjects : {
				grass: {
					name:"grass",
					sprite:{
						states:[
							{frames: [
								", , , , , \n"+
								" , , , , ,\n"+
								", , , , , \n"+
								" , , , , ,\n"+
								", , , , , \n",
								
								", . , , . \n"+
								" , . , , ,\n"+
								", , , . , \n"+
								" , . , , ,\n"+
								", , , . , \n"
							], frameRate: 1},
						]
					}
				},
				empty: {
					name:"empty",
					sprite:{
						states:[
							{frames: [
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n"
							], frameRate: 1},
						]
					}
				},
				wall: {
					name:"wall",
					sprite:{
						states:[
							{frames: [
								" /``````\\ \n"+
								"|\\______/|\n"+
								"|        |\n"+
								"|        |\n"+
								" \\______/ \n"
							], frameRate: 1},
						],
					},
					properties: {
						solid:true,
						description: "It's a wall.",
					},
				},
				potion: {
					name:"potion",
					sprite: itemSprite,
					properties: {
						solid:true,
						description: "It's a POTION.",
						collectible: true,
						use: function(actor){
							actor.world.hud.addMessage(actor.name + " used a Potion");
						},
						singleUse: true,
					},
				},
				key: {
					name:"key",
					sprite: itemSprite,
					properties: {
						solid:true,
						description: "It's a key.",
						collectible: true,
						use: function(actor){
							var room = actor.room;
							var nextOb = actor.nextObject()
							if(nextOb.name === 'lock'){
								actor.world.hud.addMessage(actor.name + " opened the lock");
								setTimeout(function(){
									actor.room.removeGameObject(nextOb, nextOb.x, nextOb.y);
									play('unlock');
								}, 1000);
							}else{
								actor.world.hud.addMessage("nothing happened...");
							}
						},
						singleUse: true,
					},
				},
				lock: {
					name:"lock",
					sprite:{
						states:[
							{frames: [
								" /``````\\ \n"+
								"|\\------/|\n"+
								"|  (  )  |\n"+
								"|  /__\\  |\n"+
								" \\______/ \n",
							], frameRate: 1.5},
						],
					},
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
					sprite:{
						states:[
							{frames: [
								"      ;   \n"+
								"       `.,\n"+
								"`;,       \n"+
								"  ;,      \n"+
								"   `-..   \n",
								
								"   ;      \n"+
								"    `.,   \n"+
								"       `;,\n"+
								",        ;\n"+
								"`-..      \n",
								
								";         \n"+
								" `.,      \n"+
								"    `;,   \n"+
								"      ;,  \n"+
								".      `-.\n",
							], frameRate: 1.5},
						],
					},
					properties: {
						solid:true,
						description: "It's water.",
					},
				},
				ledgeR: {
					name:"ledgeR",
					sprite:{
						states:[
							{frames: [
								"         ;\n"+
								"        .;\n"+
								"         ;\n"+
								"        .;\n"+
								"        -;\n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeL: {
					name:"ledgeL",
					sprite:{
						states:[
							{frames: [
								";         \n"+
								";.        \n"+
								";         \n"+
								";.        \n"+
								";-        \n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeU: {
					name:"ledgeU",
					sprite:{
						states:[
							{frames: [
								"-,---.--,-\n"+
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeD: {
					name:"ledgeD",
					sprite:{
						states:[
							{frames: [
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n"+
								"_;__;___;_\n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeRD: {
					name:"ledgeRD",
					sprite:{
						states:[
							{frames: [
								"         ;\n"+
								"        .;\n"+
								"         ;\n"+
								"        .;\n"+
								"_;__;___;;\n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeRU: {
					name:"ledgeRU",
					sprite:{
						states:[
							{frames: [
								"-,---.---;\n"+
								"         ;\n"+
								"         ;\n"+
								"        .;\n"+
								"        -;\n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeLU: {
					name:"ledgeLU",
					sprite:{
						states:[
							{frames: [
								";----.---;\n"+
								";.        \n"+
								";         \n"+
								";.        \n"+
								";-        \n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				ledgeLD: {
					name:"ledgeLD",
					sprite:{
						states:[
							{frames: [
								";         \n"+
								";.        \n"+
								";         \n"+
								";.        \n"+
								";;__;___;_\n"
							], frameRate: 1.5},
						],
					},
					properties: {},
				},
				spinner: {
					name:"spinner",
					sprite:{
						states:[
							{frames: [
								"     ,    \n"+
								"     ;    \n"+
								"  ,;` `;, \n"+
								"    _|_   \n"+
								"   |___|  \n",
								
								"       ,  \n"+
								"      ,'  \n"+
								"  ``` ;,  \n"+
								"    _|_ ` \n"+
								"   |___|  \n",
								
								"          \n"+
								"  `-  .-` \n"+
								"    `;`   \n"+
								"    _;_   \n"+
								"   |___|  \n",
								
								"   ,      \n"+
								"   ',     \n"+
								"    ,;``` \n"+
								"   `_|_   \n"+
								"   |___|  \n"
							], frameRate: 10},
						],
					},
					properties: {
						solid:true,
						description: "It's Spinner.",
					},
				},
				start: {
					name:"start",
					sprite:{
						states:[
							{frames: [
								"Press any key.    \n",
								"Press any key..   \n",
								"Press any key...  \n",
								"                  \n",
							], frameRate: 2},
						]
					}
				},
				star: {
					name:"star",
					sprite:{
						states:[
							{frames: [
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n"+
								"          \n",
								"          \n"+
								"          \n"+
								"     *    \n"+
								"          \n"+
								"          \n",
								"          \n"+
								"     |    \n"+
								"   --*--  \n"+
								"     |    \n"+
								"          \n",
								"     |    \n"+
								"    \\|/   \n"+
								" ----*----\n"+
								"    /|\\   \n"+
								"     |    \n",
							], frameRate: 4},
						]
					}
				},
				title: {
					name:"title",
					sprite:{
						states:[
							{frames: [
								"                                    __                         \n" +
								" _.'---'''-.,        _..          _-  \\            ____        \n" +
								"\\      _     |      |   \\  /`-.  /  _-`__  _,     |    |    --_\n" +
								" \\    \\  \\   /  __   |   V`  _/`\\_-`  |  \\/  \\     |    \\  /  /\n" +
								"   \\   \\ /,./,-`  `-,|     <' /` _`-  /      \\ _--_|     |/  / \n" +
								"    \\    \\  /   \\  - \\      `-| (/ _ |        /    \\        /  \n" +
								"     \\   \\  |    ``  |  |\\    `-___-`|  /\\/\\ |  (_- | |    /   \n" +
								"      \\   \\  \\_    _/\|__|   \\_  |   /   /  \\  \\_  _/  |    /   \n" +
								"       \\,.-'   `--`           ``-    ``-    `--``` `--|   /    \n" +
								"                                    +,_              `--_/     \n" +
								"      ____   _____   _   _         /=-.` _   _   ____   _   _  \n" +
								"     /    | /  ___| | | | |       //    | | / / |  __| | | | | \n" +
								"    /  _  | | (_    | |_| |      //     | |/ /  | |__  | | | | \n" +
								"   /  /_| |  \\_ -_  |     |   __/,'     |   |   |  __|  \\ V /  \n" +
								"  /   ___ |  __)  \\ |  _  | ,' ``:      | |\\ \\  | |__    | |   \n" +
								" /   /  | | |     | | | | | |     |     | | \\ \\ |    |   | |   \n" +
								"/___/   |_| |____/  |_| |_| `._,,'      |_|  \\_||____|   |_|   \n"
							], frameRate: 1},
						]
					}
				},
			},
			actors: {
				player: {
					name:"player",
					sprite:{
						states:[
							{
								frames: [
									"   ___    \n  /mmm\\   \n  \\@,@/   \n   Omm'   \n   ` n    \n",
									"   ___    \n  /mmm\\   \n  \\@,@/   \n q mmm p  \n   n n    \n",
									"   ___   \n  /mmm\\  \n  \\-.-/  \n  'mmO   \n   n `   \n",
									"   ___    \n  /mmm\\   \n  \\@,@/   \n q mmm p  \n   n n    \n"
								],
								frameRate: 8
							},
							{
								frames: [
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n  \\   b   \n",
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n   dd     \n",
									"   ___   \n _/mmm\\  \n |-\\\\)/  \n  `mOn   \n  \\   b  \n",
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n   dd     \n"
								],
								frameRate: 8
							},
							{
								frames: [
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n   d   /  \n",
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n    bb    \n",
									"   ___   \n  /mmm\\_ \n  \\(//-| \n   nOm`  \n   d   / \n",
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n    bb    \n"
								],
								frameRate: 8
							},
							{
								frames: [
									"   ___    \n  /-_-\\   \n  \\mmm/   \n  dmOm    \n   ` ,    \n",
									"   ___    \n  /-_-\\   \n  \\mmm/   \n   mOm    \n   , ,    \n",
									"   ___   \n  /-_-\\  \n  \\mmm/  \n   mOmb  \n   , `   \n",
									"   ___    \n  /-_-\\   \n  \\mmm/   \n   mOm    \n   , ,    \n"
								], 
								frameRate: 8
							},
						],
						callbackFunctions: {},
						properties: {},
					}
				}
			},
		}
	}
};



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
					this.selectedItem = (this.selectedItem - 1 + numItems) % numItems;
			}
			play('selectChange');
			break;
		case KeyEvent.DOM_VK_S:
			if(this.selectMode === 'category'){
				this.selectedCategory = (this.selectedCategory + 1 + numCategories) % numCategories;
				this.items = this.bag[this.categories[this.selectedCategory]];
			}else if(this.selectMode === 'item'){
				if(numItems > 0)
					this.selectedItem = (this.selectedItem - 1 + numItems) % numItems;
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
						this.items[this.selectedItem].use(this.actor);
						
						// remove single use items
						if(this.items[this.selectedItem].singleUse === true){
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



var pkmnASCII = function(){
	var gameObjects = sample_data.modes.world.gameObjects;
	var actors = sample_data.modes.world.actors;

	var wall = gameObjects.wall;
	var potion = gameObjects.potion;
	var water = gameObjects.water;
	var ledgeR = gameObjects.ledgeR;
	var ledgeD = gameObjects.ledgeD;
	var ledgeU = gameObjects.ledgeU;
	var ledgeL = gameObjects.ledgeL;
	var ledgeRD = gameObjects.ledgeRD;
	var ledgeRU = gameObjects.ledgeRU;
	var ledgeLD = gameObjects.ledgeLD;
	var ledgeLU = gameObjects.ledgeLU;
	var spinner = gameObjects.spinner;
	var empty = gameObjects.empty;
	var grass = gameObjects.grass;
	var player = actors.player;
	
	
	var key = gameObjects.key;
	var lock = gameObjects.lock;
	
	var title = gameObjects.title;
	var start = gameObjects.start;
	
	// use jquery deepcopy to duplicate sprite and rotate frames
	var star = gameObjects.star;
	var star2 = jQuery.extend(true, {}, star);
	star2.sprite.states[0].frames.unshift(star2.sprite.states[0].frames.pop());
	star2.name = "star2";
	var star3 = jQuery.extend(true, {}, star2);
	star3.sprite.states[0].frames.unshift(star3.sprite.states[0].frames.pop());
	star3.name = "star3";
	
	return {
		modes: {
			world: {
				name:"Pokemon Ash Key",
				rooms: [
					{
						name:"Pallet Town",
						//music: 'sounds/Route_Theme_1_by_ALF.wav',
						tiles: [
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, wall,   wall,    wall, wall, wall, water, water, water, water, water, water],
							[water, water, water, water, ledgeLU,ledgeU,ledgeU, wall, water, water, water,  water, water, wall, water, water],
							[water, water, water, water, ledgeL, empty, empty, ledgeR, water, water,  water, water, water, wall, water, water],
							[water, water, water, water, ledgeL, empty, potion, ledgeR, water, ledgeLU,ledgeU, ledgeRU, water, wall, water, water],
							[water, water, water, water, ledgeL, empty, grass, ledgeR, water, ledgeL, spinner, ledgeRD, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, empty, ledgeU, grass, ledgeR, water, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, grass, ledgeD,  empty,  key, ledgeRU, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, ledgeR, water, ledgeLD,ledgeD, ledgeRD, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, ledgeR, water, water, water, water, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, ledgeR, water, water, water, water, water, wall, water, water],
							[water, water, water, water, wall, wall, wall, lock, wall, wall, wall, water, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, grass, empty, empty, ledgeR, water, water, wall, water, water],
							[water, water, water, water, wall, spinner, grass, grass, empty, empty, ledgeR, water, water, wall, water, water],
							[water, water, water, water, wall, empty, potion, grass, grass, spinner, ledgeR, water, water, wall, water, water],
							[water, water, water, water, wall, empty, grass, grass, grass, grass, ledgeR, water, water, wall, water, water],
							[water, water, water, water, wall, empty, spinner, grass, grass, grass, ledgeRD, water, water, wall, water, water],
							[water, water, water, water, wall, ledgeD, ledgeD, ledgeD, ledgeD, ledgeRD, water, water, water, wall, water, water],
							[water, water, water, water, wall, water, water, water, water, water, water, water, water, wall, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
							[water, water, water, water, water, water, water, water, water, water, water, water, water, water, water, water],
						],
						players: [
							{
								player: player,
								location: [5, 5],
							}
						]
					},
				]
			},
			title: {
				//music: 'sounds/Intro_by_ALF.wav',
				objects:[
					{
						gameObject: start,
						location: [42,30],
					},
					{
						gameObject: star,
						location: [2,3],
					},
					{
						gameObject: star2,
						location: [80,10],
					},
					{
						gameObject: star3,
						location: [16,25],
					},
					{
						gameObject: star2,
						location: [65,27],
					},
					{
						gameObject: star3,
						location: [2,39],
					},
					{
						gameObject: title,
						location: [18,6],
					},
				]
			},
			'bag': BagMode
		}
	};
}();
