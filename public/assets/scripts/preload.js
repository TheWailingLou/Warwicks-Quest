var preload = function(game) {
}

preload.prototype = {
  preload: function() {
    this.game.load.atlasJSONHash('wizard', 'assets/sprites/wizardGuy.png', 'assets/sprites/wizardGuy.json');
    this.game.load.atlasJSONHash('monster', 'assets/sprites/msMonster.png', 'assets/sprites/msMonster.json');
    this.game.load.image('mainTiles', 'assets/world/tilesets/dawnOfGods.png');
    this.game.load.tilemap('testLevel', 'assets/world/CSV/Test.csv', null, Phaser.Tilemap.CSV);
    this.game.load.spritesheet('button-start', 'assets/images/button-start.png', 401, 143);
    this.game.load.image('button-pause', 'assets/images/button-pause.png');
  },
  create: function() {
    this.game.state.start("mainMenu")
  }
}
