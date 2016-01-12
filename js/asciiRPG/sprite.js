
var Sprite = function(){
	this.image = "<   >";
	this.map = "## ##";
};

Sprite.prototype.getImage = function(){
	return this.image;
};

Sprite.prototype.getMap = function(){
	return this.map;
};
