var mainGame = function(game) {
}

var game;

var monster;
var skelly;
var mummy;
var bat;
var enemies = []
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
var health = 10;
var scoreString = '';
var scoreText;
var livesString = '';
var livesText;

var characterAlive = true;
var monsterAlive = true;

var worldGravity = 1000;
var facing = 'right';

// var monsterFacing = 'right';
// var skellyFacing = 'right';
// var mummyFacing = 'right';

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

    healthString = "Health : "
    healthText = game.add.text(300, 545, healthString + health);
    healthText.font = 'Revalia';
    healthText.fontSize = 30;
    healthText.fixedToCamera = true;
    healthText.cameraOffset.setTo(300, 545)

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
    healthText.fill = grd;

    layer.resizeWorld();
    layerBack.resizeWorld()

    game.physics.arcade.gravity.y = worldGravity;

    spikes = game.add.sprite(640, 768, "spikes")
    game.physics.arcade.enable(spikes);
    spikes.body.allowGravity = false;
    spikes.body.immovable = true;
    spikes.body.setSize(32, 16, 0, 16)
    spikes.frame = 0;



    wizard = game.add.sprite(50, 50, "wizard")
    game.physics.arcade.enable(wizard);


    wizard.body.collideWorldBounds = true;

    wizard.body.setSize(48, 66, 56, 45);
    wizard.isAlive = true;
    wizard.facing = "right"
    wizard.lightningJump = false;
    wizard.health = 10;
    wizard.injured = false;

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
    wizard.animations.add('dblJumpRight', [81, 79, 80])
    wizard.animations.add('dblJumpLeft', [77, 75, 76])

    wizard.animations.add('jumpRight', [78, 79, 80, 81])
    wizard.animations.add('hitLeft', [86, 87, 89, 87, 86])
    wizard.animations.add('hitRight', [82, 83, 85, 83, 82])




    game.camera.follow(wizard)


    monster = game.add.sprite(300, 320, "monster");
    monster.animations.add('walkLeft', [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]);
    monster.animations.add('walkRight', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
    monster.damage = 5
    monster.isAlive = true;
    monster.facing = "right"

    skelly = game.add.sprite(200, 320, "skelly");
    skelly.scale.x = .8;
    skelly.scale.y = .8;
    skelly.animations.add('walkLeft', [12,13,14,15]);
    skelly.animations.add('walkRight', [24,25,26,27]);
    skelly.damage = 3;
    skelly.isAlive = true
    skelly.facing = "right"
    // monster.animations.play('walkLeft', 16, true)

    mummy = game.add.sprite(150, 320, "mummy");
    mummy.scale.x = .9;
    mummy.scale.y = .9;
    mummy.animations.add('walkLeft', [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]);
    mummy.animations.add('walkRight', [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34]);
    mummy.damage = 2;
    mummy.isAlive = true;
    mummy.facing = "right"

    bat = game.add.sprite(200, 600, "bat");
    bat.animations.add("flyLeft", [12, 13, 14, 15]);
    bat.animations.add('flyRight', [4, 5, 6, 7]);
    // bat.animations.play('flyLeft', 16, true)
    bat.damage = 1;
    bat.isAlive = true;
    bat.facing = "right"

    bat2 = game.add.sprite(300, 600, "bat");
    bat2.animations.add("flyLeft", [12, 13, 14, 15]);
    bat2.animations.add('flyRight', [4, 5, 6, 7]);
    // bat.animations.play('flyLeft', 16, true)
    bat2.damage = 1;
    bat2.isAlive = true;
    bat2.facing = "right"


    enemies = [skelly, monster, mummy, bat, bat2]

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
    game.physics.arcade.enable(bat);
    game.physics.arcade.enable(bat2);

    bat.body.allowGravity = false;
    bat2.body.allowGravity = false;

    game.physics.arcade.enable(greenCoin);
    game.physics.arcade.enable(blueCoin);
    game.physics.arcade.enable(yellowCoin);









    monster.body.collideWorldBounds = true;
    skelly.body.collideWorldBounds = true;
    mummy.body.collideWorldBounds = true;
    bat.body.collideWorldBounds = true;
    bat2.body.collideWorldBounds = true;



    skelly.body.setSize(40,50,15,9)
    monster.body.setSize(37,40,2,0)
    mummy.body.setSize(30,45,7,0)
    bat.body.setSize(32,32, 0, 0)
    bat2.body.setSize(32,32, 0, 0)

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
    if (wizard.health < 0) {
      wizard.health = 0;
    }

    healthText.text = healthString + wizard.health;

    game.physics.arcade.collide(wizard, layer, null, function(){return wizard.isAlive});
    game.physics.arcade.collide(monster, layer, null, function(){return monster.isAlive});
    game.physics.arcade.collide(skelly, layer, null, function(){return skelly.isAlive});
    game.physics.arcade.collide(mummy, layer, null, function(){return mummy.isAlive});

    game.physics.arcade.collide(wizard, monster, monsterCollide, function(){return (wizard.isAlive && monster.isAlive)}, this);
    game.physics.arcade.collide(wizard, skelly, monsterCollide, function(){return (wizard.isAlive && skelly.isAlive)}, this);
    game.physics.arcade.collide(wizard, mummy, monsterCollide, function(){return (wizard.isAlive && mummy.isAlive)}, this);
    game.physics.arcade.collide(wizard, bat, monsterCollide, function(){return (wizard.isAlive && bat.isAlive)}, this);
    game.physics.arcade.collide(wizard, bat2, monsterCollide, function(){return (wizard.isAlive && bat2.isAlive)}, this);
    // game.physics.arcade.collide(wizard, mummy, null, monsterCollide, this);

    game.physics.arcade.collide(wizard, spikes, deathTrapCollide, function(){return (wizard.isAlive)}, this);

    game.physics.arcade.collide(greenCoin, layer);
    game.physics.arcade.collide(blueCoin, layer);
    game.physics.arcade.collide(yellowCoin, layer);

    greenCoin.animations.play("sparkle", coinFrameRate, true);
    blueCoin.animations.play("sparkle", coinFrameRate-1, true);
    yellowCoin.animations.play("sparkle", coinFrameRate+1, true);


    game.physics.arcade.collide(wizard, greenCoin, this.takeCoin);
    game.physics.arcade.collide(wizard, blueCoin, this.takeCoin);
    game.physics.arcade.collide(wizard, yellowCoin, this.takeCoin);




    if (monster.body.onWall()) {
      if (monster.facing === "right") {
        monster.facing = "left";
      } else {
        monster.facing = "right"
      }
    }

    if (monster.facing === 'right') {
      monster.animations.play("walkRight", characterFrameRate, true);
      monster.body.velocity.x = monsterVelocity;
    } else if (monster.facing === 'left') {
      monster.animations.play("walkLeft", characterFrameRate, true);
      monster.body.velocity.x = -monsterVelocity;
    }

    greenCoin.animations.play("sparkle", characterFrameRate, true);

    if (skelly.body.onWall()) {
      if (skelly.facing === "right") {
        skelly.facing = "left";
      } else {
        skelly.facing = "right"
      }
    }

    if (skelly.facing === 'right') {
      skelly.animations.play("walkRight", 8, true);
      skelly.body.velocity.x = monsterVelocity;
    } else if (skelly.facing === 'left') {
      skelly.animations.play("walkLeft", 8, true);

      skelly.body.velocity.x = -monsterVelocity;
    }

    if (mummy.body.onWall()) {
      if (mummy.facing === "right") {
        mummy.facing = "left";
      } else {
        mummy.facing = "right"
      }
    }

    if (mummy.facing === 'right') {
      mummy.animations.play("walkRight", 12, true);//.delay = 45;
      mummy.body.velocity.x = monsterVelocity;
    } else if (skelly.facing === 'left') {
      mummy.animations.play("walkLeft", 12, true);//.delay = 45;
      mummy.body.velocity.x = -monsterVelocity;
    }
    if (bat.facing !== "dead") {
      if (bat.body.x > wizard.body.x) {
        bat.animations.play("flyLeft", 12, true);//.delay = 45;
        bat.body.velocity.x = -monsterVelocity;
      } else if (bat.body.x < wizard.body.x){
        bat.animations.play("flyRight", 12, true);//.delay = 45;
        bat.body.velocity.x = monsterVelocity;
      } else {
        bat.body.velocity.x = 0;
      }

      if (bat.body.y > wizard.body.y + 1) {
        bat.body.velocity.y = -monsterVelocity;
      } else if (bat.body.y < wizard.body.y - 1) {
        bat.body.velocity.y = monsterVelocity;
      } else {
        bat.body.velocity.y = 0;
      }
    } else {
      bat.frame = 1
    }

    var followDistance = 300 //px
    if (bat2.facing !== "dead") {
      var xDis = Math.abs(bat2.body.x - wizard.body.x)
      var yDis = Math.abs(bat2.body.y - wizard.body.y)
      // console.log(xDis, yDis)
      if (xDis < followDistance  && yDis < followDistance) {
        // console.log(xDis, yDis)
        if (bat2.body.x > wizard.body.x) {
          bat2.animations.play("flyLeft", 12, true);//.delay = 45;
          bat2.body.velocity.x = -monsterVelocity;
        } else if (bat.body.x < wizard.body.x){
          bat2.animations.play("flyRight", 12, true);//.delay = 45;
          bat2.body.velocity.x = monsterVelocity;
        } else {
          bat2.body.velocity.x = 0;
        }

        if (bat2.body.y > wizard.body.y + 1) {
          bat2.body.velocity.y = -monsterVelocity;
        } else if (bat2.body.y < wizard.body.y - 1) {
          bat2.body.velocity.y = monsterVelocity;
        } else {
          bat2.body.velocity.y = 0;
        }
      } else {
        bat2.body.velocity.y = 0;
        bat2.body.velocity.x = 0;
      }
    } else {
      bat2.frame = 1
    }



    if (wizard.body.onFloor() && wizard.facing !== "hitRight" && wizard.facing !== "hitLeft" && wizard.facing !== "dead") {
      if (wizard.facing === "electricDownwardRight") {
        wizard.facing = "iceGroundRight"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashRight", characterFrameRate +20 , false);
        wizard.animations.currentAnim.onComplete.add(function () {
          wizard.facing = "right";
        }, this);
      } else if (wizard.facing === "electricDownwardLeft") {
        wizard.facing = "iceGroundLeft"
        wizard.body.velocity.x = 0;
        wizard.animations.play("groundSmashLeft", characterFrameRate + 20, false);
        wizard.animations.currentAnim.onComplete.add(function () {
          wizard.facing = "left";
        }, this);
      } else if (wizard.facing === "dblJumpRight") {
        wizard.body.velocity.x = 0;
        wizard.facing = "right";
      } else if (wizard.facing === "dblJumpLeft") {
        wizard.body.velocity.x = 0;
        wizard.facing = "right";
      }

      if (cursors.right.isDown) {
        wizard.facing = 'right'
        wizard.body.velocity.x = characterVelocity;
        wizard.animations.play("walkRight", characterFrameRate, true)
      } else if (cursors.left.isDown) {
        wizard.facing = 'left'
        wizard.body.velocity.x = -characterVelocity;
        wizard.animations.play("walkLeft", characterFrameRate, true)
      } else {
        if (wizard.facing !== "iceGroundLeft" && wizard.facing !== "iceGroundRight") {
          wizard.animations.stop();
          wizard.body.velocity.x = 0;
          if (wizard.facing === 'right') {
            wizard.frame = 81;
          } else {
            wizard.frame = 77;
          }
        }
      }
    } else if (wizard.facing !== "dead") {
      if (wizard.facing !== "electricRight" && wizard.facing !== "electricLeft" && wizard.facing !== "electricDownwardRight" && wizard.facing !== "electricDownwardLeft") {
        if (wizard.facing === "right") {
          wizard.frame = 80;
        } else if (wizard.facing === "left") {
          wizard.frame = 76;
        }
        if (cursors.right.isDown) {
          if (wizard.facing === 'right' || wizard.facing === "left") {
            wizard.facing = 'right'
          }
          wizard.body.velocity.x = characterVelocity;
        } else if (cursors.left.isDown) {
          if (wizard.facing === 'right' || wizard.facing === "left") {
            wizard.facing = 'left'
          }
          wizard.body.velocity.x = -characterVelocity;
        } else {
          if (wizard.body.onFloor()) {
            wizard.body.velocity.x = 0;
          }
        }
      } else {
        if (cursors.right.isDown) {
          wizard.body.velocity.x = characterVelocity;
        } else if (cursors.left.isDown) {
          wizard.body.velocity.x = -characterVelocity;
        }
      }
    } else {
      wizard.frame = 1;
    }
    var bottomCollisionCheck = ((wizard.facing === "electricDownwardLeft" || wizard.facing === "electricDownwardRight") && wizard.lightningJump && !wizard.body.onFloor())
    if (bottomCollisionCheck) {
      enemies.forEach(function(enemy){
        var hitTest0 = enemy.body.hitTest(wizard.body.x, wizard.body.y+64)
        var hitTest1 = enemy.body.hitTest(wizard.body.x+25, wizard.body.y+64)
        var hitTest2 = enemy.body.hitTest(wizard.body.x+15, wizard.body.y+64)
        var hitTest3 = enemy.body.hitTest(wizard.body.x+35, wizard.body.y+64)

        if (hitTest0 || hitTest1 || hitTest2 || hitTest3){
          console.log("enemy hit")
          enemy.facing = "dead"
          enemy.isAlive = false;
          enemy.body.allowGravity = true;
          console.log(enemy.isAlive)
          enemy.body.velocity.y = -500
          enemy.body.gravity.y = 2000
          enemy.body.velocity.x = 0
          enemy.body.collideWorldBounds = false;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.frame = 1;
        }
      })



      // }

      ///// downward Collision Debug //

      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x+25, wizard.body.y+64, 2, 2)
      // dot.drawRect(wizard.body.x+35, wizard.body.y+64, 2, 2)
      // dot.drawRect(wizard.body.x+15, wizard.body.y+64, 2, 2)
      // dot.drawRect(wizard.body.x, wizard.body.y+64, 2, 2)
      // dot.endFill()

      /////

      // (54, 66, 54, 45)
    }

    var electricCollisionRight = (wizard.facing === "electricRight")
    if (electricCollisionRight) {

      enemies.forEach(function(enemy){
        var hitTest0 = enemy.body.hitTest(wizard.body.x+38, wizard.body.y+80)
        var hitTest1 = enemy.body.hitTest(wizard.body.x+38, wizard.body.y+50)
        var hitTest2 = enemy.body.hitTest(wizard.body.x+38, wizard.body.y+20)
        var hitTest3 = enemy.body.hitTest(wizard.body.x+38, wizard.body.y-10)

        if (hitTest0 || hitTest1 || hitTest2 || hitTest3) {
          console.log("enemy hit")
          enemy.facing = "dead"
          enemy.isAlive = false;
          enemy.body.allowGravity = true
          console.log(enemy.isAlive)
          enemy.body.velocity.y = -500
          enemy.body.gravity.y = 2000
          enemy.body.velocity.x = 0
          enemy.body.collideWorldBounds = false;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.frame = 1;
        }
      });

      ///// electric Collision Debug //

      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x+38, wizard.body.y+80, 2, 2)
      // dot.drawRect(wizard.body.x+38, wizard.body.y+50, 2, 2)
      // dot.drawRect(wizard.body.x+38, wizard.body.y+20, 2, 2)
      // dot.drawRect(wizard.body.x+38, wizard.body.y-10, 2, 2)
      // dot.endFill()

    }

    var electricCollisionLeft = (wizard.facing === "electricLeft")
    if (electricCollisionLeft) {

      enemies.forEach(function(enemy){
        var hitTest0 = enemy.body.hitTest(wizard.body.x-2, wizard.body.y+80)
        var hitTest1 = enemy.body.hitTest(wizard.body.x-2, wizard.body.y+50)
        var hitTest2 = enemy.body.hitTest(wizard.body.x-2, wizard.body.y+20)
        var hitTest3 = enemy.body.hitTest(wizard.body.x-2, wizard.body.y-10)

        if (hitTest0 || hitTest1 || hitTest2 || hitTest3) {
          console.log("enemy hit")
          enemy.facing = "dead"
          enemy.isAlive = false;
          enemy.body.allowGravity = true;
          console.log(enemy.isAlive)
          enemy.body.velocity.y = -500
          enemy.body.gravity.y = 2000
          enemy.body.velocity.x = 0
          enemy.body.collideWorldBounds = false;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.frame = 1;
        }
      });

      ///// electric Collision Debug //

      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x-2, wizard.body.y+80, 2, 2)
      // dot.drawRect(wizard.body.x-2, wizard.body.y+50, 2, 2)
      // dot.drawRect(wizard.body.x-2, wizard.body.y+20, 2, 2)
      // dot.drawRect(wizard.body.x-2, wizard.body.y-10, 2, 2)
      // dot.endFill()

    }




    var iceGroundCollision = (wizard.facing === "iceGroundLeft" || wizard.facing === "iceGroundRight")
    if (iceGroundCollision) {

      enemies.forEach(function(enemy){
        var hitTest0 = enemy.body.hitTest(wizard.body.x-35, wizard.body.y+40)
        var hitTest1 = enemy.body.hitTest(wizard.body.x+44, wizard.body.y+40)
        var hitTest2 = enemy.body.hitTest(wizard.body.x-15, wizard.body.y+40)
        var hitTest3 = enemy.body.hitTest(wizard.body.x+64, wizard.body.y+40)

        if (hitTest0 || hitTest1 || hitTest2 || hitTest3) {
          console.log("enemy hit")
          enemy.facing = "dead"
          enemy.isAlive = false;
          enemy.body.allowGravity = true;
          console.log(enemy.isAlive)
          enemy.body.velocity.y = -500
          enemy.body.gravity.y = 2000
          enemy.body.velocity.x = 0
          enemy.body.collideWorldBounds = false;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.frame = 1;
        }
      });

      ///// iceGround Collision Debug //

      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x+44, wizard.body.y+40, 2, 2)
      // dot.drawRect(wizard.body.x+64, wizard.body.y+40, 2, 2)
      // dot.drawRect(wizard.body.x-15, wizard.body.y+40, 2, 2)
      // dot.drawRect(wizard.body.x-35, wizard.body.y+40, 2, 2)
      // dot.endFill()

    }

  },

  takeCoin: function(player, coin) {
      coin.kill();
      score += coin.val;
      scoreText.text = scoreString + score;
  },

  jump: function() {
    console.log(wizard.body.velocity.y)
    if (wizard.body.onFloor()) {
      if (wizard.facing === 'left') {
        wizard.animations.play("jumpLeft", characterFrameRate, false)

      } else if (wizard.facing === 'right') {
        wizard.animations.play("jumpRight", characterFrameRate, false)
      }
      wizard.body.velocity.y = -characterJumpHeight;
    } else {
      if (wizard.lightningJump) {
        if (wizard.facing === 'left') {
          wizard.facing = "electricLeft"
          wizard.animations.play("elecJumpLeft", characterFrameRate, false)
          wizard.body.velocity.y = -(characterJumpHeight);
          wizard.animations.currentAnim.onComplete.add(function () {
            wizard.facing = "electricDownwardLeft";
          }, this);
        } else if (wizard.facing === 'right') {
          wizard.facing = "electricRight"
          wizard.animations.play("elecJumpRight", characterFrameRate, false)
          wizard.body.velocity.y = -(characterJumpHeight);
          wizard.animations.currentAnim.onComplete.add(function () {
            wizard.facing = "electricDownwardRight";
          }, this);
        }

      } else {
        if (wizard.facing === 'left') {
          wizard.facing = "dblJumpLeft"
          wizard.animations.play("dblJumpLeft", characterFrameRate, false)
          wizard.body.velocity.y = -characterJumpHeight;

        } else if (wizard.facing === 'right') {
          wizard.facing = "dblJumpRight"
          wizard.animations.play("dblJumpRight", characterFrameRate, false)
          wizard.body.velocity.y = -characterJumpHeight;
        }

        wizard.lightningJump = true;
      }
    }
    // if (wizard.body.velocity.y  >= 0) {
    //   wizard.body.velocity.y = 1000;
    // }
  },

  iceGround: function() {
    if (wizard.body.onFloor()) {
      if (wizard.facing === 'left') {
        wizard.facing = "iceGroundLeft"
        wizard.body.velocity.x = 0;
        wizard.animations.play("iceGroundLeft", characterFrameRate, false)
        wizard.animations.currentAnim.onComplete.add(function () {
          wizard.facing = "left";
        }, this);

      } else if (wizard.facing === 'right') {
        wizard.facing = "iceGroundRight"
        wizard.body.velocity.x = 0;
        wizard.animations.play("iceGroundRight", characterFrameRate, false)
        wizard.animations.currentAnim.onComplete.add(function () {
          wizard.facing = "right";
        }, this);

      }
    }

  },

  hit: function() {
    if (wizard.facing === "right") {
      wizard.facing = "hitRight"
      // debug for hits //
      // console.log(wizard.body.x)
      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x+64, wizard.body.y+33, 5, 5)
      // dot.endFill()
      ///

      enemies.forEach(function(enemy) {

        // monster.facing = "dead";
        if (enemy.body.hitTest(wizard.body.x+64, wizard.body.y+33)){
          console.log("enemy hit")
          enemy.facing = "dead"
          enemy.isAlive = false;
          enemy.body.allowGravity = true;
          console.log(enemy.isAlive)
          enemy.body.velocity.y = -500
          enemy.body.gravity.y = 2000
          enemy.body.velocity.x = 0
          enemy.body.collideWorldBounds = false;
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true;
          enemy.frame = 1;
        }
        // monsterAlive = false;
        //
      })
      wizard.animations.play("hitRight", characterFrameRate, false)

      wizard.animations.currentAnim.onComplete.add(function () {
        wizard.facing = "right";
      }, this);
    } else if (wizard.facing === "left") {
      wizard.facing = "hitLeft"

      //// hit debug ///

      // var dot = game.add.graphics(0, 0)
      // dot.beginFill(0xFF0000, 1)
      // dot.drawRect(wizard.body.x-26, wizard.body.y+33, 5, 5)
      // dot.endFill()

      /////

      console.log(mummy.body.hitTest(wizard.body.x-26, wizard.body.y+33))
      wizard.animations.play("hitLeft", characterFrameRate, false)

      wizard.animations.currentAnim.onComplete.add(function () {

        wizard.facing = "left";
      }, this);
    }

  },

  render: function() {
    // game.debug.body(wizard)
    // game.debug.layer(layer);
    // game.debug.body(skelly)
    // game.debug.body(monster)
    // game.debug.body(mummy)
    // game.debug.body(bat)
    game.debug.body(spikes)

    // game.debug.body(yellowCoin)
    // game.debug.body(blueCoin)
    // game.debug.body(greenCoin)

  }
}

function monsterCollide(_wizard, _monster) {
    if (wizard.health <= 0) {
      _wizard.facing = "dead";
      _wizard.frame = 1;

      _wizard.isAlive = false;
      _wizard.body.velocity.y = -500
      _wizard.body.gravity.y = 2000
      _wizard.body.velocity.x = 0
      _wizard.body.collideWorldBounds = false;
      _wizard.checkWorldBounds = true;
      _wizard.outOfBoundsKill = true;
    } else if (!_wizard.injured) {
      _wizard.injured = true;
      _wizard.health -= _monster.damage;
      setTimeout(function(){
        _wizard.injured = false
      }, 300)
    }


}

function deathTrapCollide(_wizard, _spikes) {
  _wizard.facing = "dead";
  _wizard.frame = 1;
  _wizard.health = 0;
  _wizard.isAlive = false;
  _wizard.body.velocity.y = -500
  _wizard.body.gravity.y = 2000
  _wizard.body.velocity.x = 0
  _wizard.body.collideWorldBounds = false;
  _wizard.checkWorldBounds = true;
  _wizard.outOfBoundsKill = true;
}
