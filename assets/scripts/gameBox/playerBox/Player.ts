import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { BulletControl } from '../bulletBox/BulletControl';
import { EuipmentControl } from '../euipmentBox/EuipmentControl';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { PlayerWeapon } from './PlayerWeapon';
import { ArrowBow } from './ArrowBow';
import { ArrowBow2 } from './ArrowBow2';
import { IBaseAttributes } from '../interface/IBaseAttributes';
import { GameEvent } from '../events/GameEvent';
import { PlayerWeaponControl } from './PlayerWeaponControl';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component implements IBaseAttributes{

    @property(EuipmentControl)
    euipmentCtl: EuipmentControl = null;

    @property
    // 基础生命值
    private _hp: number = 100;
    @property
    // 基础魔法值
    private _mp: number = 100;
    @property
    // 基础攻击力
    private _attack: number = 10;
    @property
    // 基础防御力
    private _defense: number = 5;
    @property
    // 基础速度
    private _speed: number = 1;
    private _level: number = 1;
    //
    gunObj: Node = null;
    // 持握武器的节点（如手部骨骼）
    weaponHolder: Node = null;
    // 武器列表（预制体，在编辑器中拖入）
    weaponPrefabs: Node[] = []; // 存放剑、弓等武器预制体
    //
    
    //
    private _playerWeaponCtrl: PlayerWeaponControl = null;
    start() {
        this.playerInit();
        this.setEvent();
    }

    playerInit(){
        this.playerWeaponCtrl = this.addComponent(PlayerWeaponControl);
        this.playerWeaponCtrl.player = this;
        //
        this.gunObj = this.node.getChildByName('gunBox');
        //
    }
    setEvent(){
        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);
    }
    // 攻击输入处理
    
    gameTick(deltaTime: number) {
        if(!this.playerWeaponCtrl) return;
        this.playerWeaponCtrl.gameTick(deltaTime);
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

   // 装备武器（通过索引切换）
    
    public fire(receiveData:any){
        console.log("player fire");
        // console.log(receiveData.force);
        //挂靠武器类型
        if (!this.playerWeaponCtrl.currentWeapon) {
            console.log("this._currentWeapon is null");
            return
        };
        const weaponData = this.euipmentCtl.euipmentDataListMap.get('weapon');
        const data = {
            force:receiveData.force,
            weaponData, //武器数据
        }
        //
        this.playerWeaponCtrl.currentWeapon.attackTarget(data);
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

    public get hp(): number {
        return this._hp;
    }
    public get mp(): number {
        return this._mp;
    }
    public get attack(): number {
        return this._attack;
    }
    public get defense(): number {
        return this._defense;
    }
    public get speed(): number {
        return this._speed;
    }

    public set hp(value: number) {
        this._hp = value;
    }
    public set mp(value: number) {
        this._mp = value;
    }
    public set attack(value: number) {
        this._attack = value;
    }
    public set defense(value: number) {
        this._defense = value;
    }
    public set speed(value: number) {
        this._speed = value;
    }
    public get level(): number {
        return this._level;
    }
    public set level(value: number) {
        this._level = value;
    }

    public get playerWeaponCtrl(): PlayerWeaponControl {
        return this._playerWeaponCtrl;
    }
    public set playerWeaponCtrl(value: PlayerWeaponControl) {
        this._playerWeaponCtrl = value;
    }
}

