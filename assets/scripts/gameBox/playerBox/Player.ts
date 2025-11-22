import { _decorator, Component, find, Node, SkeletalAnimation, Vec3 } from 'cc';
import { AppNotification } from '../../qt_cocos_ts/event/AppNotification';
import { GamePlayerEvent } from '../events/GamePlayerEvent';
import { EuipmentControl } from '../euipmentBox/EuipmentControl';
import { IBaseAttributes } from '../interface/IBaseAttributes';
import { PlayerWeaponControl } from './PlayerWeaponControl';
import { GameAnimationEvent } from '../events/GameAnimationEvent';
import { GameMainControl } from '../GameMainControl';
import { GameStatusEvent } from '../events/GameStatusEvent';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component implements IBaseAttributes{

    @property(EuipmentControl)
    euipmentCtl: EuipmentControl = null;

    @property
    private _hp: number = 100;
    @property
    private _mp: number = 100;
    @property
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
    private _playerWeaponCtrl: PlayerWeaponControl = null;

    private _playerAnimationBox:Node = null;
    private _playerWeaponBox:Node = null;
    private _playerObjectBox:Node = null;

    start() {
        this.playerInit();
        this.setEvent();
    }

    playerInit(){

        this.playerWeaponCtrl = this.addComponent(PlayerWeaponControl);
        this.playerWeaponCtrl.player = this;
        //
        let playerPathStr:string = "GameMainBox/gameBox/playerBox/";
        this.gunObj = find(playerPathStr+"playerObject/gunBox");
        //
        this._playerAnimationBox = find(playerPathStr+"playerAnimationBox");
        this._playerWeaponBox = find(playerPathStr+"playerWeapon");
        this._playerObjectBox = find(playerPathStr+"playerObject");

        this.hideAll();

        this._playerAnimationBox.active = true;

        setTimeout(() => {
            //playing
            GameMainControl.currentStatus = GameStatusEvent.STATUS_PLAYING;
            this.hideAll();
            this._playerWeaponBox.active = true;
            this._playerObjectBox.active = true;
            // console.log("playerAnimationBox is hide");
        }, 1000);

    }
    setEvent(){
        //监听玩家开火
        AppNotification.on(GamePlayerEvent.EVENT_PLYAYER_FIRE, this.fire, this);
        //监听动画开始
        AppNotification.on(GameAnimationEvent.ANIMATION_EVENT_START, this.getAnimationStatus, this);
    }

    hideAll(b:boolean=false){
        this._playerAnimationBox.active = b;
        this._playerWeaponBox.active = b;
        this._playerObjectBox.active = b;
    }
    
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
        if (GameMainControl.currentStatus != GameStatusEvent.STATUS_PLAYING) return;
        if (!this.playerWeaponCtrl.currentWeapon) return;
        const weaponData = this.euipmentCtl.euipmentDataListMap.get('weapon');
        const data = {
            force:receiveData.force,
            weaponData, //武器数据
        }
        //
        this.playerWeaponCtrl.currentWeapon.attackTarget(data);
    }

    getAnimationStatus(receiveData:any){
        console.log("getAnimationStatus",receiveData.statusId);
        this.playAnimation(receiveData.statusId);
    }
    public playAnimation(statusId:number=1){
        this.hideAll();
        let skAnimation = this._playerAnimationBox.getComponentInChildren(SkeletalAnimation);
        skAnimation?.stop();
        // 
        GameMainControl.currentStatus = GameStatusEvent.STATUS_IDLE;
        if(statusId == 1){
            GameMainControl.currentStatus = GameStatusEvent.STATUS_PLAYING;
            this._playerWeaponBox.active = true;
            this._playerObjectBox.active = true;
        }else if(statusId == 2 ){
            this._playerAnimationBox.active = true;
            skAnimation?.crossFade("run");
        }else if(statusId == 3 ){
            this._playerAnimationBox.active = true;
            skAnimation?.crossFade("walk");
        }
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

