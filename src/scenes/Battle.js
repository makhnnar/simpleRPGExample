import Phaser from "phaser";
import Player from "../entities/Player";
import Enemy from "../entities/Enemy";

export default class Battle extends Phaser.Scene {
    
    constructor() {
        super("Battle");
    }

    preload(){
       
    }

    create() {

        this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

        this.startBattle();

        this.sys.events.on('wake', this.startBattle, this);
    }

    startBattle() {
        // player character - warrior
        var warrior = new Player(
            this, 
            250, 
            50, 
            "player", 
            1, 
            "Warrior", 
            100, 
            20
        );        
        this.add.existing(warrior);
        
        // player character - mage
        var mage = new Player(this, 250, 100, "player", 4, "Mage", 80, 8);
        this.add.existing(mage);            
        
        var dragonblue = new Enemy(this, 50, 50, "dragonblue", null, "Dragon", 50, 3);
        this.add.existing(dragonblue);
        
        var dragonOrange = new Enemy(this, 50, 100, "dragonorrange", null,"Dragon2", 50, 3);
        this.add.existing(dragonOrange);
        
        // array with heroes
        this.heroes = [ warrior, mage ];
        // array with enemies
        this.enemies = [ dragonblue, dragonOrange ];
        // array with both parties, who will attack
        this.units = this.heroes.concat(this.enemies);
        
        this.scene.run("UI"); 

        this.index = -1; // currently active unit

    }

    update() {
        
    }

    nextTurn() {
        if(this.checkEndBattle()) {           
            this.endBattle();
            return;
        }
        //this code is on a bucle
        do {
            this.index++;
            // if there are no more units, we start again from the first one
            if(this.index >= this.units.length) {
                this.index = 0;
            }
        } while(!this.units[this.index].living);
        
        // if its player hero
        if(this.units[this.index] instanceof Player) {                
            this.events.emit("PlayerSelect", this.index);
        } else { // else if its enemy unit
            // pick random hero
            var r;
            do {
                r = Math.floor(Math.random() * this.heroes.length);
            } while(!this.heroes[r].living) 
            // call the enemy"s attack function 
            try{
                this.units[this.index].attack(this.heroes[r]);
            }catch(error){

            }  
            // add timer for the next turn, so will have smooth gameplay
            this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
        }
    }

    checkEndBattle() {        
        var victory = true;
        // if all enemies are dead we have victory
        for(var i = 0; i < this.enemies.length; i++) {
            if(this.enemies[i].living)
                victory = false;
        }
        var gameOver = true;
        // if all heroes are dead we have game over
        for(var i = 0; i < this.heroes.length; i++) {
            if(this.heroes[i].living)
                gameOver = false;
        }
        return victory || gameOver;
    }

    receivePlayerSelection(action, target) {
        if(action == 'attack') {            
            this.units[this.index].attack(this.enemies[target]);              
        }
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });        
    }

    endBattle() {       
        // clear state, remove sprites
        this.heroes.length = 0;
        this.enemies.length = 0;
        for(var i = 0; i < this.units.length; i++) {
            // link item
            this.units[i].destroy();            
        }
        this.units.length = 0;
        // sleep the UI
        this.scene.sleep('UI');
        // return to WorldScene and sleep current BattleScene
        this.scene.switch('World');
    }

}