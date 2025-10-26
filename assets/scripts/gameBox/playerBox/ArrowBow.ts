import { _decorator, Component, find, instantiate, Node, Prefab, resources, Vec3 } from 'cc';
import { PlayerWeapon } from './PlayerWeapon';
import { BulletObject } from '../bulletBox/BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
import { Player } from './Player';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { IPlayerSwipe } from '../interface/IPlayerSwipe';
const { ccclass, property } = _decorator;

@ccclass('ArrowBow')
export class ArrowBow extends PlayerWeapon implements IPlayerWeapon {
    private _bulletPrefab: Prefab;
    private _bulletLayerBox: Node;
    private _bulletPointPathLineBox: Node;
    //
    private _bulletParticleArr: Prefab[] = [];
    private _bulletLayerListArr: Node[] = [];
    //
    private _player: Player;
    private _totalTime:number = 0;

    constructor() {
        //
        super();
        this._bulletPointPathLineBox = find("GameMainBox/gameBox/bulletBox").getChildByName("bulletPointPathLineBox"); 
        this._bulletLayerBox = find("GameMainBox/gameBox/bulletBox").getChildByName("bulletLayerBox"); 
        
        // 动态加载预制体
        resources.load("bulletBox/bulletObject", Prefab, (err, prefab) => {
            if (err) {
                console.error('Failed to load prefab:', err);
                return;
            }
            this._bulletPrefab = prefab;
            // console.log('PlayerWeapon loaded:', this._bulletPrefab);
        });
    }
    gameTick(deltaTime: number) {
        super.gameTick(deltaTime);
        //
        this._totalTime += deltaTime;
        //
        for (const bullet of this._bulletLayerListArr) {
            const blt:Node = bullet as Node;
            const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
            if(bltObj.velocity!=Vec3.ZERO){
               bltObj.gameTick(deltaTime);
            }
        } 
        //
        this.destoryBullet(); 
    }

    destoryBullet(){
        if(Math.round(this._totalTime)%5==0){
            // console.log('========')
            //删除 跟踪 小炮弹
            if(this._bulletLayerListArr.length>0){
                this._bulletLayerListArr.forEach((child,index)=>{
                    let blt:Node = child as Node;
                    const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
                    // console.log(bltObj.node.active) 
                    // if( !bltObj.node.active || bltObj.velocity == Vec3.ZERO ){
                    if( !bltObj.node.active ){
                        bltObj.node.destroy();
                        this._bulletLayerListArr.splice(index,1);
                        blt = null;
                    }
                })
            }
        }
    }
    clear(): void {
        if(this._bulletLayerListArr.length<=0) return;
        this._bulletLayerBox.removeAllChildren();
        this._bulletLayerListArr = [];
        return;
    }
    // 重写攻击逻辑（发射子弹）
    attackTarget(data:Object): boolean {
        // console.log('ArrowBow attackTarget');
        const canAttack = super.attackTarget(data);
        if (canAttack) {
            this.spawnEffect(data); // 发射弓箭
        }
        return canAttack;
    }
    // 生成弓箭特效
    protected spawnEffect(data:any):void {
        const {force,weaponData} = data;
        let {damage,criticalChance}= weaponData.baseAttributes;
        let fireForce:number = 0.45*force;
        let fireAngle:number = this.player.getGunAngle()+90;
        // 实例化子弹并添加到子弹层
        const blt = instantiate(this._bulletPrefab);
        this._bulletLayerBox.addChild(blt);
        blt.setRotationFromEuler(0,0,this.player.getGunAngle()); // 设置子弹旋转角度
        // 获取子弹组件并设置子弹属性
        const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
        // const velocity = QtMath.convertSpeedAngleToVector3(0.2,this.player.getGunAngle()+90); // 计算子弹速度向量
        const velocity = QtMath.convertSpeedAngleToVector3(fireForce,fireAngle); // 计算子弹速度向量
        bltObj.name = 'bullet'; // 设置子弹名称
        bltObj.velocity = velocity; // 设置子弹速度
        bltObj.position = this.player.node.getPosition(); // 设置子弹初始位置
        bltObj.maxForce = 10;
        bltObj.maxSpeed = 1;
        bltObj.mass = 5;
        bltObj.skinObject = blt;
        bltObj.gravity = 0.98+(1-force);
        bltObj.bulletAttack = damage;
        //
        this._bulletLayerListArr.push(blt);
    }

    public set player(player: Player) {
        this._player = player;
    }
    public get player(): Player {
        return this._player;
    }
}

