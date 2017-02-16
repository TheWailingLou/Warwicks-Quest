var preload = function(game) {
}

preload.prototype = {
  preload: function() {
    this.game.load.atlasJSONHash('wizard', 'assets/sprites/wizardGuy.png', 'assets/sprites/wizardGuy.json');
    this.game.load.atlasJSONHash('monster', 'assets/sprites/msMonster.png', 'assets/sprites/msMonster.json');
    this.game.load.image('mainTiles', 'assets/world/tilesets/dawnOfGods.png');
    this.game.load.tilemap('testLevel', 'assets/world/CSV/Test.csv', null, Phaser.Tilemap.CSV);
  },
  create: function() {
    this.game.state.start("mainGame")
  }
}
