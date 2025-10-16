import { _decorator, Component, Node, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { BulletControl } from '../bulletBox/BulletControl';
import { EuipmentControl } from '../euipmentBox/EuipmentControl';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(EuipmentControl)
    euipment: EuipmentControl = null;

    gunObj: Node = null;

    start() {
        this.playerInit();
        this.setEvent()
    }

    playerInit(){
        this.gunObj = this.node.getChildByName('gunBox');
    }
    setEvent(){
        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);
    }
    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
        
    }

    onCollisionEnter(other: any, self: any) {
        console.log("collision");
    }

    onCollisionStay(other: any, self: any) {
        console.log("collision stay");
    }

    onCollisionExit(other: any, self: any) {
        console.log("collision exit");
    }
    public fire(){
        console.log("player fire");
        //挂靠武器类型

    }
    public settingPlayer(){
        // setTimeout(() => {
            // this.node.setRotationFromEuler(0, 0, 50);
        // },2000);
        this.gunObj.setRotationFromEuler(0, 0, -50);
    }

    public getGunPosition():Vec3{
        if (!this.gunObj) return;
        return this.gunObj.getPosition();
    }
    public getGunWorldPosition():Vec3{
        if (!this.gunObj) return;
        return this.gunObj.getWorldPosition();
    }
    public setGunAngle(angle: number){
        if (!this.gunObj) return;
        this.gunObj.setRotationFromEuler(0, 0, angle);
    }
    public getGunAngle(): number{
        if (!this.gunObj) return 0;
        return this.gunObj.eulerAngles.z;
    }
}

