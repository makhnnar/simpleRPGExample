import Menu from "./Menu";

export default class EnemiesMenu extends Menu {
            
    constructor(x, y, scene) {
        super(x, y, scene);                 
    }

    confirm(){
        console.log("EnemiesMenu: Is this confirm????");
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
    
}