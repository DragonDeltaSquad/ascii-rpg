var sample_data = {
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
		}
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
};
var pkmnASCII = function(){
	var wall = sample_data.gameObjects.wall;
	var water = sample_data.gameObjects.water;
	var ledgeR = sample_data.gameObjects.ledgeR;
	var spinner = sample_data.gameObjects.spinner;
	var empty = sample_data.gameObjects.empty;
	var grass = sample_data.gameObjects.grass;
	var player = sample_data.actors.player;
	
	return {
		name:"Pokemon Ash Key",
		rooms: [
			{
				name:"Pallet Town",
				tiles: [
					[wall, wall, wall, wall, wall, wall, wall, empty, empty, empty],
					[wall, empty, grass, grass, empty, empty, wall, empty, empty, empty],
					[wall, empty, grass, grass, empty, empty, wall, empty, empty, empty],
					[wall, empty, grass, grass, grass, spinner, wall, empty, empty, empty],
					[wall, empty, grass, grass, grass, grass, wall, wall, wall, wall],
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
	};
}();
