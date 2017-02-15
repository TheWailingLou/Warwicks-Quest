var mainGame = function(game) {
}

mainGame.prototype = {
  create: function() {
    var wizard = this.game.add.sprite(0, 0, "wizard")
    wizard.animations.add('walkRight', [70, 71, 72, 73])
    wizard.animations.play('walkRight', 16, true)
    var wizard2 = this.game.add.sprite(100, 100, "wizard")
    wizard2.animations.add('elecJump', [39, 40, 41, 42, 43, 44, 45, 46, 47])
    wizard2.animations.play('elecJump', 16, true)
    var wizard3 = this.game.add.sprite(200, 200, "wizard")
    wizard3.animations.add('iceGround', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27])
    wizard3.animations.play('iceGround', 16, true)
    var wizard4 = this.game.add.sprite(300, 300, "wizard")
    wizard4.animations.add('jump', [78, 79, 80, 81])
    wizard4.animations.play('jump', 16, true)
  }
}
