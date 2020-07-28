import Phaser from "phaser";
import Boot from "./scenes/Boot";
import World from "./scenes/World";
import Battle from "./scenes/Battle";
import UI from "./scenes/UI";

const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [
        Boot,
        World,
        Battle,
        UI
    ],
    scale: {
        mode: Phaser.Scale.FIT,//ajustamos a todo el tam de pantalla
        autoCenter: Phaser.Scale.CENTER_BOTH //centramos en ambas direcciones
    }
};

const game = new Phaser.Game(config);
