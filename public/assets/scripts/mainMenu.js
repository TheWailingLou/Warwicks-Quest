var mainMenu = function(game) {
}

var enterKey;
var game;

mainMenu.prototype = {

  create: function() {

      game = this.game
      game.stage.backgroundColor = '#736357';

      button = game.add.button(game.camera.centerX, game.camera.centerY, 'button-start', this.startGame, this, 1, 0, 2);

      button.anchor.setTo(-0.75, -2.5);
      button.fixedToCamera = true;


      button.input.useHandCursor = true;
      // enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      // enterKey.onDown.add(this.startGame);
      // this.add.button(gameWidth, gameHeight, 'button-start', this.startGame, this, 1, 0, 2);
  },

  startGame: function() {
    this.game.state.start("level1Test", true, false)
  },
};
