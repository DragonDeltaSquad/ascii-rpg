
var sfx = {
	select: 'sounds/select.wav',
	menuUp: 'sounds/menuUp.wav',
	menuDown: 'sounds/menuDown.wav',
	selectChange: 'sounds/selectChange.wav',
	unlock: 'sounds/select.wav',
};
var play = function(sound){
	if(sfx.hasOwnProperty(sound)){
		var sound = new Audio(sfx[sound]);
		sound.play();
		return sound;
	}
	return null;
};

var AudioLoop = function(filename){
	this.audio = new Audio(filename);
	this.isPlaying = false;
	var audioLoop = this;
	this.audio.loop = true;
	/*
	//modified from http://stackoverflow.com/a/3273566/4187005
	this.audio.addEventListener('ended', function() {
		if(audioLoop.isPlaying){
			audioLoop.currentTime = 0;
			audioLoop.audio.play();
		}
	}, false);*/
};

AudioLoop.prototype.pause = function(){
	this.isPlaying = false;
	this.audio.pause();
};

AudioLoop.prototype.play = function(){
	this.isPlaying = true;
	this.audio.play();
};
