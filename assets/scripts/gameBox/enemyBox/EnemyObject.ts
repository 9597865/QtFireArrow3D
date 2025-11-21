import { _decorator, Component, instantiate, Node, ParticleSystem, Prefab, resources, tween, UIOpacity, Vec3 } from 'cc';
import { IBaseAttributes } from '../interface/IBaseAttributes';
import { QtUIBar } from '../animations/QtUiBar';
import { EnemyParticle_LevelUp } from './enemyAnimation/EnemyParticleLevelUp';
const { ccclass, property } = _decorator;

@ccclass('EnemyObject')
export class EnemyObject extends Component implements IBaseAttributes{
    private _hpTotal: number = 3;
    private _hp: number = 3;
    private _mp: number;
    private _attack: number;
    private _defense: number;
    private _speed: number;
    private _level: number;
    private _uiBar:QtUIBar;


    start() {
        this._name = 'enemy';


        const enemyPeople:Node = this.node.getChildByName('enemyPeople');
        // console.log('enemyPeople:', enemyPeople);
        enemyPeople.active = false;
        // this.node.active = false;
        this.uiBar.active = false;
        //
        resources.load("effect/levelUp/up", Prefab, (err, prefab) => {
            if (err) {
                console.error('Failed to load prefab:', err);
                return;
            }
            // this._bulletPrefab = prefab;
            // this.uiBar.del(); 
            // console.log("this.uiBar:",this.uiBar);

            /*
            const levelUpEffectNode:Node = instantiate(prefab);
            this.node.addChild(levelUpEffectNode);
            const lightUp01:Node = levelUpEffectNode.getChildByName('lightUp01');
            lightUp01.setScale(2.5, 2.5, 2.5);
            const ps:ParticleSystem = lightUp01.getComponent(ParticleSystem) as ParticleSystem;
            ps.play();
            ps.loop = true;
            // 自动销毁处理
            setTimeout(() => {
                levelUpEffectNode.destroy();
                ps.stop();
                enemyPeople.active = true;
            },1000);
            */

            //
            const levelUpPtObj:EnemyParticle_LevelUp = new EnemyParticle_LevelUp(prefab, this.node);
            levelUpPtObj.play('lightUp01',()=>{
                this.node.active = true;
                enemyPeople.active = true;
                this.uiBar.active = true;
            });


        });
    }

    fade(b:boolean){
        this.node.active = b;
        this.uiBar.active = b;
    }

    gameTick(deltaTime: number) {
        if(this.uiBar){
            this.uiBar.gameTick(deltaTime);
        }
    }

    /**
     * 处理角色受到伤害的方法
     * @param _damage 攻击方造成的伤害值
     */
    public beaten(_damage:number = 1){
        //
        // this.scaleNode(_damage) ;
        //-------------------------------
        this._hp -= _damage;
        //
        if(this._hp <= 0) this._hp = 0;
        if(this.uiBar) this.setBarPercent();

    }

    public setBarPercent(){
        if(this.uiBar){
            const per:number = Math.round(this._hp/this._hpTotal*100)/100;
            this.uiBar.setBarValue(per);
            console.log("beaten per:", per);
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
            if(this.uiBar) this.uiBar.del();
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

    public get hpTotal(): number {
        return this._hpTotal;
    }
    public set hpTotal(value: number) {
        this._hpTotal = value;
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

