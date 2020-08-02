import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    
    constructor() {
        super("Boot");
    }

    preload(){
        // map tiles
        this.load.image(
            'tiles',
            'src/assets/map/spritesheet.png'
        );
        
        // map in json format
        this.load.tilemapTiledJSON(
            'map',
            'src/assets/map/map.json'
        );
        
        // our two characters
        this.load.spritesheet(
            'player',
            'src/assets/RPG_assets.png', 
            { frameWidth: 16, frameHeight: 16 }
        );

        this.load.image('dragonblue', 'src/assets/dragonblue.png');
        this.load.image('dragonorrange', 'src/assets/dragonorrange.png');
    }

    create() {
        this.scene.start("World");
    }

    update() {
        
    }
}