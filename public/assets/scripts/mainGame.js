var mainGame = function(game) {
}

var game;

var monster;
var skelly;
var mummy;
var monsterVelocity = 100;
var wizard;
var cursors;
var characterVelocity = 200;
var characterJumpHeight = 500;
var characterFrameRate = 16;

var worldGravity = 1000;
var facing = 'right';

var monsterFacing = 'right';
var skellyFacing = 'right';
var mummyFacing = 'right';

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
    wizard.animations.add('jumpRight', [78, 79, 80, 81])
    wizard.animations.add('hitLeft', [86, 87, 89, 87, 86])
    wizard.animations.add('hitRight', [82, 83, 85, 83, 82])




    game.camera.follow(wizard)


    monster = game.add.sprite(300, 320, "monster");
    monster.animations.add('walkLeft', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
    monster.animations.add('walkRight', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);

    skelly = game.add.sprite(200, 320, "skelly");
    skelly.animations.add('walkLeft', [12,13,14,15]);
    skelly.animations.add('walkRight', [24,25,26,27]);
    // monster.animations.play('walkLeft', 16, true)

    mummy = game.add.sprite(150, 320, "mummy");
    mummy.animations.add('walkLeft', [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]);
    mummy.animations.add('walkRight', [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34]);


    game.physics.arcade.enable(monster);
    game.physics.arcade.enable(skelly);
    game.physics.arcade.enable(mummy);





    monster.body.collideWorldBounds = true;
    skelly.body.collideWorldBounds = true;



    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    spacebar.onDown.add(this.jump)
    cursors.down.onDown.add(this.iceGround);
    shift.onDown.add(this.hit);

    console.log(wizard.body.checkCollision);

  },

  update: function() {

    game.physics.arcade.collide(wizard, layer);
    game.physics.arcade.collide(monster, layer);
    game.physics.arcade.collide(skelly, layer);
    game.physics.arcade.collide(mummy, layer);


    game.physics.arcade.collide(wizard, monster);
    game.physics.arcade.collide(wizard, skelly);
    game.physics.arcade.collide(wizard, mummy);

    // game.physics.arcade.collide(monster, skelly);


    if (monster.body.onWall()) {
      if (monsterFacing === "right") {
        monsterFacing = "left";
      } else {
        monsterFacing = "right"
      }
    }

    if (monsterFacing === 'right') {
      monster.animations.play("walkRight", characterFrameRate, true);
      monster.body.velocity.x = monsterVelocity;
    } else if (monsterFacing === 'left') {
      monster.animations.play("walkLeft", characterFrameRate, true);
      monster.body.velocity.x = -monsterVelocity;
    }

    if (skelly.body.onWall()) {
      if (skellyFacing === "right") {
        skellyFacing = "left";
      } else {
        skellyFacing = "right"
      }
    }

    if (skellyFacing === 'right') {
      skelly.animations.play("walkRight", characterFrameRate, true).delay = 190;
      skelly.body.velocity.x = monsterVelocity;
    } else if (skellyFacing === 'left') {
      skelly.animations.play("walkLeft", characterFrameRate, true).delay = 190;
      skelly.body.velocity.x = -monsterVelocity;
    }

    if (mummy.body.onWall()) {
      if (mummyFacing === "right") {
        mummyFacing = "left";
      } else {
        mummyFacing = "right"
      }
    }

    if (mummyFacing === 'right') {
      mummy.animations.play("walkRight", characterFrameRate, true).delay = 45;
      mummy.body.velocity.x = monsterVelocity;
    } else if (skellyFacing === 'left') {
      mummy.animations.play("walkLeft", characterFrameRate, true).delay = 45;
      mummy.body.velocity.x = -monsterVelocity;
    }



    if (wizard.body.onFloor() && facing !== "hitRight" && facing !== "hitLeft") {
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

  hit: function() {
    facing = "hitRight"
    wizard.animations.play("hitRight", characterFrameRate, false)
    console.log("doing something?")
    wizard.animations.currentAnim.onComplete.add(function () {
      console.log("facing left?")
      // facing = "right";
    }, this);
  },
  render: function() {
    // game.debug.body(wizard)
    // game.debug.layer(layer);
    // game.debug.body(monster)
  }
}
