import { _decorator, Component, Node, Vec3 } from 'cc';
import { IBaseAttributes } from '../interface/IBaseAttributes';
import { QtUIBar } from '../animations/QtUiBar';
const { ccclass, property } = _decorator;

@ccclass('EnemyObject')
export class EnemyObject extends Component implements IBaseAttributes{
    _hp: number = 3;
    _mp: number;
    _attack: number;
    _defense: number;
    _speed: number;
    _level: number;

    _uiBar:QtUIBar;
    start() {
        this._name = 'enemy';
    }

    gameTick(deltaTime: number) {
   
    }

    /**
     * 处理角色受到伤害的方法
     * @param _damage 攻击方造成的伤害值
     */
    public beaten(_damage:number = 1){
        //
        this.scaleNode(_damage) ;
        //-------------------------------
        this._hp -= _damage;
        //
        if(this._hp <= 0){
           this._hp = 0;
        }
    }
    private scaleNode(_damage:number){
        let scaleNumBig:number = 1.2;
        let scaleNumSmall:number = 1.02;
        let scaleNum:number = 1;
        if(_damage>1 || this._hp==1){
            this.node.setScale(scaleNumBig, scaleNumBig, scaleNumBig);
        }else{
            this.node.setScale(scaleNumSmall, scaleNumSmall, scaleNumSmall);
        }
        setTimeout(() => {
            this.node.setScale(scaleNum, scaleNum, scaleNum);
        }, 100);
    }
    public del(){
        if(this.node) {
            this.node.destroy();
            console.log("del this.node", this.node);
        }
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

    public get uiBar(): QtUIBar {
        return this._uiBar;
    }
    public set uiBar(value: QtUIBar) {
        this._uiBar = value;
    }
}

