var boot = function(game) {
}

boot.prototype = {
  preload: function() {
  },
  create: function() {
    this.game.state.start("preload")
  }
}
