import Phaser from "phaser";

export default class World extends Phaser.Scene {
    
    constructor() {
        super("World");
    }

    preload(){
        
    }

    create() {
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage(
            'spritesheet', 
            'tiles'
        );
        
        this.grass = this.map.createStaticLayer(
            'Grass',
            this.tiles,
            0,
            0
        );
        this.obstacles = this.map.createStaticLayer(
            'Obstacles',
            this.tiles,
            0,
            0
        );
        this.obstacles.setCollisionByExclusion([-1]);
    }

    update() {
        
    }
}