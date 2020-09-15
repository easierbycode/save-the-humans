
import { Align } from './utilities/align';
import { config } from './config';
import Phaser from 'phaser';


export default class Alien extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene, 
        x: number, 
        y: number, 
        text: string = '👽', 
        style: object = {
            fontSize: '64px'
        }
    ) {
        super( scene, x, y, text, style );
        scene.physics.add.existing( this );
        
        this.isHuman = false;
        
        this.scene = scene;

        this.scene.time.addEvent({
            callback    : () => {
                this.setTint( 0x15da01, 0x15da01, 0x15da01, 0x15da01 );
                
                scene.aGrid.placeAtIndex( 32, this );
                Align.scaleToGameW( this, .1 );
                scene.enemyGroup.add( this );

                this.body
                    .setVelocityX( -100 )
                    .setSize( (this.width - 16), this.height, true );
                
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
        } else if (this.x > config.width) {
            this.x -= 10;
            this.body.setVelocityX( -100 );
            this.y += this.displayHeight;
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