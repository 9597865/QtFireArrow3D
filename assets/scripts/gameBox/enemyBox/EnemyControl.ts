import { _decorator, Component, find, instantiate, Node, Prefab, Vec3 } from 'cc';
import { EnemyObject } from './EnemyObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { QtUIBar } from '../animations/QtUiBar';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {

    @property(Prefab)
    enemyObjectPrefab: Prefab = null;
    @property(Prefab)
    uiBloodPrefab: Prefab = null;

    private enemyUiBloodBox:Node = null;
    private enemyLayerBox:Node = null;
    
    protected onLoad(): void {
        this.enemyLayerBox = find("GameMainBox/gameBox/enemyBox/enemyControl/enemyLayerBox");
        this.enemyUiBloodBox = find("GameMainBox/Canvas/enemyBloodBox");
    }
    start() {
        //
        let positionArrList: Vec3[] = [new Vec3(14,2,0), new Vec3(14,6,0), new Vec3(8,3,0)]
        let len:number = positionArrList.length;
        for(let i=0; i<len; i++){
            let v3Pos:Vec3 = positionArrList[i];
            const enemyObj = instantiate(this.enemyObjectPrefab);
            const enemyObject:EnemyObject = enemyObj.getComponent(EnemyObject);
            enemyObject.hp = enemyObject.hpTotal = 5;//QtMath.randomInt(1,4);
            // const angle = Vec3.angle(v3Pos, new Vec3(0, 0, 0));
            enemyObj.setPosition(v3Pos);
            // enemyObj.setScale(new Vec3(1+i/5,1+i/5,1+i/5));
            enemyObj.setScale(new Vec3(0.8,0.8,0.8));
            // enemyObj.setRotationFromEuler(0,0,bltAngle);
            const bloodBox = enemyObject.node.getChildByName("bloodBox");
            // const enemyUiBlood:Node = instantiate(this.uiBloodPrefab); 
            // this.enemyUiBloodBox.addChild(enemyUiBlood);
            //
            // const uiBloodBar:QtUIBloodBar = enemyUiBlood.getComponent(QtUIBloodBar);
            // const enemyHead:Node = enemyObj.getComponent(EnemyObject).node.getChildByName('enemyPeople').getChildByName('enemyHead')
            // const head:Node = enemyHead.getChildByName("enemyHead");
            const uiBloodBar:QtUIBar = new QtUIBar();
            enemyObject.uiBar = uiBloodBar;
            uiBloodBar.fab = this.uiBloodPrefab;
            // setTimeout(() =>{
                uiBloodBar.create(bloodBox,this.enemyUiBloodBox);
                // uiBloodBar.setBarValue(1-0.1*i);
            // }, 100);

            this.enemyLayerBox.addChild(enemyObj);
        }
        

    }

    gameTick(deltaTime: number) {
       this.enemyLayerBox.children.forEach((enemyObj:Node)=>{
            const enemyObject:EnemyObject = enemyObj.getComponent(EnemyObject);
            const bloodBox = enemyObject.node.getChildByName("bloodBox");
            if(enemyObject.uiBar){
                enemyObject.uiBar.updatePositon(bloodBox,this.enemyUiBloodBox);
            }
       })
    }
}

