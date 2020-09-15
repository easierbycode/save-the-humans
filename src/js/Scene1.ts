
import { Align } from './utilities/align';
import { AlignGrid } from './utilities/alignGrid';
import { config } from './config';
import Alien from './alien';
import background from '../assets/images/trump-over-city.png';
import boom from '../assets/audio/boom.wav';
import enemyBullet from '../assets/images/enemy-bullet.png';
import explosion from '../assets/images/exp.png';
import Human from './human';
import Phaser from 'phaser';
import pop from '../assets/audio/pop.wav';
import shoot from '../assets/audio/shoot.wav';


export class Scene1 extends Phaser.Scene {
    constructor() {
        super( 'Scene1' );
    }

    preload() {
       this.load.image( 'enemy-bullet', enemyBullet ); 

        this.load.audio( 'boom', boom );
        this.load.audio( 'pop', pop );
        this.load.audio( 'shoot', shoot );

       this.load.spritesheet('bg', background, {
           frameWidth: 360,
           frameHeight: 270
       });
       this.load.spritesheet('explosion', explosion, {
           frameWidth: 256,
           frameHeight: 256
       });
    }

    create() {
        this.score = 0;

        this.anims.create({
            key: 'city-anim',
            frames: this.anims.generateFrameNumbers('bg', {
                
            }),
            frameRate: 6,
            repeat: -1
        });
        let bg = this.add.sprite(0, 0, 'bg', 0);
        bg.setOrigin( 0 );
        bg.displayHeight = config.height;
        bg.displayWidth = config.width;
        bg.play( 'city-anim' );

        this.enemyGroup = this.physics.add.group();
        this.bulletGroup = this.physics.add.group();

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });

        this.addEnemy();

        this.time.addEvent({
            callback: this.addEnemy,
            delay: 1500,
            callbackScope: this,
            loop: true 
        });

        this.input.on( 'pointerdown', this.addBullet, this );

        this.physics.add.collider( this.enemyGroup, this.bulletGroup, this.hitEnemy, null, this );

        this.scoreText = this.add.text( 0, 0, "SCORE: 0 ", {
            color: 'rgba( 255, 255, 255, 0.65 )',
            fontFamily: 'Bangers',
            fontSize: config.width / 20
        });
        this.scoreText.setOrigin( 0.5 );
        this.aGrid.placeAtIndex( 5, this.scoreText );

        this.anims.create({
            key: 'boom',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 32
        });

        this.boom = this.sound.add( 'boom' );
        this.pop = this.sound.add( 'pop' );
        this.shoot = this.sound.add( 'shoot' );
    }

    update() {
        this.enemyGroup.children.iterate(child => child && child.update());
    }

    addBullet( pointer ) {
        this.shoot.play();
        let bullet = this.physics.add.sprite( pointer.x, config.height, 'enemy-bullet' );
        this.bulletGroup.add( bullet );
        bullet.setVelocityY( -500 );
    }
    
    addEnemy(): Phaser.GameObjects.Text {
        let rand = Phaser.Math.Between( 0, 100 );
        if ( rand > 50 ) {
            let enemy = new Alien( this, -100, -100 );
        } else {
            let enemy = new Human( this, -100, -100 );
        }
        return enemy;
    }

    hitEnemy( enemy, bullet ) {
        if ( enemy.isHuman ) {
            // game over
            this.scene.start('Scene2');

        } else {
            this.boom.play();
            this.updateScore();
            
            let explosion = this.add.sprite( enemy.x, enemy.y, 'explosion' );
            Align.scaleToGameW( explosion, 0.25 );
            explosion.play( 'boom' );
            explosion.on('animationcomplete', function() {
                this.destroy();
            });
        }
        enemy.destroy();
        bullet.destroy();
    }

    updateScore() {
        this.score++;
        this.scoreText.text = `SCORE: ${this.score} `;
    }
}