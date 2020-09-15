
import { Align } from './utilities/align';
import { config } from './config';
import Phaser from 'phaser';


export default class Human extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        text: string = '🗿', 
        style: object = {
            fontSize: '64px'
        }
    ) {
        super( scene, x, y, text, style );
        scene.physics.add.existing( this );
        
        this.isHuman = true;
        
        this.scene = scene;

        this.scene.time.addEvent({
            callback    : () => {
                scene.aGrid.placeAtIndex( 32, this );
                Align.scaleToGameW( this, .1 );
                scene.enemyGroup.add( this );
                
                this.body
                    .setVelocityX( -100 )
                    .setSize( (this.width - 33), this.height, true );

                this.setOrigin( 0.5 );
            },
            delay       : 13
        })

        scene.add.existing( this );
    }

    update() {
        if (this.x < 0) {
            this.x = 10;
            this.body.setVelocityX( 100 );
            this.y += this.displayHeight;
            this.flipX = true;
        } else if (this.x > config.width) {
            this.x -= 10;
            this.body.setVelocityX( -100 );
            this.y += this.displayHeight;
            this.flipX = false;
        }
        
        if (this.y > config.height) {
            if ( this.isHuman ) {
                this.scene.pop.play();
                this.scene.updateScore();
            } else {
                this.scene.scene.start('Scene2');
            }
            this.destroy();
        }
    }
}