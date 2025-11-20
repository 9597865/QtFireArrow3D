import { _decorator, Camera, Component, EventTouch, find, input, Input, Node, Vec3 } from 'cc';
import { Player } from './playerBox/Player';
import { EnemyObject } from './enemyBox/EnemyObject';
import { QtMath } from '../qt_cocos_ts/utils/QtMath';
import { BulletControl } from './bulletBox/BulletControl';
import { BulletPointPathLineCtrol } from './bulletBox/BulletPointPathLineCtrol';
import { AppNotification } from '../qt_cocos_ts/event/AppNotification';
import { GameEvent } from './events/GameEvent';
import { EnemyControl } from './enemyBox/EnemyControl';
import { GameStatusEvent } from './events/GameStatusEvent';
const { ccclass, property } = _decorator;

@ccclass('GameMainControl')
export class GameMainControl extends Component {

    @property(Player)
    player: Player = null;

    @property(EnemyControl)
    enemyCtrl: EnemyControl = null;

    @property(BulletControl)
    bulletCtrl: BulletControl = null;
    
    public static currentStatus:GameStatusEvent = GameStatusEvent.STATUS_LOADING;

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
    
}

