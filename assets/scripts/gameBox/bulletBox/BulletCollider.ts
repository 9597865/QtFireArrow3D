import { _decorator, ColliderComponent, Component, ICollisionEvent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletCollider')
export class BulletCollider extends Component {
    start() {
         // 注册碰撞事件
        let collider = this.getComponent(ColliderComponent);
        console.log(collider);
        // if (collider) {
            // collider.on(ContactTiype.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on('onCollisionEnter', this.onCollisionEnter, this);
            collider.on('onCollisionStay', this.onCollisionStay, this);
            collider.on('onCollisionExit', this.onCollisionExit, this);
        // }   
    }

    update(deltaTime: number) {
        
    }
    
    private onCollisionStay(e: ICollisionEvent){}
    private onCollisionExit (e: ICollisionEvent){}
    private onCollisionEnter (e: ICollisionEvent){
        // console.log('e.otherCollider.tag');
        // console.log('---'+e.otherCollider.name);
        // console.log(e.otherCollider.node.parent);
        const otherName = e.otherCollider.name;
        console.log('bulletFab<BoxCollider>----',otherName);
        if(
            otherName == 'bulletFab<BoxCollider>'
        ){
            const n = e.otherCollider.node;
            //active 作为标记
            n.active = false;
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
        }else if(otherName=='sunLowMesh<BoxCollider>'){
            //
            // AppNotification.emit(EventStatus.EVENT_HIT_SUN, {});
        }

    }
}


