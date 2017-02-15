var mainGame = function(game) {
}

var wizard;
var cursors;
var characterVelocity = 200;
var characterJumpHeight = 500;
var characterFrameRate = 16;
var game;
var worldGravity = 1000;
var facing = 'right';

mainGame.prototype = {
  create: function() {
    game = this.game;

    wizard = game.add.sprite(50, 50, "wizard")
    wizard.animations.add('walkRight', [70, 71, 72, 73])
    wizard.animations.add('walkLeft', [66, 67, 68, 69])
    wizard.animations.add('elecJumpRight', [38, 39, 40, 41, 42, 43, 44, 45, 46, 47])
    wizard.animations.add('elecJumpLeft', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37])
    wizard.animations.add('iceGroundRight', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 15, 14])
    wizard.animations.add('iceGroundLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 0])
    wizard.animations.add('groundSmashLeft', [3, 4, 12, 13, 1, 0])
    wizard.animations.add('groundSmashRight', [17, 18, 26, 27, 15, 14])
    wizard.animations.add('jumpRight', [78, 79, 80, 81])
    wizard.animations.add('jumpLeft', [74, 75, 76, 77])

    game.physics.enable(wizard, Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = worldGravity;

    wizard.body.collideWorldBounds = true;
    // wizard.body.setSize(20, 32, 5, 16);


    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    spacebar.onDown.add(this.jump)
    cursors.down.onDown.add(this.iceGround);
  },
  update: function() {
    // console.log(wizard.body.y)
    // wizard.animations.stop();
    if (wizard.body.y === 400) {
      if (facing === "electricRight") {
        facing = "iceGroundRight"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashRight", characterFrameRate, false);
        
      } else if (facing === "electricLeft") {
        facing = "iceGroundLeft"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashLeft", characterFrameRate, false);

      }
      if (cursors.right.isDown) {
        facing = 'right'
        wizard.body.velocity.x = characterVelocity;
        wizard.animations.play("walkRight", characterFrameRate, true)
      } else if (cursors.left.isDown) {
        facing = 'left'
        wizard.body.velocity.x = -characterVelocity;
        wizard.animations.play("walkLeft", characterFrameRate, true)
      } else {
        if (facing !== "iceGroundLeft" && facing !== "iceGroundRight") {
          wizard.animations.stop();
          wizard.body.velocity.x = 0;
          if (facing === 'right') {
            wizard.frame = 81;
          } else {
            wizard.frame = 77;
          }
        }
      }
    } else {
      if (facing !== "electricRight" && facing !== "electricLeft") {
        if (facing === "right") {
          wizard.frame = 80;
        } else if (facing === "left") {
          wizard.frame = 76;
        }
        if (cursors.right.isDown) {
          facing = 'right'
          wizard.body.velocity.x = characterVelocity;
        } else if (cursors.left.isDown) {
          facing = 'left'
          wizard.body.velocity.x = -characterVelocity;
        }
      } else {
        if (cursors.right.isDown) {
          wizard.body.velocity.x = characterVelocity;
        } else if (cursors.left.isDown) {
          wizard.body.velocity.x = -characterVelocity;
        }
      }

    }

  },

  jump: function() {


    if (wizard.body.y === 400) {
      if (facing === 'left') {
        wizard.animations.play("jumpLeft", characterFrameRate, false)

      } else if (facing === 'right') {
        wizard.animations.play("jumpRight", characterFrameRate, false)
      }
      wizard.body.velocity.y = -characterJumpHeight;
    } else {
      if (facing === 'left') {
        facing = "electricLeft"
        wizard.animations.play("elecJumpLeft", characterFrameRate, false)
        wizard.body.velocity.y = -characterJumpHeight;

      } else if (facing === 'right') {
        facing = "electricRight"
        wizard.animations.play("elecJumpRight", characterFrameRate, false)
        wizard.body.velocity.y = -characterJumpHeight;
      }
    }
  },

  iceGround: function() {
    if (wizard.body.y === 400) {
      if (facing === 'left') {
        facing = "iceGroundLeft"
        wizard.body.velocity.x = 0;
        wizard.animations.play("iceGroundLeft", characterFrameRate, false)
        wizard.animations.currentAnim.onComplete.add(function () {
          facing = "left";
        }, this);

      } else if (facing === 'right') {
        facing = "iceGroundRight"
        wizard.body.velocity.x = 0;
        wizard.animations.play("iceGroundRight", characterFrameRate, false)
        wizard.animations.currentAnim.onComplete.add(function () {
          facing = "right";
        }, this);

      }
    }

  }
}
