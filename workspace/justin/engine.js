<html>
<head>
<title> Pokemon Ash Key</title>
<style>
	body {
		background-color: rgb(218, 7, 7);
		font-family:Verdana,Arial;
	}
	#title {
		width: 250px;
		float:left;
	}
	#title h1 {
		text-align:center;
	}
	#main {
		display:block;
		display:relative; 
		margin:auto;
		height: 90%;
	}	
	#getInvolved {
		background-color:beige;
		border-radius:2px;
		padding:5px;
	}
	.clearfix {
		clear:both;
	}
</style>
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="../../js/asciiRPG.js"></script>
<script src="../../js/world_config.js"></script>
<script>
	var game;
	var playerString;
	
	$(function(){
	
		game = asciiRPG.load(document.getElementById("main"), pkmnASCII);
		game.run();
	});
</script>
</head>
<body>
	<canvas id="main" width=1000 height=900></canvas>
</body>
</html>