import { _decorator, Camera, Component, EventTouch, find, input, Input, Node, Vec3 } from 'cc';
import { Player } from './playerBox/Player';
import { EnemyObject } from './enemyBox/EnemyObject';
import { QtMath } from '../qt_cocos_ts/utils/QtMath';
import { BulletControl } from './bulletBox/BulletControl';
import { BulletPointPathLineCtrol } from './bulletBox/BulletPointPathLineCtrol';
import { AppNotification } from '../qt_cocos_ts/event/AppNotification';
import { GameEvent } from './events/GameEvent';
import { EnemyControl } from './enemyBox/EnemyControl';
const { ccclass, property } = _decorator;

@ccclass('GameMainControl')
export class GameMainControl extends Component {

    @property(Player)
    player: Player = null;

    @property(EnemyControl)
    enemyCtrl: EnemyControl = null;

    @property(BulletControl)
    bulletCtrl: BulletControl = null;
    
    private mainCamera:Camera = null;
    private enemyBox:Node = null;
    private pointPathLineBox:Node = null;

    start() {
        this.mainCamera = find("Main Camera").getComponent(Camera) as Camera;  
        this.pointPathLineBox = find("GameMainBox/gameBox/bulletBox").getChildByName("bulletPointPathLineBox"); // this.node.getChildByName("bulletPointPathLineBox");
        // let pointPathObject = this.pointPathLineBox.getComponent("BulletPointPathLineCtrol");
        this.enemyBox = find("GameMainBox/gameBox/enemyBox"); // this.node.getChildByName("enemyBox");
    }

    update(deltaTime: number) {
        this.player.gameTick(deltaTime);
        this.bulletCtrl.gameTick(deltaTime);
        this.enemyCtrl.gameTick(deltaTime);
        // this.pointPathLineBox.getComponent(BulletPointPathLineCtrol).gameTick(deltaTime);
        /*
        // 计算炮口到目标的方向向量
        const playerGunPos:Vec3 = this.player.getGunPosition();
        const enemyPos:Vec3 = this.enemy.node.getPosition();
        const direction:Vec3 = enemyPos.subtract(playerGunPos);
        if (direction.length() < 1) return; // 目标过近时不旋转
        direction.normalize();
        // 计算目标角度（弧度）
        const targetAngle = Math.atan2(direction.y, direction.x);
        let targetDegree = QtMath.radiansToDegrees(targetAngle);
        let angle = Math.floor(targetDegree)+270;
        this.player.setGunAngle(angle);
        */
        

    }
    onEnable () {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        // console.log("onTouchStart");
        // console.log(event.getLocation());  // Location on screen space
        // console.log(event.getUILocation());  // Location on UI space

        AppNotification.emit(GameEvent.EVENT_STAGE_MOUSE_START, {event});
    }
    onTouchMove(event: EventTouch) {
        // console.log(event.getLocation());  // Location on screen space
        // console.log(event.getUILocation());  // Location on UI space
        // console.log(event.getLocation()); 
        AppNotification.emit(GameEvent.EVENT_STAGE_MOUSE_MOVE, {event});


    }
    onTouchEnd(event: EventTouch) {
        // console.log(event.getLocation());  // Location on screen space
        // console.log(event.getUILocation());  // Location on UI space
        
        AppNotification.emit(GameEvent.EVENT_STAGE_MOUSE_END, {event});
        // console.log("onTouchEnd");

        // this.bulletCtrl.fire(this.player);
        
        this.cameraSet3d();
    }
    
    onDisable () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    
    cameraSet3d(){
        this.mainCamera.projection = Camera.ProjectionType.PERSPECTIVE;
        this.mainCamera.fov = 60;
        this.mainCamera.node.setPosition(-14,0,10);
        this.mainCamera.node.setRotationFromEuler(0,-50,0);
    }
    cameraSet2d(){
        this.mainCamera.projection = Camera.ProjectionType.ORTHO;
        this.mainCamera.fov = 5;
        this.mainCamera.node.setPosition(0,0,10);
        this.mainCamera.node.setRotationFromEuler(0,0,0);
    }
    onBtn(){
        // console.log("btn click");
        //this.player.settingPlayer();
        // this.enemy.node.setPosition(this.enemy.node.getPosition().x, QtMath.randomInt(5,9), 0);
        // this.mainCamera.projection === Camera.ProjectionType.PERSPECTIVE ? Camera.ProjectionType.ORTHOGRAPHIC : Camera.ProjectionType.PERSPECTIVE;
        this.cameraSet3d();
    }
    onBtn2(){
        // console.log("btn click2");
        //开火
        // this.player.fire();
        // this.bulletCtrl.fire(this.player);
        this.cameraSet2d();
    }
}

