import { _decorator, Camera, Component, find, instantiate, Label, Node, ParticleSystem, Prefab, UITransform, Vec2, Vec3 } from 'cc';
import { Player } from '../playerBox/Player';
import { BulletObject } from './BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { IBulletDataObject } from '../interface/IParam';
import { EnemyObject } from '../enemyBox/EnemyObject';
import { ILabelAnimation } from '../interface/ILabelAnimation';
import { QtUILabelAnimation } from '../animations/QtUILabelAnimation';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {

    @property(Prefab)
    bulletPrefab: Node = null;
    @property(Prefab)
    bulletStaticPrefab: Node = null;

    @property([Prefab])
    bulletParticleArr: Prefab[] = [];

    @property(Prefab)
    numLabel2dPrefab: Prefab = null;

    mainCamera: Camera = null;
    uiCamera: Camera = null;

    delTimeDuration: number = 1500;

    bulletLayerBox: Node = null;
    bulletParticleBox: Node = null;
    bulletCylinderStaticBox: Node = null;

    bulletLayerListArr: Node[] = [];

    label2dBox: Node = null;
    uiTransform:UITransform = null;
    /**
     * 开始方法，用于初始化子弹层容器
     * 在游戏开始时调用，设置子弹层的引用
     */
    start() {

        this.uiCamera = find("GameMainBox/Canvas/Camera").getComponent(Camera) as Camera; 
        this.mainCamera = find("Main Camera").getComponent(Camera) as Camera; 
        // 获取名为"bulletLayerBox"的子节点，用于存放子弹对象
        this.bulletLayerBox = this.node.getChildByName("bulletLayerBox");
        this.bulletParticleBox = this.node.getChildByName("bulletParticleBox");
        this.bulletCylinderStaticBox = this.node.getChildByName("bulletCylinderStaticBox");
        
        this.label2dBox = find("GameMainBox/Canvas/label2dBox");
        this.uiTransform = this.label2dBox.getComponent(UITransform);
        // console.log('this.label2dBox', this.label2dBox);
        // console.log(this.label2dBox);

        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY_CHEST, this.onBulletHitEnemyBodyChest, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_HEADCROWN, this.onBulletHitEnemyHeadCrown, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_LEG, this.onBulletenemyHitLeg, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_FLOOR, this.onBulletHitFloor, this);
        AppNotification.on(GameEvent.EVENT_BULLET_HIT_ENEMY_FLOOR, this.onBulletHitEnemyStanderFloor, this);

    }

    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
        
    }

    /**
     * 设置子弹击中目标(击中后，爆炸粒子效果)
     * @param bulletObject - 子弹对象，包含子弹的位置信息等
     */
    playHitParticle(bulletObject:BulletObject, scale: number = 1){
        // 获取子弹节点的位置坐标
        const {x,y,z} = bulletObject.node.getPosition();
        //粒子特效部分
        const particleIndex = Math.floor(this.bulletParticleArr.length-1);  // 获取粒子特效数组最后一个元素的索引
        const particleFab = this.bulletParticleArr[particleIndex];  // 获取粒子特效预制体
        const particleObj:Node = instantiate(particleFab);  // 实例化粒子特效节点
        particleObj.setPosition(x,y,z);  // 设置粒子特效位置
        particleObj.setScale(scale,scale,scale);  // 设置粒子特效缩放
        this.bulletParticleBox.addChild(particleObj);  // 将粒子特效添加到子弹粒子盒子中
        //
        const ps:ParticleSystem = particleObj.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        //
        return particleObj;
    }
    createStaticBullet(data:IBulletDataObject){
        const {bulletAngle,bulletObject } = data;
        const {x,y,z} = bulletObject.node.getPosition();
        //------------------------------
        //创建一个静态子弹，没有碰撞属性，插进了敌人身上
        const blt = instantiate(this.bulletStaticPrefab);
        blt.setPosition(x,y,z);
        blt.setScale(1,1,1);
        blt.setRotationFromEuler(0,0,bulletAngle);
        //
        return blt;
    }
    createLabelTxt(data:IBulletDataObject, labelString:string='-100'){
        const {enemyObject, qtUILabelAni} = data;
        if(qtUILabelAni){
            let labelTxt:ILabelAnimation = qtUILabelAni; //new QtUILabelAnimation();
            labelTxt.labelFab = this.numLabel2dPrefab;
            labelTxt.showDuration = 1;
            labelTxt.labelString = labelString;
            labelTxt.showLabel(enemyObject,this.label2dBox);
        }
    }
    onBulletHitEnemyHeadCrown(data:IBulletDataObject){
        const {name, bulletAngle, bulletObject:bltObj, enemyObject, qtUILabelAni} = data;
        // 
        const particleNode = this.playHitParticle(bltObj);
        // 
        this.createLabelTxt(data, "-200");
        //
        enemyObject.beaten(bltObj.bulletAttack*2);  // 敌人头部受到攻击
        // 
        const blt = this.createStaticBullet(data);
        this.bulletCylinderStaticBox.addChild(blt);
        // 延迟执行销毁操作
        setTimeout(() => {
            if(blt)blt.destroy();
            if(particleNode)particleNode.destroy(); 
            if(enemyObject.hp<=0) {
                enemyObject.del();
            }
        }, this.delTimeDuration); 
    }
    onBulletHitEnemyBodyChest(data:IBulletDataObject){
        const {bulletAngle, bulletObject:bltObj, enemyObject, qtUILabelAni} = data;
        const particleNode = this.playHitParticle(bltObj, 0.5);

        this.createLabelTxt(data, "-100");

        enemyObject.beaten(bltObj.bulletAttack);  // 敌人头部受到攻击
        // 
        const blt = this.createStaticBullet(data);
        this.bulletCylinderStaticBox.addChild(blt);
        // 延迟执行销毁操作
        
        setTimeout(() => {
            if(blt)blt.destroy();
            if(particleNode)particleNode.destroy();  // 销毁粒子特效节点
            // 静态子弹部分（已注释）
            // enemyHead.node.parent.parent.destroy();
            if(enemyObject.hp<=0) enemyObject.del();  // 如果敌人生命值小于等于0，则删除敌人
        }, this.delTimeDuration);  // 延迟1秒执行 
        
    }
    onBulletenemyHitLeg(data:IBulletDataObject){
        const {bulletAngle, bulletObject:bltObj, enemyObject, qtUILabelAni} = data;
        const particleNode = this.playHitParticle(bltObj, 0.3);

        enemyObject.beaten(bltObj.bulletAttack);  // 敌人头部受到攻击

        this.createLabelTxt(data, "-50");
        // 
        const blt = this.createStaticBullet(data);
        this.bulletCylinderStaticBox.addChild(blt);
        // 延迟执行销毁操作
        setTimeout(() => {
            if(blt)blt.destroy();
            particleNode.destroy();  // 销毁粒子特效节点
            // 静态子弹部分（已注释）
            // enemyHead.node.parent.parent.destroy();
            if(enemyObject.hp<=0) enemyObject.del();  // 如果敌人生命值小于等于0，则删除敌人
        }, this.delTimeDuration);  // 延迟1秒执行 
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
        // console.log("blt:",blt)
        //粒子特效
        // const particleNode:ParticleSystem = blt.getComponentInChildren(ParticleSystem) as ParticleSystem;
        // const particleNode:ParticleSystem = blt.getChildByName('flyLightParticle').getComponent(ParticleSystem) as ParticleSystem;
        // particleNode.stop();
        
        setTimeout(() => {
            blt.active = false;
            // blt.destroy();
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
        const particleFab = this.bulletParticleArr[0];
        const particleNode:Node = instantiate(particleFab);
        particleNode.setPosition(x,y,z);
        // particleNode.setScale(2,2,2);
        // particleNode.setRotationFromEuler(0,0,bltAngle);
        this.bulletParticleBox.addChild(particleNode);
        //
        const ps:ParticleSystem = particleNode.getComponent(ParticleSystem) as ParticleSystem;
        ps.play();
        // console.log(ps);
        // console.log("bulletControl onBulletHitEnemyFloor");
        setTimeout(() => {
             particleNode.destroy();
        }, 1000);
    }
    
}

