import { _decorator, ColliderComponent, Component, ICollisionEvent, Node, RigidBody, Vec3 } from 'cc';
import { BulletObject } from './BulletObject';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { EnemyObject } from '../enemyBox/EnemyObject';
import { QtUILabelAnimation } from '../animations/QtUILabelAnimation';
const { ccclass, property } = _decorator;

@ccclass('BulletCollider')
export class BulletCollider extends Component {
    
    private collider:ColliderComponent = null;
    private rigid:RigidBody = null;
    start() {
        //
        this.rigid = this.getComponent(RigidBody);
        // console.log('BulletCollider start');
        // console.log(this.rg);
        // 注册碰撞事件
        this.collider = this.getComponent(ColliderComponent);
        // console.log(collider);
        // if (collider) {
            // collider.on(ContactTiype.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
            this.collider.on('onCollisionStay', this.onCollisionStay, this);
            this.collider.on('onCollisionExit', this.onCollisionExit, this);
        // }   
    }

    update(deltaTime: number) {
        
    }
    
    private onCollisionStay(e: ICollisionEvent){
    }
    private onCollisionExit (e: ICollisionEvent){
        
    }
    private onCollisionEnter (e: ICollisionEvent){
        // console.log(e.selfCollider.name);//bulletCylinder<BoxCollider>
        // console.log('e.otherCollider.tag');
        // console.log('-onCollisionEnter-'+e.otherCollider.name);
        // // console.log(e.otherCollider.node.parent.parent.parent.parent.getComponent(EnemyObject));
        // console.log(e.otherCollider.node.parent);
        // this.collider.off('onCollisionEnter', this.onCollisionEnter);
        // const selfName = e.selfCollider.name;
        let nd:BulletObject = this.node.parent.getComponent(BulletObject) as BulletObject;
        if(nd==null){
            return;
        }
        let angle:number = nd.node.eulerAngles.z;
        const otherName = e.otherCollider.name;
        switch (otherName) {
            case 'gameFloorCube_top<BoxCollider>':
            case 'gameFloorCube_bottom<BoxCollider>':
            case 'gameFloorCube_right<BoxCollider>':
            case 'gameFloorCube_left<BoxCollider>':
            case 'gameFloorCube_right-001<BoxCollider>':
                //碰到游戏窗口边框
                nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(GameEvent.EVENT_BULLET_HIT_FLOOR, {bulletObject:nd, bulletAngle:angle});
                this.collider.off('onCollisionEnter', this.onCollisionEnter);
                break;
                
            case 'enemyCrownTorus<BoxCollider>':
                nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(
                    GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_HEADCROWN, 
                    {
                        enemyCrownTorus:e.otherCollider.node.parent.parent.parent.parent.parent.getComponent(EnemyObject),
                        bulletObject:nd, 
                        bulletAngle:angle,
                        qtUILabelAni:new QtUILabelAnimation(),
                    }
                );
                this.collider.off('onCollisionEnter', this.onCollisionEnter);
                break;
            case 'enemyBodyHitChest<BoxCollider>':
                nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(
                    GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY_CHEST, 
                    {
                        enemyBodyHitChest:e.otherCollider.node.parent.parent.parent.parent.parent.getComponent(EnemyObject),
                        bulletObject:nd, 
                        bulletAngle:angle,
                        qtUILabelAni:new QtUILabelAnimation(),
                    }
                );
                this.collider.off('onCollisionEnter', this.onCollisionEnter); 
                break;
            case 'enemyHead<BoxCollider>':
                nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(
                    GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_HEAD, 
                    {
                        enemyHead:e.otherCollider.node.parent.parent.getComponent(EnemyObject),
                        bulletObject:nd, 
                        bulletAngle:angle,
                        qtUILabelAni:new QtUILabelAnimation(),
                    }
                );
                break;
            case 'enemyBody<BoxCollider>':
                //打中敌人身体
                nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(
                    GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY, 
                    {
                        enemyBody:e.otherCollider.node.parent.parent.getComponent(EnemyObject),
                        bulletObject:nd, 
                        bulletAngle:angle,
                        qtUILabelAni:new QtUILabelAnimation(),
                    }
                );
                break;
            case 'enemyFloorCube<BoxCollider>':
                // nd.velocity = Vec3.ZERO; 
                nd.node.active = false;
                AppNotification.emit(GameEvent.EVENT_BULLET_HIT_ENEMY_FLOOR, {bulletObject:nd, bulletAngle:angle}); 
                break;
            default:
                break;
        }
        
        // console.log('bulletFab<BoxCollider>----',otherName);


    }
}


