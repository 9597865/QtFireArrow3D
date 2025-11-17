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

    private _uiTransform:UITransform = null;
    private _cameraObj:Camera = null;
    private _player:Player = null;

    private _firePointNode:Node = null;
    private _arrowSocketNode:Node = null;
    private _weaponNode:Node = null;
    // 
    private pointPathLineListArr:Node[] = [];
    //鼠标滑动的力度
    private _force:number = 0;
    start() {
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_START, this.onStageMouseStart, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_MOVE, this.onStageMouseMove, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_END, this.onStageMouseEnd, this);

        
        this._uiTransform = this.getComponent(UITransform);
        if(this._uiTransform){
            // console.log("BulletPointPathLineCtrol UITransform");
            // console.log(this.uiTransform);
        }

        this._cameraObj = find("Main Camera").getComponent(Camera) as Camera;
        this._player = find("GameMainBox/gameBox/playerBox/playerObject").getComponent(Player) as Player;
        
        let socketPath:string = "GameMainBox/gameBox/playerBox/playerObject/gunBox/QtFireManAngleBody/VIS_upper_arm_ik_pole.R Socket/";
        this._firePointNode = find(socketPath+"firePointBox");
        this._weaponNode = find(socketPath+"weaponBox");
        this._arrowSocketNode = find("GameMainBox/gameBox/playerBox/playerObject/gunBox/QtFireManAngleBody/rig/MCH-hand_ik.parent.R/hand_ik.R/MCH-upper_arm_ik_target.R");
        console.log("_arrowSocketNode", this._arrowSocketNode);
        console.log(this._arrowSocketNode.getPosition());
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
        if(!this._player){
            return;
        }
        // this._firePointNode.setPosition(this._arrowSocketNode.getPosition());
        this._firePointNode.removeAllChildren();
        //
        let p1:Vec3 = this._weaponNode.getPosition();
        // let p1:Vec3 = this._player.node.getPosition();
        // let p1:Vec3 = this._arrowSocketNode.getWorldPosition();
        p1.z = 0;
        let p2:Vec3 = this._cameraObj.screenToWorld(data.event.getLocation().toVec3()); // new Vec3(2,2,2);
        let p2Local:Vec3 = this._uiTransform.convertToNodeSpaceAR(p2);
        p2Local.z = 0;


        //计算出力度的百分比
        let percent:number = Math.round(this._force/18*100)/100;
        //总数为10个点
        let pointTotal:number = Math.min(percent,1)*10;
        // 百分比的1.5倍，为最终显示点数
        pointTotal = Math.min(Math.round(pointTotal*1.5),10);
        // console.log("BulletPointPathLineCtrol pointTotal",pointTotal);

        getPointsBetweenTwoPoints(p1,p2Local,pointTotal).forEach((v3:Vec3,index:number)=>{
            const scale:number = 0.05+0.1/(index+1);
            const p = instantiate(this.point);
            p.setPosition(v3.add(this._arrowSocketNode.getPosition()));
            p.setScale(new Vec3(scale,scale,0.1));
            this._firePointNode.addChild(p);
            this.pointPathLineListArr.push(p);
        });

        let playerPos:Vec3 = p1.subtract(p2Local);
        const targetAngle = Math.atan2(playerPos.y, playerPos.x);
        let targetDegree = QtMath.radiansToDegrees(targetAngle) + 90 + 20;
        //player角度
        this._player.setGunAngle(targetDegree);

        //鼠标，触摸，力度为距离
        let playerPosLength:number = Math.min(playerPos.length(),18);
        this._force = Math.round(playerPosLength);

        
    }
    /**
     * 处理鼠标在舞台上释放结束事件的回调函数
     * @param data - 事件携带的数据，类型为any
     */
    onStageMouseEnd(data:any){
        // 发射玩家开火事件通知，并传递计算后的力度值
        // 力度值经过标准化处理：原始力度除以18并保留两位小数
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

