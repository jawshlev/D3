var score = 0;
var scoreText;
var coinTimer;
var opacity;
var player;

// Define the Intro scene class
class Intro extends Phaser.Scene {
    constructor() {
        super('Wheat');
    }

    preload() {
        // Load the assets here (e.g., images, audio)
        this.load.image('player', 'Wheat.png');
        this.load.image('background', 'Lvl1.jpg');
        this.load.image('coin', 'coin.png');
        this.load.image('obstacle', 'BreadKnife.png');
        this.load.image('summary', 'Summary.jpg');
    }

    create() {
        opacity = 100;
        // Create the game objects and set up the scene here
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(0.35); // Scale down the background

        
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(0.25);
         // Rotate the player by 15 degrees

        this.createObstacle();
        this.createObstacle();
        this.createObstacle();

        // Configure the player's movement
        this.cursors = this.input.keyboard.createCursorKeys();
        this.playerSpeed = 200;

        // Set up collision detection between the player and the coins
        this.coinsGroup = this.physics.add.group();
        this.physics.add.collider(this.player, this.coinsGroup, this.collectCoin, null, this);

        // Create coins initially
        this.createCoins();

        // Start the timer to spawn coins every 5 seconds
        this.coinTimer = this.time.addEvent({
            delay: 5000, // 5 seconds
            callback: this.createCoins,
            callbackScope: this,
            loop: true
        });

        // Display score
        this.score = 0;
        this.scoreText = this.add.text(550, 20, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    }

    createObstacle() {
        var obstacleX = Phaser.Math.Between(100, 700);
        var obstacleY = Phaser.Math.Between(100, 300);
        var obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'obstacle');
        obstacle.setDisplaySize(70, 70);
        obstacle.setScale(0.07);
        obstacle.setSize(0.07);
        var velocityX = Phaser.Math.Between(-300, 300);
        var velocityY = Phaser.Math.Between(-300, 300);
        obstacle.setVelocity(velocityX, velocityY);
        obstacle.setBounce(1); // Make the obstacle bounce off walls
        obstacle.setCollideWorldBounds(true);
        obstacle.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
        this.physics.add.collider(this.player, obstacle, this.handleCollision, null, this);
    }
    
    createCoins() {
        // Remove existing coins
        this.coinsGroup.clear(true, true);

        // Create new coins
        for (var i = 0; i < 3; i++) {
            var coinX = Phaser.Math.Between(100, 700);
            var coinY = Phaser.Math.Between(100, 500);
            var coin = this.physics.add.sprite(coinX, coinY, 'coin');
            coin.setScale(0.1);
            coin.setCollideWorldBounds(true);
            coin.setAlpha(opacity);
            this.coinsGroup.add(coin);
        }
    }

    update() {
        // Update the game logic here (e.g., player movement)

        // Set player velocity based on input
        var velocityX = 0;
        var velocityY = 0;

        if (this.cursors.up.isDown) {
            velocityY = -this.playerSpeed;
        } else if (this.cursors.down.isDown) {
            velocityY = this.playerSpeed;
        }

        if (this.cursors.left.isDown) {
            velocityX = -this.playerSpeed;
        } else if (this.cursors.right.isDown) {
            velocityX = this.playerSpeed;
        }

        this.player.setVelocity(velocityX, velocityY);

        // Keep the player within the game bounds
        var gameBounds = this.physics.world.bounds;
        var playerBounds = this.player.getBounds();

        var outOfBoundsX = playerBounds.left < gameBounds.left || playerBounds.right > gameBounds.right;
        var outOfBoundsY = playerBounds.top < gameBounds.top || playerBounds.bottom > gameBounds.bottom;

        if (outOfBoundsX) {
            this.player.setVelocityX(0);
            this.player.setX(Phaser.Math.Clamp(this.player.x, gameBounds.left + playerBounds.width / 2, gameBounds.right - playerBounds.width / 2));
        }

        if (outOfBoundsY) {
            this.player.setVelocityY(0);
            this.player.setY(Phaser.Math.Clamp(this.player.y, gameBounds.top + playerBounds.height / 2, gameBounds.bottom - playerBounds.height / 2));
        }
        if (this.score >= 800) {
            this.scene.start('Menu'); // Replace 'NextScene' with the name of the scene you want to start
        }
    }

    collectCoin(player, coin) {
        // Handle coin collection
        coin.disableBody(true, true); // Remove the coin from the scene
        this.score += 100; // Increment the score
        this.scoreText.setText('Score: ' + this.score);
       // Update the score text
    }

    handleCollision(player, obstacle) {
        // Stop the game when the player collides with the obstacle
        
        this.physics.world.pause();
       
        
        this.coinsGroup.getChildren().forEach(sprite => {
        sprite.body.enable = false;
        });

        opacity = 0;
        
        var background = this.add.image(375, 300, 'summary');
          background.setScale(0.355);
          background.setInteractive();
          background.on('pointerdown', () => {
              this.scene.start('select'); // Start the Intro scene
          });
          var finalScore = this.add.text(425, 350, 'Score: 0', { fontSize: '50px', fill: '#ffffff' });
          finalScore.setText(this.score);
        
        // Add code to display a lose screen, restart the game, etc.
    }
}
class LevelTwo extends Phaser.Scene {
    constructor() {
        super('Bagel');
    }

    preload() {
        // Load the assets here (e.g., images, audio)
        this.load.image('player', 'Bagel.png');
        this.load.image('background', 'Lvl2.jpg');
        this.load.image('coin', 'coin.png');
        this.load.image('obstacle', 'BreadKnife.png');
        this.load.image('summary', 'Summary.jpg');
    }

    create() {
        opacity = 100;
        // Create the game objects and set up the scene here
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(0.35); // Scale down the background

        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(0.25);
         // Rotate the player by 15 degrees

        this.createObstacle();
        this.createObstacle();
        this.createObstacle();
        this.createObstacle();

        // Configure the player's movement
        this.cursors = this.input.keyboard.createCursorKeys();
        this.playerSpeed = 200;

        // Set up collision detection between the player and the coins
        this.coinsGroup = this.physics.add.group();
        this.physics.add.collider(this.player, this.coinsGroup, this.collectCoin, null, this);

        // Create coins initially
        this.createCoins();

        // Start the timer to spawn coins every 5 seconds
        this.coinTimer = this.time.addEvent({
            delay: 5000, // 5 seconds
            callback: this.createCoins,
            callbackScope: this,
            loop: true
        });

        // Display score
        this.score = 0;
        this.scoreText = this.add.text(550, 20, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    }

    createObstacle() {
        var obstacleX = Phaser.Math.Between(100, 700);
        var obstacleY = Phaser.Math.Between(100, 300);
        var obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'obstacle');
        obstacle.setDisplaySize(70, 70);
        obstacle.setScale(0.07);
        obstacle.setSize(0.07);
        var velocityX = Phaser.Math.Between(-300, 300);
        var velocityY = Phaser.Math.Between(-300, 300);
        obstacle.setVelocity(velocityX, velocityY);
        obstacle.setBounce(1); // Make the obstacle bounce off walls
        obstacle.setCollideWorldBounds(true);
        obstacle.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
        this.physics.add.collider(this.player, obstacle, this.handleCollision, null, this);
    }
    
    createCoins() {
        // Remove existing coins
        this.coinsGroup.clear(true, true);

        // Create new coins
        for (var i = 0; i < 3; i++) {
            var coinX = Phaser.Math.Between(100, 700);
            var coinY = Phaser.Math.Between(100, 500);
            var coin = this.physics.add.sprite(coinX, coinY, 'coin');
            coin.setScale(0.1);
            coin.setCollideWorldBounds(true);
            coin.setAlpha(opacity);
            this.coinsGroup.add(coin);
        }
    }

    update() {
        // Update the game logic here (e.g., player movement)

        // Set player velocity based on input
        var velocityX = 0;
        var velocityY = 0;

        if (this.cursors.up.isDown) {
            velocityY = -this.playerSpeed;
        } else if (this.cursors.down.isDown) {
            velocityY = this.playerSpeed;
        }

        if (this.cursors.left.isDown) {
            velocityX = -this.playerSpeed;
        } else if (this.cursors.right.isDown) {
            velocityX = this.playerSpeed;
        }

        this.player.setVelocity(velocityX, velocityY);

        // Keep the player within the game bounds
        var gameBounds = this.physics.world.bounds;
        var playerBounds = this.player.getBounds();

        var outOfBoundsX = playerBounds.left < gameBounds.left || playerBounds.right > gameBounds.right;
        var outOfBoundsY = playerBounds.top < gameBounds.top || playerBounds.bottom > gameBounds.bottom;

        if (outOfBoundsX) {
            this.player.setVelocityX(0);
            this.player.setX(Phaser.Math.Clamp(this.player.x, gameBounds.left + playerBounds.width / 2, gameBounds.right - playerBounds.width / 2));
        }

        if (outOfBoundsY) {
            this.player.setVelocityY(0);
            this.player.setY(Phaser.Math.Clamp(this.player.y, gameBounds.top + playerBounds.height / 2, gameBounds.bottom - playerBounds.height / 2));
        }
        if (this.score >= 800) {
            this.scene.start('Menu'); // Replace 'NextScene' with the name of the scene you want to start
        }
    }

    resetGame() {
        // Reset variables and objects
        this.score = 0;
        this.scoreText.setText('Score: 0');
        opacity = 100;

        // Remove existing coins
        this.coinsGroup.clear(true, true);

        // Reset player position and velocity
        this.player.setX(400);
        this.player.setY(500);
        this.player.setVelocity(0, 0);

        // Reset player image
        this.player.setTexture(undefined);

        // Reset background image
        this.background.setTexture('background');

        // Destroy the player reference if desired
        // this.player.destroy();
        // this.player = undefined;

        // Resume the physics world
        this.physics.world.resume();
    }
    
    collectCoin(player, coin) {
        // Handle coin collection
        coin.disableBody(true, true); // Remove the coin from the scene
        this.score += 100; // Increment the score
        this.scoreText.setText('Score: ' + this.score);
       // Update the score text
    }

    handleCollision(player, obstacle) {
        // Stop the game when the player collides with the obstacle
        
        this.physics.world.pause();

       

        this.coinsGroup.getChildren().forEach(sprite => {
        sprite.body.enable = false;
        });

        opacity = 0;
        
        var background = this.add.image(375, 300, 'summary');
          background.setScale(0.355);
          background.setInteractive();
          background.on('pointerdown', () => {
              this.scene.start('select'); // Start the Intro scene
              this.resetGame();
          });
          var finalScore = this.add.text(425, 350, 'Score: 0', { fontSize: '50px', fill: '#ffffff' });
          finalScore.setText(this.score);
        // Add code to display a lose screen, restart the game, etc.
    }
}
class LevelThree extends Phaser.Scene {
    constructor() {
        super('Sub');
    }

    preload() {
        // Load the assets here (e.g., images, audio)
        this.load.image('player', 'sub.png');
        this.load.image('background', 'Lvl3.jpg');
        this.load.image('coin', 'coin.png');
        this.load.image('obstacle', 'BreadKnife.png');
        this.load.image('summary', 'Summary.jpg');
    }

    create() {
        opacity = 100;
        // Create the game objects and set up the scene here
        this.background = this.add.image(400, 300, 'background');
        this.background.setScale(0.35); // Scale down the background
        this.player = this.physics.add.sprite(400, 500, 'player');
        this.player.setScale(0.25);
        this.player.setRotation(Phaser.Math.DegToRad(15)); // Rotate the player by 15 degrees

        this.createObstacle();
        this.createObstacle();
        this.createObstacle();
        this.createObstacle();
        this.createO
        // Configure the player's movement
        this.cursors = this.input.keyboard.createCursorKeys();
        this.playerSpeed = 200;
        

        // Set up collision detection between the player and the coins
        this.coinsGroup = this.physics.add.group();
        this.physics.add.collider(this.player, this.coinsGroup, this.collectCoin, null, this);

        // Create coins initially
        this.createCoins();

        // Start the timer to spawn coins every 5 seconds
        this.coinTimer = this.time.addEvent({
            delay: 5000, // 5 seconds
            callback: this.createCoins,
            callbackScope: this,
            loop: true
        });

        // Display score
        this.score = 0;
        this.scoreText = this.add.text(550, 20, 'Score: 0', { fontSize: '24px', fill: '#ffffff' });
    }

    createObstacle() {
        var obstacleX = Phaser.Math.Between(100, 700);
        var obstacleY = Phaser.Math.Between(100, 300);
        var obstacle = this.physics.add.sprite(obstacleX, obstacleY, 'obstacle');
        obstacle.setDisplaySize(70, 70);
        obstacle.setScale(0.07);
        obstacle.setSize(0.07);
        var velocityX = Phaser.Math.Between(-300, 300);
        var velocityY = Phaser.Math.Between(-300, 300);
        obstacle.setVelocity(velocityX, velocityY);
        obstacle.setBounce(1); // Make the obstacle bounce off walls
        obstacle.setCollideWorldBounds(true);
        obstacle.rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);
        this.physics.add.collider(this.player, obstacle, this.handleCollision, null, this);
    }
    
    createCoins() {
        // Remove existing coins
        this.coinsGroup.clear(true, true);

        // Create new coins
        for (var i = 0; i < 3; i++) {
            var coinX = Phaser.Math.Between(100, 700);
            var coinY = Phaser.Math.Between(100, 500);
            var coin = this.physics.add.sprite(coinX, coinY, 'coin');
            coin.setScale(0.1);
            coin.setCollideWorldBounds(true);
            coin.setAlpha(opacity);
            this.coinsGroup.add(coin);
        }
    }

    update() {
        // Update the game logic here (e.g., player movement)

        // Set player velocity based on input
        var velocityX = 0;
        var velocityY = 0;

        if (this.cursors.up.isDown) {
            velocityY = -this.playerSpeed;
        } else if (this.cursors.down.isDown) {
            velocityY = this.playerSpeed;
        }

        if (this.cursors.left.isDown) {
            velocityX = -this.playerSpeed;
        } else if (this.cursors.right.isDown) {
            velocityX = this.playerSpeed;
        }

        this.player.setVelocity(velocityX, velocityY);

        // Keep the player within the game bounds
        var gameBounds = this.physics.world.bounds;
        var playerBounds = this.player.getBounds();

        var outOfBoundsX = playerBounds.left < gameBounds.left || playerBounds.right > gameBounds.right;
        var outOfBoundsY = playerBounds.top < gameBounds.top || playerBounds.bottom > gameBounds.bottom;

        if (outOfBoundsX) {
            this.player.setVelocityX(0);
            this.player.setX(Phaser.Math.Clamp(this.player.x, gameBounds.left + playerBounds.width / 2, gameBounds.right - playerBounds.width / 2));
        }

        if (outOfBoundsY) {
            this.player.setVelocityY(0);
            this.player.setY(Phaser.Math.Clamp(this.player.y, gameBounds.top + playerBounds.height / 2, gameBounds.bottom - playerBounds.height / 2));
        }
        if (this.score >= 800) {
            this.player.destroy();
            this.scene.start('Menu');
             // Replace 'NextScene' with the name of the scene you want to start
        }
    }

    collectCoin(player, coin) {
        // Handle coin collection
        coin.disableBody(true, true); // Remove the coin from the scene
        this.score += 100; // Increment the score
        this.scoreText.setText('Score: ' + this.score);
       // Update the score text
    }

    handleCollision(player, obstacle) {
        // Stop the game when the player collides with the obstacle
        player.disableBody(true, true); 
        this.physics.world.pause();

        
        this.coinsGroup.getChildren().forEach(sprite => {
        sprite.body.enable = false;
        });       

        opacity = 0;
        
        var background = this.add.image(375, 300, 'summary');
          background.setScale(0.355);
          background.setInteractive();
          background.on('pointerdown', () => {
              this.scene.start('select'); // Start the Intro scene
          });
          var finalScore = this.add.text(425, 350, 'Score: 0', { fontSize: '50px', fill: '#ffffff' });
          finalScore.setText(this.score);
          
        // Add code to display a lose screen, restart the game, etc.
    }
}

class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
    preload(){
        this.load.image('backg', 'Title.jpg');
    }
  
    create() {
        var background = this.add.image(400, 300, 'backg');
        background.setScale(0.35);
        background.setInteractive();
        background.on('pointerup', () => {
            this.scene.start('select'); // Start the Intro scene
        });
        // Add other menu elements here
        this.add.text(525, 525, 'Click here to start', { fontSize: '24px', fill: '#000' });
      
    }
}
class Select extends Phaser.Scene {
    constructor() {
      super('select');
    }
    preload(){
        this.load.image('levels', 'LevelSelect.jpg');
        this.load.image('lvl1', 'Wheat.png');
        this.load.image('lvl2', 'Bagel.png');
        this.load.image('lvl3', 'Sub.png');
    }
  
    create() {
        this.background = this.add.image(400, 300, 'levels');
        this.background.setScale(0.35);
      // Add other menu elements here
      var startButton = this.add.image(135, 450, 'lvl1');
      startButton.setScale(0.34);
      startButton.setInteractive();
      startButton.on('pointerdown', () => {
        this.scene.start('Wheat'); // Start the Intro scene
        this.player = this.physics.add.sprite(400, 500, 'lvl1');
      });
      var startButton = this.add.image(400, 250, 'lvl2');
      startButton.setScale(0.45);
      startButton.setInteractive();
      startButton.on('pointerdown', () => {
        this.scene.start('Bagel'); // Start the Intro scene
        this.player = this.physics.add.sprite(400, 500, 'lvl2');
      });
      var startButton = this.add.image(635, 350, 'lvl3');
      startButton.setScale(0.40);
      startButton.setInteractive();
      startButton.on('pointerdown', () => {
        this.scene.start('Sub'); // Start the Intro scene
        this.player = this.physics.add.sprite(400, 500, 'lvl3');
      });
    }
}

new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [Menu, Select, Intro, LevelTwo, LevelThree]
})

const game = new Phaser.Game(config);
  
  // Inside another scene or game logic, you can add the Intro scene like this:
  // For example, in a 'Menu' scene:
