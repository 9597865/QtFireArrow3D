import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Player } from '../playerBox/Player';
import { BulletObject } from './BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { IBulletDataObject } from '../interface/IParam';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {

    @property(Prefab)
    bulletPrefab: Node = null;
    @property(Prefab)
    bulletStaticPrefab: Node = null;

    private totalTime:number = 0;

    bulletLayerBox: Node = null;
    bulletCylinderStaticBox: Node = null;

    bulletLayerListArr: Node[] = [];

    /**
     * 开始方法，用于初始化子弹层容器
     * 在游戏开始时调用，设置子弹层的引用
     */
    start() {
        // 获取名为"bulletLayerBox"的子节点，用于存放子弹对象
        this.bulletLayerBox = this.node.getChildByName("bulletLayerBox");
        this.bulletCylinderStaticBox = this.node.getChildByName("bulletCylinderStaticBox");
        // 检查bulletLayerBox是否存在
        if(this.bulletLayerBox){
            // 以下两行被注释掉的代码用于调试输出
            // console.log("bulletLayerBox is null");
            // console.log(this.bulletLayerBox)
        }

        AppNotification.on(GameEvent.EVENT_BULLET_HIT_FLOOR, this.onBulletHitFloor, this);
    }

    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
        this.totalTime +=deltaTime;
        for (const bullet of this.bulletLayerListArr) {
            const blt:Node = bullet as Node;
            const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
            // console.log(bltObj)
            if(bltObj.velocity!=Vec3.ZERO){
               bltObj.gameTick(deltaTime);
            }
        } 

        this.destoryBullet();
    }

    /**
     * 子弹击中地板时的处理函数
     * @param data 包含子弹数据的对象
     */
    onBulletHitFloor(data:IBulletDataObject){
        const bltAngle:number = data.bulletAngle;
        const bltObj:BulletObject = data.bulletObject;
        const {x,y,z} = bltObj.node.getPosition();
        const blt = instantiate(this.bulletStaticPrefab);
        blt.setPosition(x,y,z);
        blt.setRotationFromEuler(0,0,bltAngle);
        this.bulletCylinderStaticBox.addChild(blt);

        setTimeout(() => {
            blt.destroy();
        }, 2000);
        // console.log("bulletControl onBulletHitFloor");
        // console.log(blt)
        // console.log("angle",bltAngle);
        // this.node.addChild(blt);
        // blt.setPosition(x,y,z);
    }
    destoryBullet(){
        if(Math.round(this.totalTime)%5==0){
            // console.log('========')
            //删除 跟踪 小炮弹
            if(this.bulletLayerListArr.length>0){
                this.bulletLayerListArr.forEach((child,index)=>{
                    let blt:Node = child as Node;
                    const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
                    // console.log(bltObj.node.active) 
                    // if( !bltObj.node.active || bltObj.velocity == Vec3.ZERO ){
                    if( !bltObj.node.active ){
                        bltObj.node.destroy();
                        this.bulletLayerListArr.splice(index,1);
                        blt = null;
                    }
                })
            }
        }
    }
    public fire(player:Player){
        // console.log("bulletControl fire");
        const blt = instantiate(this.bulletPrefab);
        this.bulletLayerBox.addChild(blt);
        blt.setRotationFromEuler(0,0,player.getGunAngle());
        //
        const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
        const velocity = QtMath.convertSpeedAngleToVector3(0.2,player.getGunAngle()+90);
        bltObj.name = 'bullet';
        bltObj.velocity = velocity;
        bltObj.position = player.node.getPosition();
        bltObj.maxForce = 10;
        bltObj.maxSpeed = 1;
        bltObj.mass = 50;
        bltObj.skinObject = blt;
        //
        this.bulletLayerListArr.push(blt);
    }
}

