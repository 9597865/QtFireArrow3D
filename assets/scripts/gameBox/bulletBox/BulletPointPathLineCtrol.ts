import { _decorator, Camera, Component, find, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { getPointsBetweenTwoPoints } from '../../qt_cocos_ts/utils/PointCalculator';
import { Player } from '../playerBox/Player';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
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
    //鼠标滑动的力度
    private _force:number = 0;
    start() {
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_START, this.onStageMouseStart, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_MOVE, this.onStageMouseMove, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_END, this.onStageMouseEnd, this);

        
        this.uiTransform = this.getComponent(UITransform);
        if(this.uiTransform){
            // console.log("BulletPointPathLineCtrol UITransform");
            // console.log(this.uiTransform);
        }

        this.cameraObj = find("Main Camera").getComponent(Camera) as Camera;
        this.player = find("GameMainBox/gameBox/playerBox/playerObject").getComponent(Player) as Player;
        

    }

    onStageMouseStart(data:any){
        // console.log("BulletPointPathLineCtrol onStageMouseStart");
        // this._force = 0;
    }
    onStageMouseMove(data:any){
        // console.log("BulletPointPathLineCtrol onStageMouseMove");
        //console.log(data.event.getLocation());
        //console.log(data.event.getUILocation());
        //console.log(this.player.node.getPosition());
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



        getPointsBetweenTwoPoints(p1,p2Local,10).forEach((v3:Vec3,index:number)=>{
            const scale:number = 0.05+0.1/(index+1);
            const p = instantiate(this.point);
            p.setPosition(v3);
            p.setScale(new Vec3(scale,scale,0.1));
            this.node.addChild(p);
            this.pointPathLineListArr.push(p);
        });


        let playerPos:Vec3 = p1.subtract(p2Local);
        const targetAngle = Math.atan2(playerPos.y, playerPos.x);
        let targetDegree = QtMath.radiansToDegrees(targetAngle) + 90;
        this.player.setGunAngle(targetDegree);

        //鼠标，触摸，力度为距离
        // console.log("BulletPointPathLineCtrol onStageMouseMove");
        // console.log(playerPos.length());
        this._force = Math.round(playerPos.length());

        
    }
    onStageMouseEnd(data:any){
        // console.log("BulletPointPathLineCtrol onStageMouseEnd");
        // this.node.removeAllChildren();

        AppNotification.emit(GamePlayerEvent.EVENT_PLYAYER_FIRE,{force:Math.round(this._force/18*100)/100});

        // this._force = 0;
        
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

