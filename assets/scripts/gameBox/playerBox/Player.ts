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
    // 当前装备的武器
    private _currentWeapon: IPlayerWeapon = null;
    start() {
        this.playerInit();
        this.setEvent();
    }

    playerInit(){

        this.gunObj = this.node.getChildByName('gunBox');
        //
        this.equipWeapon(0);
        
    }
    setEvent(){

        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);

        // 监听攻击输入
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    // 攻击输入处理
    onKeyDown(e: EventKeyboard) {
        if (e.keyCode === KeyCode.KEY_J && this._currentWeapon) {
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
    }
    gameTick(deltaTime: number) {
        // if(!this._currentWeapon) return;
        this._currentWeapon.gameTick(deltaTime);
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
        this._currentWeapon.player = this;

        console.log('装备武器：', index);
        // 实例化新武器
        // const weaponNode = instantiate(this.weaponPrefabs[index]);
        // this._currentWeapon = weaponNode.getComponent(Weapon);
        // this._currentWeapon?.init(this.weaponHolder); // 挂载到持握节点
    } 
    public fire(receiveData:any){
        console.log("player fire");
        // console.log(receiveData.force);
        //挂靠武器类型
        if (!this._currentWeapon) {
            console.log("this._currentWeapon is null");
            return
        };
        const weaponData = this.euipmentCtl.euipmentDataListMap.get('weapon');
        const data = {
            force:receiveData.force,
            weaponData, //武器数据
        }
        //
        this._currentWeapon.attackTarget(data);
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
}

