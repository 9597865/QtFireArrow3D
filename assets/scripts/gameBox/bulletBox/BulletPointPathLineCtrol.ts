import { _decorator, Camera, Component, find, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { getPointsBetweenTwoPoints } from '../../qt_cocos_ts/utils/PointCalculator';
import { Player } from '../playerBox/Player';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
const { ccclass, property } = _decorator;

@ccclass('BulletPointPathLineCtrol')
export class BulletPointPathLineCtrol extends Component {
    @property(Prefab)
    point:Prefab = null;

    private uiTransform:UITransform = null;
    private cameraObj:Camera = null;
    private player:Player = null;
    // 
    private pointPathLineListArr:Node[] = [];
    start() {
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_START, this.onStageMouseStart, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_MOVE, this.onStageMouseMove, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_END, this.onStageMouseEnd, this);

        // const p = instantiate(this.point);
        // p.setPosition(v3.position);
        // p.setPosition(new Vec3(0,0,0));
        // this.node.addChild(p);
        // this.pointPathLineListArr.push(p);
        this.uiTransform = this.getComponent(UITransform);
        if(this.uiTransform){
            console.log("BulletPointPathLineCtrol UITransform");
            console.log(this.uiTransform);
        }

        this.cameraObj = find("Main Camera").getComponent(Camera) as Camera;
        console.log("BulletPointPathLineCtrol cameraObj");
        console.log(this.cameraObj);
        this.player = find("GameMainBox/gameBox/playerBox/playerObject").getComponent(Player) as Player;
        console.log("BulletPointPathLineCtrol player");
        console.log(this.player);
        

    }

    onStageMouseStart(data:any){
        console.log("BulletPointPathLineCtrol onStageMouseStart");
    }
    onStageMouseMove(data:any){
        console.log("BulletPointPathLineCtrol onStageMouseMove");
        // console.log(data.event.getLocation());
        //console.log(data.event.getUILocation());
        // console.log(this.player.node.getPosition());
        if(!this.player){
            return;
        }
        this.node.removeAllChildren();
        //
        let p1:Vec3 = this.player.node.getPosition();
        p1.z = 0;
        let p2:Vec3 = this.cameraObj.screenToWorld(data.event.getLocation().toVec3()); // new Vec3(2,2,2);
        let p2Local:Vec3 = this.uiTransform.convertToNodeSpaceAR(p2);
        p2Local.z = 0;

        
        

        getPointsBetweenTwoPoints(p1,p2Local,10).forEach((v3:Vec3)=>{
            const p = instantiate(this.point);
            p.setPosition(v3);
            p.setScale(new Vec3(0.1,0.1,0.1));
            this.node.addChild(p);
            this.pointPathLineListArr.push(p);
        });


        let playerPos:Vec3 = p1.subtract(p2Local);
        const targetAngle = Math.atan2(playerPos.y, playerPos.x);
        let targetDegree = QtMath.radiansToDegrees(targetAngle) + 90;
        this.player.setGunAngle(targetDegree);
        
    }
    onStageMouseEnd(data:any){
        console.log("BulletPointPathLineCtrol onStageMouseEnd");
        // this.node.removeAllChildren();
    }

    update(deltaTime: number) {
        
    }

    public addPoint(v3:Node){
        const p = instantiate(this.point);
        p.setPosition(v3.position);
        this.node.addChild(p);
        this.pointPathLineListArr.push(p);
    }

    public clearPoint(){
        for (const p of this.pointPathLineListArr) {
            const n:Node = p as Node;
            if(n.isValid){
                n.removeFromParent();
                n.destroy();
            }
        }
        this.pointPathLineListArr = [];
    }
}

