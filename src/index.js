import Phaser from "phaser";
import Boot from "./scenes/Boot";
import World from "./scenes/World";

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
          gravity: { y: 0 }
      }
  },
  scene: [
      Boot,
      World
  ]
};

const game = new Phaser.Game(config);
