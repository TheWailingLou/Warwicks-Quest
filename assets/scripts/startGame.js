var game = new Phaser
var gameWidth = 1000;
var gameHeight = 600;

function run(){
	var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, "#GameName");
  game.state.add("boot", boot)
	game.state.add("preload", preload);
	game.state.add("mainMenu",mainMenu);
  game.state.add("mainGame", mainGame);
	game.state.start("boot");
};

run()
