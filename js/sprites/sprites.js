var sprite_arr = [
	{
		name: "item",
		states:[
			{frames: [
				"  ,-`'`-, \n"+
				" / |---| \\\n"+
				" | | * | |\n"+
				" \\ |---| /\n"+
				"  '-.,.-' \n"
			], frameRate: 1},
		],
	},
	{
		name: "grass",
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
	},
	{
		name: "empty",
		states:[
			{frames: [
				"          \n"+
				"          \n"+
				"          \n"+
				"          \n"+
				"          \n"
			], frameRate: 1},
		]
	},
	{
		name: "wall",
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
	{
		name: "lock",
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
	{
		name: "water",
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
	{
		name: "ledgeR",
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
	{
		name: "ledgeL",
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
	{
		name: "ledgeU",
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
	{
		name: "ledgeD",
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
	{
		name: "ledgeRD",
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
	{
		name: "ledgeRU",
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
	{
		name: "ledgeLU",
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
	{
		name: "ledgeLD",
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
	{
		name: "spinner",
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
	{
		name: "portal",
		states:[
			{frames: [
				"   V  V   \n"+
				"          \n"+
				">  >  <  <\n"+
				"          \n"+
				"   ^  ^   \n",
				
				"          \n"+
				"   V  V   \n"+
				" >      < \n"+
				"   ^  ^   \n"+
				"          \n",
				
				"          \n"+
				"          \n"+
				"  >V^V^<  \n"+
				"          \n"+
				"          \n",
			], frameRate: 3},
		],
	},
	{
		name: "start",
		states:[
			{frames: [
				"Press any key.    \n",
				"Press any key..   \n",
				"Press any key...  \n",
				"                  \n",
			], frameRate: 2},
		]
	},
	{
		name: "star",
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
	},
	{
		name: "title",
		states:[
			{frames: [
				"      ____   _____     ___   _   _      ____     ____       ___    \n" +
				"     /    | /  ___|  /  __| | | | |    |  _  \\  |  _  \\   /  __|   \n" +
				"    /  _  | | (_    |  /    | | | |    | | |  | | | |  | |  /      \n" +
				"   /  /_| |  \\_ `,  | |     | | | |    | |/  /  | |_|  | | |  ____ \n" +
				"  /   ___ |  __)  \\ |  \\__  | | | |    |  _ \\   | ____/  | | |_  _|\n" +
				" /   /  | | |     | |     | | | | |    | | \\ \\  | |      |  \\__||  \n" +
				"/___/   |_| |____/   \\____| |_| |_|    |_|  \\_\\ |_|       \\_____|  "
			], frameRate: 1},
		]
	},
	{
		name: "player",
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
	},
];
var sprites = {};
for(var i=0; i<sprite_arr.length; i++){
	sprites[sprite_arr[i].name] = sprite_arr[i];
}