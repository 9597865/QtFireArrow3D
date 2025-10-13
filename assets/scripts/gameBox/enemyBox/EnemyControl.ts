import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    @property(Prefab)
    enemyObjectPrefab: Prefab = null;


    private enemyLayerBox:Node = null;
    
    start() {

        this.enemyLayerBox = find("GameMainBox/gameBox/enemyBox/enemyControl/enemyLayerBox");
        console.log("enemyLayerBox",this.enemyLayerBox);


        let positionArrList: Vec3[] = [new Vec3(10,4,0), new Vec3(10,6,0), new Vec3(6,2,0)]
        let len:number = positionArrList.length;
        for(let i=0; i<len; i++){
            let v3Pos:Vec3 = positionArrList[i];
            const enemyObj = instantiate(this.enemyObjectPrefab);
            enemyObj.setPosition(v3Pos);
            // enemyObj.setRotationFromEuler(0,0,bltAngle);
            this.enemyLayerBox.addChild(enemyObj);
            // console.log(enemyObj.getPosition());
            console.log(v3Pos);
        }
        


    }

    gameTick(deltaTime: number) {
        
    }
}

