
import { Align } from '../js/utilities/align';
import { AlignGrid } from '../js/utilities/alignGrid';
import { config } from "./config";
import Alien from "./alien";


export class Scene2 extends Phaser.Scene {
    constructor() {
        super( 'Scene2' );
    }

    preload() {}

    create() {
        let bg = this.add.sprite(0, 0, 'bg', 0);
        bg.setOrigin( 0 );
        bg.displayHeight = config.height;
        bg.displayWidth = config.width;
        bg.play( 'city-anim' );

        // this.face = new Alien( this, -100, -100 );
        // Align.center( this.face );

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });

        let gameOverText = this.add.text( 0, 0, 'Game Over ', {
            color: 'rgba( 255, 255, 255, 0.85 )',
            fontFamily: 'Bangers',
            fontSize: config.width / 10
        });
        gameOverText.setOrigin( 0.5 );
        this.aGrid.placeAtIndex( 27, gameOverText );

        let playAgainText = this.add.text( 0, 0, 'Play Again! ', {
            color: 'rgba( 255, 255, 255, 1 )',
            fontFamily: 'Bangers',
            fontSize: config.width / 20
        });
        playAgainText.setOrigin( 0.5 );
        this.aGrid.placeAtIndex( 82, playAgainText );

        playAgainText.setInteractive();
        playAgainText.on('pointerdown', this.playAgain, this);

    }

    playAgain() {
        this.scene.start( 'Scene1' );
    }

    update() {}
}