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
var grid;

var greenCoin;
var blueCoin;
var yellowCoin;
var coinFrameRate = 10;
var score = 0;
var scoreString = '';
var scoreText;
var livesString = '';
var livesText;

var worldGravity = 1000;
var facing = 'right';

var monsterFacing = 'right';
var skellyFacing = 'right';
var mummyFacing = 'right';

var testMap;
var layer;
var layerBack;
var WebFontConfig;


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
    var bar = game.add.graphics();
    bar.beginFill(0x000000, .7);
    bar.drawRect(0, 530, 1000, 70);
    bar.fixedToCamera = true;
    // scoreText.cameraOffset.setTo(30, 550)

    WebFontConfig = {
        active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },
        google: {
          families: ['Revalia']
        }
    };

    scoreString = 'Gems : ';
    scoreText = game.add.text(30, 545, scoreString + score);
    scoreText.font = 'Revalia';
    scoreText.fontSize = 30;
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(30, 545)

    livesString = 'Lives : ';
    livesText = game.add.text(850, 545, livesString + score);
    livesText.font = 'Revalia';
    livesText.fontSize = 30;
    livesText.fixedToCamera = true;
    livesText.cameraOffset.setTo(850, 545)

    grd = scoreText.context.createLinearGradient(0, 0, 0, scoreText.canvas.height);
    grd.addColorStop(0, 'rgb(255, 255, 255)');
    grd.addColorStop(1, '#50a6ff');
    scoreText.fill = grd;
    livesText.fill = grd;

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
    skelly.scale.x = .8;
    skelly.scale.y = .8;
    skelly.animations.add('walkLeft', [12,13,14,15]);
    skelly.animations.add('walkRight', [24,25,26,27]);
    // monster.animations.play('walkLeft', 16, true)

    mummy = game.add.sprite(150, 320, "mummy");
    mummy.scale.x = .9;
    mummy.scale.y = .9;
    mummy.animations.add('walkLeft', [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]);
    mummy.animations.add('walkRight', [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34]);

    greenCoin = game.add.sprite(350, 320, "greenCoin");
    yellowCoin = game.add.sprite(320, 320, "yellowCoin");
    blueCoin = game.add.sprite(380, 320, "blueCoin");
    greenCoin.val = 5;
    blueCoin.val = 10;
    yellowCoin.val = 15;
    greenCoin.scale.x = .7;
    greenCoin.scale.y = .7;
    yellowCoin.scale.x = .7;
    yellowCoin.scale.y = .7;
    blueCoin.scale.x = .7;
    blueCoin.scale.y = .7;
    //
    greenCoin.animations.add('sparkle', [1,2,3,4,5,6,7,8]);
    blueCoin.animations.add('sparkle', [1,2,3,4,5,6,7,8]);
    yellowCoin.animations.add('sparkle', [1,2,3,4,5,6,7,8]);


    game.physics.arcade.enable(monster);
    game.physics.arcade.enable(skelly);
    game.physics.arcade.enable(mummy);
    game.physics.arcade.enable(greenCoin);
    game.physics.arcade.enable(blueCoin);
    game.physics.arcade.enable(yellowCoin);







    monster.body.collideWorldBounds = true;
    skelly.body.collideWorldBounds = true;
    mummy.body.collideWorldBounds = true;

    skelly.body.setSize(40,50,15,9)
    monster.body.setSize(37,40,2,0)
    mummy.body.setSize(30,45,7,0)
    blueCoin.body.setSize(20,30,7,0)
    yellowCoin.body.setSize(20,30,7,0)
    greenCoin.body.setSize(20,30,7,0)




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
    game.physics.arcade.collide(greenCoin, layer);
    game.physics.arcade.collide(blueCoin, layer);
    game.physics.arcade.collide(yellowCoin, layer);


    game.physics.arcade.collide(wizard, monster);
    game.physics.arcade.collide(wizard, skelly);
    game.physics.arcade.collide(wizard, mummy);

    greenCoin.animations.play("sparkle", coinFrameRate, true);
    blueCoin.animations.play("sparkle", coinFrameRate-1, true);
    yellowCoin.animations.play("sparkle", coinFrameRate+1, true);


    game.physics.arcade.collide(wizard, greenCoin, this.takeCoin);
    game.physics.arcade.collide(wizard, blueCoin, this.takeCoin);
    game.physics.arcade.collide(wizard, yellowCoin, this.takeCoin);




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

    greenCoin.animations.play("sparkle", characterFrameRate, true);

    if (skelly.body.onWall()) {
      if (skellyFacing === "right") {
        skellyFacing = "left";
      } else {
        skellyFacing = "right"
      }
    }

    if (skellyFacing === 'right') {
      skelly.animations.play("walkRight", 10, true);
      skelly.body.velocity.x = monsterVelocity;
    } else if (skellyFacing === 'left') {
      skelly.animations.play("walkLeft", 10, true);
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

  takeCoin: function(player, coin) {
      coin.kill();
      score += coin.val;
      scoreText.text = scoreString + score;
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
    // game.debug.body(skelly)
    // game.debug.body(monster)
    // game.debug.body(mummy)
    // game.debug.body(yellowCoin)
    // game.debug.body(blueCoin)
    // game.debug.body(greenCoin)
  }
}
