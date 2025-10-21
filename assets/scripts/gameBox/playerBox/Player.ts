import { _decorator, Component, Node, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { BulletControl } from '../bulletBox/BulletControl';
import { EuipmentControl } from '../euipmentBox/EuipmentControl';
import { IBaseAttributes } from '../interface/IBaseAttributes';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { PlayerWeapon } from './PlayerWeapon';
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

    private _playerWeaponTool:IPlayerWeapon = null;
    private _playerWeapon: PlayerWeapon = null;

    gunObj: Node = null;

    start() {
        this.playerInit();
        this.setEvent();
    }

    playerInit(){

        this.gunObj = this.node.getChildByName('gunBox');


        this._playerWeapon = new PlayerWeapon;
        this._playerWeapon.player = this;
        
    }
    setEvent(){
        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);
    }
    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
       this._playerWeapon.gameTick(deltaTime);
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

    
    public fire(){
        console.log("player fire");
        //挂靠武器类型
        // this.euipmentCtl.
        if (!this._playerWeapon) return;
        const data = this.euipmentCtl.euipmentDataListMap.get('weapon');
        // this._playerWeapon.fire(data);
        this._playerWeapon.attackTarget(data);
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
}

