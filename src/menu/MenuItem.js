import Phaser from "phaser";

export default class MenuItem extends Phaser.GameObjects.Text {
    
    constructor(x, y, text, scene) {
        super(x, y, text, scene,{ color: '#ffffff', align: 'left', fontSize: 15});
    }

    select() {
        this.setColor('#f8ff38');
    }
    
    deselect() {
        this.setColor('#ffffff');
    }

}