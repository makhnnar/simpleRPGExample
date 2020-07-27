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
        this.player = this.physics.add.sprite(50, 100, 'player', 6);
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBounds(
            0, 
            0, 
            this.map.widthInPixels, 
            this.map.heightInPixels
        );
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
            frameRate: 10,
            repeat: -1
        });
        
        // animation with key 'right'
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.obstacles);

        this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
        for(let i = 0; i < 30; i++) {
            let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
            let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
            // parameters are x, y, width, height
            this.spawns.create(x, y, 20, 20);            
        }        
        this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
    }

    update() {
        this.player.body.setVelocity(0);
 
        // Horizontal movement
        if (this.cursors.left.isDown){
            this.player.body.setVelocityX(-80);
            this.player.anims.play('left', true).setFlipX(true);
            return;
        }
        if (this.cursors.right.isDown){
            this.player.body.setVelocityX(80);
            this.player.anims.play('right', true).setFlipX(false);
            return;
        }
 
        // Vertical movement
        if (this.cursors.up.isDown){
            this.player.body.setVelocityY(-80);
            this.player.anims.play('up', true);
            return;
        }
        if (this.cursors.down.isDown){
            this.player.body.setVelocityY(80);
            this.player.anims.play('down', true);
            return;
        }
        this.player.anims.stop();
    }

    onMeetEnemy(player, zone) {        
        // start battle
        // we move the zone to some other location
        zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
        zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
        
        // shake the world
        this.cameras.main.shake(300);

        this.cameras.main.flash(300);
        //this.cameras.main.fade(300);
    }

}