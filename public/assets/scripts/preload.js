var preload = function(game) {
}

preload.prototype = {
  preload: function() {
    this.game.load.atlasJSONHash('wizard', 'assets/sprites/wizardGuy.png', 'assets/sprites/wizardGuy.json');
    this.game.load.atlasJSONHash('monster', 'assets/sprites/msMonster.png', 'assets/sprites/msMonster.json');
  },
  create: function() {
    this.game.state.start("mainGame")
  }
}
