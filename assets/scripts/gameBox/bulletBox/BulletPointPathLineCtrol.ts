import { _decorator, Camera, Component, find, instantiate, Node, Prefab, tween, UITransform, Vec2, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { getPointsBetweenTwoPoints } from '../../qt_cocos_ts/utils/PointCalculator';
import { Player } from '../playerBox/Player';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { GameMainControl } from '../GameMainControl';
import { GameStatusEvent } from '../events/GameStatusEvent';
const { ccclass, property } = _decorator;

@ccclass('BulletPointPathLineCtrol')
export class BulletPointPathLineCtrol extends Component {
    @property(Prefab)
    point:Prefab = null;

    private _coolDownTimer = 0;
    private _uiTransform:UITransform = null;
    private _cameraObj:Camera = null;
    private _player:Player = null;

    

    private _firePointNode:Node = null;
    private _fireArrowBox:Node = null;
    private _weaponNode:Node = null;
    private _fireAngleTargetBox:Node = null;
    // 
    private pointPathLineListArr:Node[] = [];
    //鼠标滑动的力度
    private _force:number = 0;
    start() {
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_START, this.onStageMouseStart, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_MOVE, this.onStageMouseMove, this);
        AppNotification.on(GameEvent.EVENT_STAGE_MOUSE_END, this.onStageMouseEnd, this);

        this._uiTransform = this.getComponent(UITransform);
        // if(this._uiTransform){}
        this._cameraObj = find("Main Camera").getComponent(Camera) as Camera;
        this._player = find("GameMainBox/gameBox/playerBox/playerObject").getComponent(Player) as Player;
        // 
        let socketPath:string = "GameMainBox/gameBox/playerBox/playerObject/gunBox/QtFireManAngleBody/VIS_upper_arm_ik_pole.R Socket/";
        this._weaponNode = find(socketPath+"weaponBox");
        //
        this._fireAngleTargetBox = find('GameMainBox/gameBox/playerBox/playerWeapon/fireAngleTargetBox');
        this._fireArrowBox = find('GameMainBox/gameBox/playerBox/playerWeapon/fireArrowBox');
        this._firePointNode = this._fireAngleTargetBox.getChildByName("firePointBox");
        
        this.createPointLine();
        
    }
    
    pointPathLine(data:any){
        this._firePointNode.removeAllChildren();
        //
        let p1:Vec3 = this._weaponNode.getPosition();
        // let p1:Vec3 = this._player.node.getPosition();
        // let p1:Vec3 = this._handArrow.getWorldPosition();
        p1.z = 0;
        let p2:Vec3 = this._cameraObj.screenToWorld(data.event.getLocation().toVec3()); // new Vec3(2,2,2);
        let p2Local:Vec3 = this._uiTransform.convertToNodeSpaceAR(p2);
        p2Local.z = 0;

        //计算出力度的百分比
        let percent:number = Math.round(this._force/18*100)/100;
        //总数为10个点
        let pointTotal:number = Math.min(percent,1)*10;
        // 百分比的1.5倍，为最终显示点数
        pointTotal = Math.min(Math.round(pointTotal*1.5),6);
        //

        getPointsBetweenTwoPoints(p1,p2Local,pointTotal).forEach((v3:Vec3,index:number)=>{
            const scale:number = 0.02+0.1/(index+1);
            const p = instantiate(this.point);
            p.setPosition(v3);
            p.setScale(new Vec3(scale,scale,0.1));
            this._firePointNode.addChild(p);
            this.pointPathLineListArr.push(p);
        });

        let playerPos:Vec3 = p1.subtract(p2Local);
        const targetAngle = Math.atan2(playerPos.y, playerPos.x);
        let targetDegree = QtMath.radiansToDegrees(targetAngle) + 90;
        // let targetDegree = targetAngle;
        //player角度
        this._player.setGunAngle(targetDegree);

        

        //鼠标，触摸，力度为距离
        let playerPosLength:number = Math.min(playerPos.length(),18);
        this._force = Math.round(playerPosLength);
    }
    createPointLine(totalPoint:number = 15){
        //
        this._firePointNode.removeAllChildren();
        this._firePointNode.setRotationFromEuler(0,0,60);
        //
        for(let i = 0; i < totalPoint; i++){
            const arrowPos:Vec3 = this._firePointNode.getPosition();
            const step:number = 0.005+i*0.2;
            const scale:number = 0.018+0.08/i;
            const p = instantiate(this.point);
            const posY:number = -Math.pow(i*(20-totalPoint)/100*(20-totalPoint)/20,2);
            const v3 = arrowPos.add(new Vec3(1+step,posY,0));
            p.setPosition(v3);
            p.setScale(new Vec3(scale,scale,scale));
            // tween(p).to(0.2, { opacity: 0 }).start();
            this._firePointNode.addChild(p);
        }

    }
    onStageMouseStart(data:any){
        // console.log("BulletPointPathLineCtrol onStageMouseStart");
        // this._force = 0;
        
    }
    onStageMouseMove(data:any){
        //console.log("BulletPointPathLineCtrol onStageMouseMove");
        //console.log(data.event.getLocation());
        //console.log(data.event.getUILocation());
        //console.log(this.player.node.getPosition());
        if(!this._player){
            return;
        }
        if (GameMainControl.currentStatus == GameStatusEvent.STATUS_PLAYING){
            let p1:Vec3 = this._player.node.getPosition();
            p1.z = 0;
            let p2:Vec3 = this._cameraObj.screenToWorld(data.event.getLocation().toVec3());
            let p2Local:Vec3 = this._uiTransform.convertToNodeSpaceAR(p2);
            p2Local.z = 0;
        
            //计算出力度的百分比
            let percent:number = Math.round(this._force/18*100)/100;
            //总数为10个点
            let pointTotal:number = Math.min(percent,1)*10;
            // 百分比的1.5倍，为最终显示点数
            pointTotal = Math.min(Math.round(pointTotal*1.5),12);
            //---------------------------------------
            let playerPos:Vec3 = p1.subtract(p2Local);
            const targetAngle = Math.atan2(playerPos.y, playerPos.x);
            let deg = QtMath.radiansToDegrees(targetAngle) + 120;
            //
            let n = (deg + 360)%360;
            if(n>= 260 && n <= 355){
                //player角度
                this._player.setGunAngle(n);
                this._fireAngleTargetBox.setRotationFromEuler(0,0,n);
                this._fireArrowBox.setRotationFromEuler(0,0,n);
                console.log("BulletPointPathLineCtrol onStageMouseMove",n);
            }
            //
            this.createPointLine(pointTotal);
            //
            //鼠标，触摸，力度为距离
            let playerPosLength:number = Math.min(playerPos.length(),18);
            this._force = Math.round(playerPosLength);
        }
    }
    /**
     * 处理鼠标在舞台上释放结束事件的回调函数
     * @param data - 事件携带的数据，类型为any
     */
    onStageMouseEnd(data:any){

        if (this._coolDownTimer > 0) return false; // 冷却中无法攻击
        // 重置冷却时间并播放攻击动画
        this._coolDownTimer = 1;

        if (GameMainControl.currentStatus == GameStatusEvent.STATUS_PLAYING){
            // 发射玩家开火事件通知，并传递计算后的力度值
            // 力度值经过标准化处理：原始力度除以18并保留两位小数
            AppNotification.emit(GamePlayerEvent.EVENT_PLYAYER_FIRE,{force:Math.round(this._force/18*100)/100});
            // this._force = 0;
            // 隐藏开火角度
            this._fireAngleTargetBox.active = false;
            setTimeout(()=>{this._fireAngleTargetBox.active = true;},500);
        }
    }

    protected update(deltaTime: number): void {
        // 更新冷却时间
        if (this._coolDownTimer > 0) {
            this._coolDownTimer -= deltaTime;
        }
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

