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
        

        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_HEAD, this.onBulletHitEnemyHead, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY, this.onBulletHitEnemyBody, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_FLOOR, this.onBulletHitFloor, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMY_FLOOR, this.onBulletHitEnemyStanderFloor, this);



        
    }

    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
        this.totalTime +=deltaTime;
        for (const bullet of this.bulletLayerListArr) {
            const blt:Node = bullet as Node;
            const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
            if(bltObj.velocity!=Vec3.ZERO){
               bltObj.gameTick(deltaTime);
            }
        } 

        this.destoryBullet();
    }

    onBulletHitEnemyHead(data:IBulletDataObject){
        console.log("bulletControl onBulletHitEnemyHead");
        const {bulletAngle, bulletObject:bltObj, enemyHead} = data;
        // 获取子弹节点的位置坐标
        const {x,y,z} = bltObj.node.getPosition();
        //粒子特效部分
        const particleIndex = Math.floor(this.bulletParticleArr.length-1);  // 获取粒子特效数组最后一个元素的索引
        const particleFab = this.bulletParticleArr[particleIndex];  // 获取粒子特效预制体
        const particleNode:Node = instantiate(particleFab);  // 实例化粒子特效节点
        particleNode.setPosition(x,y,z);  // 设置粒子特效位置
        // particleNode.setScale(2,2,2);  // 设置粒子特效缩放（已注释）
        // particleNode.setRotationFromEuler(0,0,bltAngle);  // 设置粒子特效旋转（已注释）
        this.bulletParticleBox.addChild(particleNode);  // 将粒子特效添加到子弹粒子盒子中
        //
        const ps:ParticleSystem = particleNode.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        // console.log(ps);  // 输出粒子系统信息（已注释）
        // console.log("bulletControl onBulletHitEnemyHead");  // 输出日志信息
        //
        bltObj.bulletAttack = 12;
        enemyHead.beaten(bltObj.bulletAttack);
        // 延迟执行销毁操作
        setTimeout(() => {
            particleNode.destroy();  // 销毁粒子特效节点
            // 静态子弹部分（已注释）
            // enemyHead.node.parent.parent.destroy();
            if(enemyHead.life<=0) enemyHead.del();
        }, 1000);
    }

    /**
     * 子弹击中敌人身体的处理函数
     * @param data 包含子弹信息的接口对象
     */
    onBulletHitEnemyBody(data:IBulletDataObject){
        // 使用解构赋值获取子弹角度、子弹对象和敌人身体
        const {bulletAngle, bulletObject:bltObj, enemyBody} = data;
        // 获取子弹节点的位置坐标
        const {x,y,z} = bltObj.node.getPosition();
        //粒子特效部分
        const particleIndex = Math.floor(this.bulletParticleArr.length-1);  // 获取粒子特效数组最后一个元素的索引
        const particleFab = this.bulletParticleArr[particleIndex];  // 获取粒子特效预制体
        const particleNode:Node = instantiate(particleFab);  // 实例化粒子特效节点
        particleNode.setPosition(x,y,z);  // 设置粒子特效位置
        // particleNode.setScale(2,2,2);  // 设置粒子特效缩放（已注释）
        // particleNode.setRotationFromEuler(0,0,bltAngle);  // 设置粒子特效旋转（已注释）
        this.bulletParticleBox.addChild(particleNode);  // 将粒子特效添加到子弹粒子盒子中
        //
        const ps:ParticleSystem = particleNode.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        // console.log(ps);  // 输出粒子系统信息（已注释）
        console.log("bulletControl onBulletHitEnemyBody");  // 输出日志信息
        // 延迟执行销毁操作
        
        enemyBody.beaten();

        setTimeout(() => {
            particleNode.destroy();  // 销毁粒子特效节点
            // 静态子弹部分（已注释）
            // enemyBody.node.parent.parent.destroy();
            if(enemyBody.life<=0) enemyBody.del();
        }, 1000);

    }
    /**
     * 子弹击中 四周地板时的处理函数
     * @param data 包含子弹数据的对象
     */
    onBulletHitFloor(data:IBulletDataObject){
        const bltAngle:number = data.bulletAngle;
        const bltObj:BulletObject = data.bulletObject;
        const {x,y,z} = bltObj.node.getPosition();

        const blt = instantiate(this.bulletStaticPrefab);
        blt.setPosition(x,y,z);
        blt.setScale(1,1,1);
        blt.setRotationFromEuler(0,0,bltAngle);
        this.bulletCylinderStaticBox.addChild(blt);

        //粒子特效
        // const particleNode:ParticleSystem = blt.getComponentInChildren(ParticleSystem) as ParticleSystem;
        const particleNode:ParticleSystem = blt.getChildByName('flyLightParticle').getComponent(ParticleSystem) as ParticleSystem;
        particleNode.stop();

        
        setTimeout(() => {
            blt.destroy();
        }, 2000);
        
    }
    /**
     * 子弹击中敌人脚下的地面时 的处理函数
     * @param data 包含子弹数据的对象
     */
    onBulletHitEnemyStanderFloor(data:IBulletDataObject){
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

