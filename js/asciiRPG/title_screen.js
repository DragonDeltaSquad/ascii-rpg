
var TitleScreen = function(data, game){
	this.game = game;
	this.data = data;
	this.music = new AudioLoop(data.music);
	
	this.objects = [];
	for(var i=0;i<this.data.objects.length;i++){
		this.objects.push({
			'gameObject': new GameObject(gameObjects[this.data.objects[i].gameObject]),
			'location': this.data.objects[i].location,
		});
	}
};

TitleScreen.prototype.draw = function(compositor){
	var box = generateBox(SCREEN_WIDTH, SCREEN_HEIGHT);
	compositor.clearFrame();
	compositor.add(box.split('\n'), box.split('\n'), 0,0);
	for(var i=0; i < this.objects.length;i++){
		compositor.add(
			this.objects[i].gameObject.sprite.getImage(),
			this.objects[i].gameObject.sprite.getMap(),
			this.objects[i].location[0],
			this.objects[i].location[1]
		);
	}
	compositor.add(
		["Revision " + REVISION],
		["Revisionx" + REVISION], 
		SCREEN_WIDTH - REVISION.length - 11 - 1,
		1
	);
};

TitleScreen.prototype.handleInput = function(key){
	this.game.switchMode('world');
	play('select')
};

TitleScreen.prototype.onEnterMode = function(params){
	if(this.music !== undefined)
		this.music.play();
}

TitleScreen.prototype.onExitMode = function(){
	if(this.music !== undefined)
		this.music.pause();
}
