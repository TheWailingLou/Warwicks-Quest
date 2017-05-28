var preload = function(game) {
}

preload.prototype = {
  preload: function() {
    this.game.load.atlasJSONHash('wizard', 'assets/sprites/wizardGuy.png', 'assets/sprites/wizardGuy.json');
    this.game.load.atlasJSONHash('monster', 'assets/sprites/msMonster.png', 'assets/sprites/msMonster.json');
    this.game.load.atlasJSONHash('skelly', 'assets/sprites/skelly.png', 'assets/sprites/skelly.json');
    this.game.load.atlasJSONHash('mummy', 'assets/sprites/msMummy.png', 'assets/sprites/msMummy.json');
    this.game.load.atlasJSONHash('bat', 'assets/sprites/bat.png', 'assets/sprites/bat.json');

    this.game.load.atlasJSONHash('spikes', 'assets/sprites/spikes.png', 'assets/sprites/spikes.json');
    this.game.load.atlasJSONHash('acidBath', 'assets/sprites/AcidBath.png', 'assets/sprites/AcidBath.json');

    this.game.load.atlasJSONHash('camp', 'assets/sprites/firecamp.png', 'assets/sprites/firecamp.json');


    this.game.load.atlasJSONHash('greenCoin', 'assets/sprites/Crystals/green/green.png', 'assets/sprites/Crystals/green/green.json');
    this.game.load.atlasJSONHash('blueCoin', 'assets/sprites/Crystals/blue/blue.png', 'assets/sprites/Crystals/blue/blue.json');
    this.game.load.atlasJSONHash('yellowCoin', 'assets/sprites/Crystals/yellow/yellow.png', 'assets/sprites/Crystals/yellow/yellow.json');

    this.game.load.image('mainTiles', 'assets/world/tilesets/dawnOfGods.png');
    this.game.load.tilemap('testLevel', 'assets/world/CSV/Test.csv', null, Phaser.Tilemap.CSV);

    this.game.load.spritesheet('button-start', 'assets/images/button-start.png', 401, 143);
    this.game.load.image('start-menu-background', 'assets/images/start-menu-background.png');
    this.game.load.image('start-menu-logo', 'assets/images/start-menu-logo.png');
    this.game.load.image('button-pause', 'assets/images/button-pause.png');


    this.game.load.tilemap('testBack', 'assets/world/CSV/LayerTest2_TileLayer1.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('testFor', 'assets/world/CSV/LayerTest2_TileLayer2.csv', null, Phaser.Tilemap.CSV)

    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.game.load.tilemap('testlevelBack', 'assets/world/CSV/level1Attempt_background.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('testlevelFor', 'assets/world/CSV/level1Attempt_forground.csv', null, Phaser.Tilemap.CSV);

    this.game.load.tilemap('duskDangerTestBack', 'assets/world/CSV/duskDanger/DangerAtDusk_Back.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('duskDangerTestFor', 'assets/world/CSV/duskDanger/DangerAtDusk_For.csv', null, Phaser.Tilemap.CSV);



  },
  create: function() {
//
//     this.game.state.start("duskDanger")
//
    this.game.state.start("mainMenu")

  }
}
