import { _decorator, Component, Node, SkeletalAnimation, SkeletalAnimationState, Animation, Socket } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
const { ccclass, property } = _decorator;

@ccclass('PlayerSkeletalAnimationControl')
export class PlayerSkeletalAnimationControl extends Component {

    private _skeletalAnimation: SkeletalAnimation | undefined;
    private _sockets: Array<Socket> = [];

    private _totalTime: number = 0;

    start() {
        //
        this._skeletalAnimation = this.node.getComponent(SkeletalAnimation);
        // this._sockets = this._skeletalAnimation?.getSockets() || [];
        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);
    
        // this._skeletalAnimation.on(Animation.EventType.STOP, this.onAnimationFinished, this);
        // console.log(this._skeletalAnimation);
    //    this._skeletalAnimation?.play("idle");  
    }

    gameTick(deltaTime: number) {
        this._totalTime += deltaTime;
        if (this._totalTime > 1) {

        }
    }
    onAnimationFinished(type:Animation.EventType, state:SkeletalAnimationState) {
        console.log("onAnimationFinished");
        console.log(type);
        this._skeletalAnimation?.play("angle_body"); 
    }
    fire() {
        console.log("fire");
        this._skeletalAnimation?.play("attack");
        setTimeout(() => {
            this._skeletalAnimation?.play("angle_body");
        },500);
    }
}

