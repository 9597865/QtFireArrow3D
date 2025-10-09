import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    gunObj: Node = null;

    start() {
        // this.settingPlayer();
        // console.log(this.node.eulerAngles);

        this.gunObj = this.node.getChildByName('gunBox');
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

