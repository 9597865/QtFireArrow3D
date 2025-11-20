import { _decorator, Camera, Component, EventKeyboard, EventTouch, find, input, Input, Node, tween, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { GameAnimationEvent } from '../events/GameAnimationEvent';
const { ccclass, property } = _decorator;

@ccclass('stageUi2d')
export class stageUi2d extends Component {

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
        
    }

    onEnable () {

        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

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
    }

    
    
    onDisable () {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onKeyUp(e: EventKeyboard) {
        AppNotification.emit(GameEvent.EVENT_GAME_KEY_UP, {event:e}); 
    }
    onKeyDown(e: EventKeyboard) {
        AppNotification.emit(GameEvent.EVENT_GAME_KEY_DOWN, {event:e}); 
    }

    cameraSet3d(){
        this.mainCamera.projection = Camera.ProjectionType.PERSPECTIVE;
        this.mainCamera.fov = 60;
        // this.mainCamera.node.setPosition(-14,0,10);
        // this.mainCamera.node.setRotationFromEuler(0,-50,0);

        tween(this.mainCamera.node)
        .to(1,{
            position:new Vec3(-14,0,10),
            eulerAngles:new Vec3(0,-50,0)
        })
        .start();

    }
    cameraSet2d(){
        this.mainCamera.projection = Camera.ProjectionType.ORTHO;
        this.mainCamera.fov = 5;
        // this.mainCamera.node.setPosition(0,0,10);
        // this.mainCamera.node.setRotationFromEuler(0,0,0);

        tween(this.mainCamera.node)
        .to(1,{
            position:new Vec3(0,0,10),
            eulerAngles:new Vec3(0,0,0)
        })
        .start();
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
    onBtn3(){
        // console.log("btn click3");
        AppNotification.emit(GamePlayerEvent.Player_Change_Bullet, {weaponId:1,eqName:"wooden_sword"});  
    }
    onBtn4(){
        // console.log("btn click4");
        const randomFloat = Math.round(Math.random() * (3 - 1)) + 1;
        AppNotification.emit(GameAnimationEvent.ANIMATION_EVENT_START, {statusId:randomFloat});  
    }
}

