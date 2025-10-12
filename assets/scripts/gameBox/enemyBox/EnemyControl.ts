import { _decorator, Component, find, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    @property(Prefab)
    enemyObjectPrefab: Prefab = null;


    private enemyLayerBox:Node = null;
    
    start() {

        this.enemyLayerBox = find("GameMainBox/gameBox/enemyBox/enemyControl/enemyLayerBox");
        console.log("enemyLayerBox",this.enemyLayerBox);
        const enemyObj = instantiate(this.enemyObjectPrefab);
        // enemyObj.setPosition(x,y,z);
        // enemyObj.setRotationFromEuler(0,0,bltAngle);
        this.enemyLayerBox.addChild(enemyObj);
    }

    gameTick(deltaTime: number) {
        
    }
}

