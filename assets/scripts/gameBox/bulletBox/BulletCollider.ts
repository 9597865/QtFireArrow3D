import { _decorator, ColliderComponent, Component, ICollisionEvent, Node, RigidBody, Vec3 } from 'cc';
import { BulletObject } from './BulletObject';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
const { ccclass, property } = _decorator;

@ccclass('BulletCollider')
export class BulletCollider extends Component {
    
    private rigid:RigidBody = null;
    start() {
        //
        this.rigid = this.getComponent(RigidBody);
        // console.log('BulletCollider start');
        // console.log(this.rg);
        // 注册碰撞事件
        let collider = this.getComponent(ColliderComponent);
        // console.log(collider);
        // if (collider) {
            // collider.on(ContactTiype.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
            collider.on('onCollisionStay', this.onCollisionStay, this);
            collider.on('onCollisionExit', this.onCollisionExit, this);
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
        // console.log('---'+e.otherCollider.name);
        // console.log(e.otherCollider.node.parent);

        // const selfName = e.selfCollider.name;
        const otherName = e.otherCollider.name;
        if(
            otherName.indexOf('gameFloorCube') != -1 
        ){
            //碰到游戏窗口边框
            let nd:BulletObject = this.node.parent.getComponent(BulletObject) as BulletObject;
            nd.velocity = Vec3.ZERO; 
            nd.node.active = false;
            // console.log('bullet hit wall');

            let angle:number = nd.node.eulerAngles.z;
            AppNotification.emit(GameEvent.EVENT_BULLET_HIT_FLOOR, {bulletObject:nd, bulletAngle:angle});

            // this.rigid.clearState();
            // console.log(nd);
            // console.log(this.node.components);
            // this.node.components.forEach((comp)=>{
            //     if(comp instanceof RigidBody){
            //         console.log('rigidBody');
            //         console.log(comp);
            //         comp.clearVelocity();
            //         comp.clearState();
            //         comp.clearForces();
            //     }
            // })
        }
        //
        console.log('bulletFab<BoxCollider>----',otherName);
        if(
            // otherName.indexOf('gameFloorCube') != -1 //'gameFloorCube_right<BoxCollider>'
            otherName == 'gameFloorCube_right<BoxCollider>'
        ){
            // const n = e.otherCollider.node;
            //active 作为标记
            // n.active = false;
            //
            // const bombNode:Node = instantiate(this.bombParticleFab);
            // bombNode.setPosition(n.position);
            // this.node.parent.addChild(bombNode);
            // //
            // const particle:ParticleSystem = bombNode.getComponent(ParticleSystem);
            // particle.loop = false;
            // // 
            // this.scheduleOnce((dt) => {
            //     if(n.isValid && !n.active){
            //         // n.removeAllChildren();
            //         // n.destroyAllChildren();
            //         // n.destroy()
            //     }
            //     bombNode.destroy();
            // }, 0.5);
            //
            // AppNotification.emit(EventStatus.EVENT_PLANE_BOMB, {position:n.position, otherCollider:e.otherCollider});
            //
        }else if(otherName=='gameFloorCube_left<BoxCollider>'){
        }else if(otherName=='gameFloorCube_bottom<BoxCollider>'){
        }else if(otherName=='gameFloorCube_top<BoxCollider>'){
            //
            // AppNotification.emit(EventStatus.EVENT_HIT_SUN, {});
        }

    }
}


