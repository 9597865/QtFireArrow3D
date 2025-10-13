import { _decorator, Component, instantiate, Node, ParticleSystem, Prefab, Vec3 } from 'cc';
import { Player } from '../playerBox/Player';
import { BulletObject } from './BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { IBulletDataObject } from '../interface/IParam';
import { EnemyObject } from '../enemyBox/EnemyObject';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {

    @property(Prefab)
    bulletPrefab: Node = null;
    @property(Prefab)
    bulletStaticPrefab: Node = null;

    @property([Prefab])
    bulletParticleArr: Prefab[] = [];

    private totalTime:number = 0;

    bulletLayerBox: Node = null;
    bulletParticleBox: Node = null;
    bulletCylinderStaticBox: Node = null;

    bulletLayerListArr: Node[] = [];

    /**
     * 开始方法，用于初始化子弹层容器
     * 在游戏开始时调用，设置子弹层的引用
     */
    start() {
        // 获取名为"bulletLayerBox"的子节点，用于存放子弹对象
        this.bulletLayerBox = this.node.getChildByName("bulletLayerBox");
        this.bulletParticleBox = this.node.getChildByName("bulletParticleBox");
        this.bulletCylinderStaticBox = this.node.getChildByName("bulletCylinderStaticBox");
        // 检查bulletLayerBox是否存在
        if(this.bulletLayerBox){
            // 以下两行被注释掉的代码用于调试输出
            // console.log("bulletLayerBox is null");
            // console.log(this.bulletLayerBox)
        }

        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY, this.onBulletHitEnemyBody, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_FLOOR, this.onBulletHitFloor, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMY_FLOOR, this.onBulletHitEnemyFloor, this);
        
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

    onBulletHitEnemyBody(data:IBulletDataObject){   
        // const bltAngle:number = data.bulletAngle;
        // const bltObj:BulletObject = data.bulletObject;
        // const enemyObject:EnemyObject = data.enemyObject;

        const {bulletAngle, bulletObject:bltObj, enemyBody} = data;
        const {x,y,z} = bltObj.node.getPosition();
        //粒子特效
        const particleIndex = Math.floor(this.bulletParticleArr.length-1);
        const particleFab = this.bulletParticleArr[particleIndex];
        const particleNode:Node = instantiate(particleFab);
        particleNode.setPosition(x,y,z);
        // particleNode.setScale(2,2,2);
        // particleNode.setRotationFromEuler(0,0,bltAngle);
        this.bulletParticleBox.addChild(particleNode);
        //
        const ps:ParticleSystem = particleNode.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        // console.log(ps);
        console.log("bulletControl onBulletHitEnemyBody");
        setTimeout(() => {
            particleNode.destroy();
            //
            enemyBody.node.parent.destroy();
        }, 200);

        //静态子弹
        // const blt = instantiate(this.bulletStaticPrefab);
        // blt.setPosition(x,y,z);
        // blt.setRotationFromEuler(0,0,bltAngle);
        // this.bulletCylinderStaticBox.addChild(blt);

        // setTimeout(() => {
        //     blt.destroy();
        // }, 2000);



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
    /**
     * 子弹击中敌人地面时的处理函数
     * @param data 包含子弹数据的对象
     */
    onBulletHitEnemyFloor(data:IBulletDataObject){
        const bltAngle:number = data.bulletAngle;
        const bltObj:BulletObject = data.bulletObject;
        const {x,y,z} = bltObj.node.getPosition();
        //粒子特效
        const particleIndex = Math.floor(this.bulletParticleArr.length-1);
        const particleFab = this.bulletParticleArr[particleIndex];
        const particleNode:Node = instantiate(particleFab);
        particleNode.setPosition(x,y,z);
        // particleNode.setScale(2,2,2);
        // particleNode.setRotationFromEuler(0,0,bltAngle);
        this.bulletParticleBox.addChild(particleNode);
        //
        const ps:ParticleSystem = particleNode.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        // console.log(ps);
        console.log("bulletControl onBulletHitEnemyFloor");
        setTimeout(() => {
            particleNode.destroy();
        }, 1000);

        // //静态子弹
        // const blt = instantiate(this.bulletStaticPrefab);
        // blt.setPosition(x,y,z);
        // blt.setRotationFromEuler(0,0,bltAngle);
        // this.bulletCylinderStaticBox.addChild(blt);

        // setTimeout(() => {
        //     blt.destroy();
        // }, 2000);
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
        bltObj.mass = 5;
        bltObj.skinObject = blt;
        //
        this.bulletLayerListArr.push(blt);
    }
}

