import { _decorator, Animation, assetManager, AssetManager, Component, find, instantiate, Node, Prefab, resources, Vec3 } from 'cc';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { Player } from './Player';
import { BulletObject } from '../bulletBox/BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
const { ccclass, property } = _decorator;

@ccclass('PlyaerWeapon')
export class PlayerWeapon extends Component{
    // 攻击冷却计时器
    private _coolDownTimer = 0;

    attack = 10; // 攻击力
    attackRange = 1; // 攻击范围
    attackSpeed = 1; // 攻击间隔（秒）
    weaponName = "武器";

    // 武器节点（挂载碰撞体、模型等）
    weaponNode: Node = null;


    _fireAngleTargetBox: Node = null;
    _firePointBox: Node = null;
    _fireArrowBox: Node = null;

    async start() {
        // try {
        //     // 1. 加载 AssetBundle（包名：gameAssets）
        //     // 注意：远程包需传入完整 URL，本地包传入包名
        //     const bundle: AssetManager.Bundle = await assetManager.loadBundle('gameAssets');
        //     const prefab = await bundle.load('prefabs/MyPrefab', Prefab);
        //     // 3. 实例化
        //     // const node = instantiate(prefab);
        //     // this.node.addChild(node);

        //     // （可选）不需要时卸载资源（释放内存）
        //     // bundle.release('prefabs/MyPrefab');
        //     // AssetManager.releaseBundle(bundle); // 卸载整个包
        // } catch (err) {
        //     console.error('加载失败：', err);
        // }
        
    }

    constructor() {
        // console.log(' run SteeredVehicle constructor')
        super();
        // const bundle = new Promise<AssetManager.Bundle>((resolve, reject) => {
        // assetManager.loadBundle('gameAssets', (err, bundle) => console.log(bundle));
        // assetManager.loadBundle('gameAssets/bulletObject', (err, bundle) => console.log(bundle));
        
        this._fireAngleTargetBox = find('GameMainBox/gameBox/playerBox/playerWeapon/fireAngleTargetBox');
        this._fireArrowBox = find('GameMainBox/gameBox/playerBox/playerWeapon/fireArrowBox');
        this._firePointBox = this._fireAngleTargetBox.getChildByName('firePointBox'); 
    }

    gameTick(deltaTime: number) {

        // 更新冷却时间
        if (this._coolDownTimer > 0) {
            this._coolDownTimer -= deltaTime;
        }

        
    }
    
    /**
     * 通用攻击接口（子类必须实现）
     * @param data 攻击目标的数据对象
     * @returns 返回是否成功攻击
     */
    attackTarget(data:Object) {
        // 检查冷却时间，如果冷却时间大于0则无法攻击
        if (this._coolDownTimer > 0) return false; // 冷却中无法攻击
        // 重置冷却时间并播放攻击动画
        this._coolDownTimer = this.attackSpeed;
        this.playAttackAnim();
        
        // 实例化子弹并添加到子弹层
        // const blt = instantiate(this._bulletPrefab);
        // this._bulletLayerBox.addChild(blt);
        // blt.setRotationFromEuler(0,0,this.player.getGunAngle()); // 设置子弹旋转角度
        // // 获取子弹组件并设置子弹属性
        // const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
        // const velocity = QtMath.convertSpeedAngleToVector3(0.2,this.player.getGunAngle()+90); // 计算子弹速度向量
        // bltObj.name = 'bullet'; // 设置子弹名称
        // bltObj.velocity = velocity; // 设置子弹速度
        // bltObj.position = this.player.node.getPosition(); // 设置子弹初始位置
        // bltObj.maxForce = 10;
        // bltObj.maxSpeed = 1;
        // bltObj.mass = 5;
        // bltObj.skinObject = blt;
        // //
        // this._bulletLayerListArr.push(blt);

        return true;
    }
    
    // 播放攻击动画（子类可重写）
    protected playAttackAnim() {
        // const anim = this.player.getComponent(Animation);
        // anim?.play("attack");
    }

    // 武器特效（如剑气、子弹，子类实现）
    protected spawnEffect(data:Object) {}

    


    
}

