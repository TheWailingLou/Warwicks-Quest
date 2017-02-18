var preload = function(game) {
}

preload.prototype = {
  preload: function() {
    this.game.load.atlasJSONHash('wizard', 'assets/sprites/wizardGuy.png', 'assets/sprites/wizardGuy.json');
    this.game.load.atlasJSONHash('monster', 'assets/sprites/msMonster.png', 'assets/sprites/msMonster.json');
    this.game.load.atlasJSONHash('skelly', 'assets/sprites/skelly.png', 'assets/sprites/skelly.json');
    this.game.load.atlasJSONHash('mummy', 'assets/sprites/msMummy.png', 'assets/sprites/msMummy.json');
    this.game.load.atlasJSONHash('greenCoin', 'assets/sprites/Crystals/green/green.png', 'assets/sprites/Crystals/green/green.json');
    this.game.load.atlasJSONHash('blueCoin', 'assets/sprites/Crystals/blue/blue.png', 'assets/sprites/Crystals/blue/blue.json');
    this.game.load.atlasJSONHash('yellowCoin', 'assets/sprites/Crystals/yellow/yellow.png', 'assets/sprites/Crystals/yellow/yellow.json');

    this.game.load.image('mainTiles', 'assets/world/tilesets/dawnOfGods.png');
    this.game.load.tilemap('testLevel', 'assets/world/CSV/Test.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('testBack', 'assets/world/CSV/LayerTest2_TileLayer1.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('testFor', 'assets/world/CSV/LayerTest2_TileLayer2.csv', null, Phaser.Tilemap.CSV)
    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


  },
  create: function() {
    this.game.state.start("mainGame")
  }
}
