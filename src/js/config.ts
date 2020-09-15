
import {Scene1} from './Scene1.ts';
import {Scene2} from './Scene2.ts';

export var config = {
    width: 800,
    height: 600,
    scene: [Scene1, Scene2],
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};