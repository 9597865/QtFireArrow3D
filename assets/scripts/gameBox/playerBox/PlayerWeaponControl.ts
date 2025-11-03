import { _decorator, Component, EventKeyboard, KeyCode, Node } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GameEvent } from '../events/GameEvent';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { Player } from './Player';
import { ArrowBow } from './ArrowBow';
import { ArrowBow2 } from './ArrowBow2';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
const { ccclass, property } = _decorator;

@ccclass('PlayerWeaponControl')
export class PlayerWeaponControl extends Component {

    private _player: Player = null;
    // 当前装备的武器
    private _currentWeapon: IPlayerWeapon = null;
    start() {
        this.setEvent();
        this.equipWeapon(0);
    }
    setEvent(){
        console.log("PlayerWeaponControl setEvent");
        //监听 键盘按下事件
        AppNotification.on(GameEvent.EVENT_GAME_KEY_DOWN, this.stageOnKeyDown, this); 
        //
        AppNotification.on(GamePlayerEvent.Player_Change_Bullet, this.changeBulletHandler, this);
    }
    // update(deltaTime: number) {}
    gameTick(deltaTime: number) {
        // if(!this._currentWeapon) return;
        this._currentWeapon.gameTick(deltaTime);
    }
    stageOnKeyDown(data: any) {
        const e: EventKeyboard = data.event;
        if (e.keyCode === KeyCode.KEY_J ) {
            // 假设目标是距离最近的敌人（实际需通过检测获取）
            // const target = this.findNearestEnemy();
            // this._currentWeapon.attackTarget(target);
        }
        // 按数字键1、2切换武器
        if (e.keyCode === KeyCode.NUM_0){
            this.equipWeapon(0);
        }
        //
        if (e.keyCode === KeyCode.NUM_1){
            //const arrowBowObject = new ArrowBow();
            this.equipWeapon(1);
        }
        if (e.keyCode === KeyCode.NUM_2){
            
        }
    }
    equipWeapon(index: number) {
        // 销毁当前武器
        if (this._currentWeapon) {
            this._currentWeapon.clear();
            this._currentWeapon = null;
        }
        switch (index) {
            // 根据索引选择武器
            case 0:
                this._currentWeapon = new ArrowBow;
                break;
            case 1:
                this._currentWeapon = new ArrowBow2;
                break;
            case 2:
                // this._currentWeapon = new Staff;
                break;
        }
        
        this._currentWeapon.player = this.player;

        console.log('装备武器：', index);
        // 实例化新武器
        // const weaponNode = instantiate(this.weaponPrefabs[index]);
        // this._currentWeapon = weaponNode.getComponent(Weapon);
        // this._currentWeapon?.init(this.weaponHolder); // 挂载到持握节点
    }
    /**
     * 更换子弹的处理函数
     * @param data 包含武器ID的数据对象
     */
    changeBulletHandler(data: any) {
        // 从数据对象中解构出武器ID
        const {weaponId} = data;
        // 调用装备武器方法，传入武器ID
        this.equipWeapon(weaponId);
    }
    public get currentWeapon() {
        return this._currentWeapon;
    }
    public set currentWeapon(value: IPlayerWeapon) {
        this._currentWeapon = value;
    }

    public get player() {
        return this._player;
    }
    public set player(value: Player) {
        this._player = value;
    }
}

