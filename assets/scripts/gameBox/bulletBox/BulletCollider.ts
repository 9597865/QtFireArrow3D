import { _decorator, ColliderComponent, Component, ICollisionEvent, Node, RigidBody, Vec3 } from 'cc';
import { BulletObject } from './BulletObject';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { EnemyObject } from '../enemyBox/EnemyObject';
import { QtUILabelAnimation } from '../animations/QtUILabelAnimation';
const { ccclass, property } = _decorator;

@ccclass('BulletCollider')
export class BulletCollider extends Component {
    private isColliding = false; // 标记是否正在碰撞 
    private collider:ColliderComponent = null;
    private rigid:RigidBody = null;
    start() {
        //
        this.rigid = this.getComponent(RigidBody);
        // 注册碰撞事件
        this.collider = this.getComponent(ColliderComponent);
        // console.log(collider);
        // onTriggerEnter
        // onTriggerStay
        // if (collider) {
            // collider.on(ContactTiype.BEGIN_CONTACT, this.onBeginContact, this);
            // this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
            // this.collider.on('onCollisionStay', this.onCollisionStay, this);
            // this.collider.on('onCollisionExit', this.onCollisionExit, this);
        // }   
        if (this.collider) {
            this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
            this.collider.on('onCollisionExit', this.onCollisionExit, this);
        }
        
    }

    update(deltaTime: number) {
        
    }
    
    private onCollisionStay(e: ICollisionEvent){
    }
    private onCollisionExit (e: ICollisionEvent){
        this.isColliding = false;
        console.log('碰撞结束');
    }
    private onCollisionEnter (e: ICollisionEvent){
        // console.log(e.selfCollider.name);//bulletCylinder<BoxCollider>
        // console.log('e.otherCollider.tag');
        // console.log('-onCollisionEnter-'+e.otherCollider.name);
        // // console.log(e.otherCollider.node.parent.parent.parent.parent.getComponent(EnemyObject));
        // console.log(e.otherCollider.node.parent);
        // this.collider.off('onCollisionEnter', this.onCollisionEnter);
        // const selfName = e.selfCollider.name;

        if (!this.isColliding) {
            this.isColliding = true;
            console.log('碰撞开始');
        
            
            //
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
                            name:'enemyCrownTorus',
                            enemyObject:e.otherCollider.node.parent.parent.parent.parent.parent.getComponent(EnemyObject),
                            bulletObject:nd, 
                            bulletAngle:angle,
                            qtUILabelAni:new QtUILabelAnimation(),
                        }
                    );
                    // 
                    break;
                case 'enemyBody<BoxCollider>':
                case 'enemyBodyHitChest<BoxCollider>':
                    nd.velocity = Vec3.ZERO; 
                    nd.node.active = false;
                    AppNotification.emit(
                        GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_BODY_CHEST, 
                        {
                            name:'enemyBodyHitChest',
                            enemyObject:e.otherCollider.node.parent.parent.parent.parent.parent.getComponent(EnemyObject),
                            bulletObject:nd, 
                            bulletAngle:angle,
                            qtUILabelAni:new QtUILabelAnimation(),
                        }
                    );
                    // this.collider.off('onCollisionEnter', this.onCollisionEnter); 
                    break;
                case 'enemyHitLeg<BoxCollider>':
                    nd.velocity = Vec3.ZERO; 
                    nd.node.active = false;
                    AppNotification.emit(
                        GameEvent.EVENT_BULLET_HIT_ENEMYOBJECT_LEG, 
                        {
                            name:'enemyHitLeg',
                            enemyObject:e.otherCollider.node.parent.parent.parent.parent.parent.getComponent(EnemyObject),
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
            
            console.log('<BoxCollider>----',otherName);
        }
        
    }
}


