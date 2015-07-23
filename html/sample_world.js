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
								frameRate: 4
							},
							{
								frames: [
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n  \\   b   \n",
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n   dd     \n",
									"   ___   \n _/mmm\\  \n |-\\\\)/  \n  `mOn   \n  \\   b  \n",
									"   ___    \n _/mmm\\   \n |6\\\\)/   \n  `mOn    \n   dd     \n"
								],
								frameRate: 4
							},
							{
								frames: [
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n   d   /  \n",
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n    bb    \n",
									"   ___   \n  /mmm\\_ \n  \\(//-| \n   nOm`  \n   d   / \n",
									"   ___    \n  /mmm\\_  \n  \\(//6|  \n   nOm`   \n    bb    \n"
								],
								frameRate: 4
							},
							{
								frames: [
									"   ___    \n  /-_-\\   \n  \\mmm/   \n  dmOm    \n   ` ,    \n",
									"   ___    \n  /-_-\\   \n  \\mmm/   \n   mOm    \n   , ,    \n",
									"   ___   \n  /-_-\\  \n  \\mmm/  \n   mOmb  \n   , `   \n",
									"   ___    \n  /-_-\\   \n  \\mmm/   \n   mOm    \n   , ,    \n"
								], 
								frameRate: 4
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
var pkmnASCII = function(){
	var gameObjects = sample_data.modes.world.gameObjects;
	var actors = sample_data.modes.world.actors;

	var wall = gameObjects.wall;
	var water = gameObjects.water;
	var ledgeR = gameObjects.ledgeR;
	var spinner = gameObjects.spinner;
	var empty = gameObjects.empty;
	var grass = gameObjects.grass;
	var player = actors.player;
	
	var title = gameObjects.title;
	var start = gameObjects.start;
	
	// use jquery deepcopy to duplicate sprite and rotate frames
	var star = gameObjects.star;
	var star2 = jQuery.extend(true, {}, star);
	star2.sprite.states[0].frames.unshift(star2.sprite.states[0].frames.pop());
	var star3 = jQuery.extend(true, {}, star2);
	star3.sprite.states[0].frames.unshift(star3.sprite.states[0].frames.pop());
	
	return {
		modes: {
			world: {
				name:"Pokemon Ash Key",
				rooms: [
					{
						name:"Pallet Town",
						tiles: [
							[wall, wall, wall, wall, wall, wall, wall, water, water, wall],
							[wall, empty, grass, grass, empty, empty, wall, water, water, wall],
							[wall, empty, grass, grass, empty, empty, wall, water, water, wall],
							[wall, empty, grass, grass, grass, spinner, wall, water, water, wall],
							[wall, empty, grass, grass, grass, grass, wall, water, water, wall],
							[wall, empty, grass, grass, grass, grass, ledgeR, water, water, wall],
							[wall, empty, grass, grass, grass, grass, ledgeR, water, water, wall],
							[wall, empty, grass, grass, empty, empty, ledgeR, water, water, wall],
							[wall, wall, wall, wall, wall, wall, wall, wall, wall, wall],
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
			}
		}
	};
}();
