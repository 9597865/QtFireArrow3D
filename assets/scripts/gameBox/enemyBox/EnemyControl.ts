import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
import { EnemyObject } from './EnemyObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { QtUIBar } from '../animations/QtUiBar';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {

    @property(Prefab)
    enemyObjectPrefab: Prefab = null;
    @property(Prefab)
    uiBloodPrefab: Prefab = null;

    private enemyUiBloodBox:Node = null;
    private enemyLayerBox:Node = null;
    
    start() {
        this.enemyLayerBox = find("GameMainBox/gameBox/enemyBox/enemyControl/enemyLayerBox");
        this.enemyUiBloodBox = find("GameMainBox/Canvas/enemyBloodBox");
        //
        let positionArrList: Vec3[] = [new Vec3(10,4,0), new Vec3(10,6,0), new Vec3(6,2,0)]
        let len:number = positionArrList.length;
        for(let i=0; i<len; i++){
            let v3Pos:Vec3 = positionArrList[i];
            const enemyObj = instantiate(this.enemyObjectPrefab);
            const enemyObject:EnemyObject = enemyObj.getComponent(EnemyObject);
            enemyObject.hp = 5;//QtMath.randomInt(1,4);
            // const angle = Vec3.angle(v3Pos, new Vec3(0, 0, 0));
            enemyObj.setPosition(v3Pos);
            // enemyObj.setScale(new Vec3(1+i/5,1+i/5,1+i/5));
            // enemyObj.setRotationFromEuler(0,0,bltAngle);
            this.enemyLayerBox.addChild(enemyObj);
            //
            // const bloodBox = enemyObject.node.getChildByName("bloodBox");
            // const enemyUiBlood:Node = instantiate(this.uiBloodPrefab); 
            // this.enemyUiBloodBox.addChild(enemyUiBlood);
            //
            // const uiBloodBar:QtUIBloodBar = enemyUiBlood.getComponent(QtUIBloodBar);
            // const enemyHead:Node = enemyObj.getComponent(EnemyObject).node.getChildByName('enemyPeople').getChildByName('enemyHead')
            // const head:Node = enemyHead.getChildByName("enemyHead");
            setTimeout(() =>{
                const uiBloodBar:QtUIBar = new QtUIBar();
                uiBloodBar.fab = this.uiBloodPrefab;
                uiBloodBar.create(enemyObj,this.enemyUiBloodBox);
                uiBloodBar.setBarValue(1-0.1*i);
                //
                enemyObject.uiBar = uiBloodBar;
            }, 100);
        }
        
        

    }

    gameTick(deltaTime: number) {
        
    }
}

