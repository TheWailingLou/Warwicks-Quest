var mainGame = function(game) {
}

var game;

var monster;
var wizard;
var cursors;
var characterVelocity = 200;
var characterJumpHeight = 500;
var characterFrameRate = 16;

var worldGravity = 1000;
var facing = 'right';

var testMap;
var layer;
var layerBack;

mainGame.prototype = {
  create: function() {
    game = this.game;

    game.physics.startSystem(Phaser.Physics.ARCADE)


    backMap = game.add.tilemap('testBack', 32, 32);
    testMap = game.add.tilemap('testFor', 32, 32);

    backMap.addTilesetImage('mainTiles');
    testMap.addTilesetImage('mainTiles');

    testMap.setCollisionByExclusion([164], true, this.layer);


    layerBack = backMap.createLayer(0)
    layer = testMap.createLayer(0)

    layerBack.scrollFactorX = 0.5;
    layerBack.scrollFactorY = 0.5;


    // console.log(testMap.layer)
    // layer.debug = true;




    layer.resizeWorld();
    layerBack.resizeWorld()

    game.physics.arcade.gravity.y = worldGravity;


    wizard = game.add.sprite(50, 50, "wizard")
    game.physics.arcade.enable(wizard);


    wizard.body.collideWorldBounds = true;

    wizard.body.setSize(54, 66, 54, 45);
    wizard.scale.x = .8;
    wizard.scale.y = .8;
    wizard.animations.add('walkRight', [70, 71, 72, 73])
    wizard.animations.add('walkLeft', [66, 67, 68, 69])
    wizard.animations.add('elecJumpRight', [38, 39, 40, 41, 42, 43, 44, 45, 46, 47])
    wizard.animations.add('elecJumpLeft', [28, 29, 30, 31, 32, 33, 34, 35, 36, 37])
    wizard.animations.add('iceGroundRight', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 15, 14])
    wizard.animations.add('iceGroundLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1, 0])
    wizard.animations.add('groundSmashLeft', [3, 4, 12, 13, 1, 1, 1, 0, 0, 0])
    wizard.animations.add('groundSmashRight', [17, 18, 26, 27, 15, 15, 15, 14, 14, 14])
    wizard.animations.add('jumpRight', [78, 79, 80, 81])
    wizard.animations.add('jumpLeft', [74, 75, 76, 77])

    game.camera.follow(wizard)


    monster = game.add.sprite(300, 320, "monster");
    monster.animations.add('walkLeft', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
    monster.animations.play('walkLeft', 16, true)


    game.physics.arcade.enable(monster);




    monster.body.collideWorldBounds = true;


    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    spacebar.onDown.add(this.jump)
    cursors.down.onDown.add(this.iceGround);

    console.log(wizard.body.checkCollision);

  },

  update: function() {
    // console.log(wizard.body.checkCollision.down);
    game.physics.arcade.collide(wizard, layer);
    game.physics.arcade.collide(monster, layer);
    // wizard.body.velocity.set(0)

    // console.log(wizard.body.y)
    // wizard.animations.stop();
    game.physics.arcade.collide(wizard, monster);





    if (wizard.body.onFloor()) {
      if (facing === "electricRight") {
        facing = "iceGroundRight"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashRight", characterFrameRate +20 , false);
        wizard.animations.currentAnim.onComplete.add(function () {
          facing = "right";
        }, this);

      } else if (facing === "electricLeft") {
        facing = "iceGroundLeft"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashLeft", characterFrameRate + 20, false);
        wizard.animations.currentAnim.onComplete.add(function () {
          facing = "left";
        }, this);

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

    if (wizard.body.onFloor()) {
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
    if (wizard.body.onFloor()) {
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

  },
  render: function() {
    // game.debug.body(wizard)
    // game.debug.layer(layer);
    // game.debug.body(monster)
  }
}
