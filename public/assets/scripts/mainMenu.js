var mainMenu = function(game) {
}

var enterKey;
var game;
var background;
var logo;
var fadeInLogo;
var fadeInShadow;
var text;
var WebFontConfig;
var style;
var shadow;
var tween;

mainMenu.prototype = {

  create: function() {

      game = this.game
      background = game.add.tileSprite(0, 0, 1000, 600, "start-menu-background");

      // Shadow Of Main Logo
      shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'start-menu-logo');
      shadow.anchor.set(0.49, 0.47);
      shadow.tint = 0x000000;
      shadow.alpha = 0;

      //
      logo = game.add.sprite(game.world.centerX, game.world.centerY, 'start-menu-logo');
      logo.anchor.setTo(0.5, 0.5);
      logo.alpha = 0;

      //  This will fade the logo to alpha 1 over the duration of 2 seconds
      fadeInLogo = game.add.tween(logo).to( { alpha: 1 }, 2000, "Linear", true);
      fadeInShadow = game.add.tween(shadow).to( { alpha: 0.5 }, 2000, "Linear", true);

      // Google Fonts not working...
      WebFontConfig = {
          active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
          google: {
            families: ['MedievalSharp']
          }
      };

      text = game.add.text(500, 450, "Press Enter To Begin", { font: '48px MedievalSharp', align: 'center', fill: '#fff', stroke: '#000000', strokeThickness: 2 });

      text.anchor.setTo(0.5);

      //  Shadow and Gradient of Text
      grd = text.context.createLinearGradient(0, 0, 0, text.canvas.height);
      grd.addColorStop(0, '#fff');
      grd.addColorStop(1, '#bbb');
      text.fill = grd;
      text.setShadow(10, 10, 'rgba(0,0,0,0.5)', 5);

      // Fades In Text
      text.alpha = 0;
      tween = game.add.tween(text).to( { alpha: 1 }, 2000, "Linear", true, 0, -1);

      //  And this tells it to yoyo, i.e. fade back to zero again before repeating.
      //  The 1000 tells it to wait for 1 seconds before starting the fade back.
      tween.yoyo(true, 1000);

      //
      enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      enterKey.onDown.add(this.startGame);

  },

  startGame: function() {
    this.game.state.start("level1Test", true, false)
  },
};
