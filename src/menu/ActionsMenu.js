import Menu from "./Menu";

export default class ActionsMenu extends Menu {
            
    constructor(x, y, scene) {
        super(x, y, scene); 
        this.addMenuItem('Attack');                   
    }

    confirm(){
        console.log('ActionsMenu.confirm()')
        this.scene.events.emit('SelectEnemies');
    }
    
}