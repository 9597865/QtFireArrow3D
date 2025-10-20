import { _decorator, assetManager, AssetManager, Component, find, instantiate, Node, Prefab, resources } from 'cc';
import { IPlayerWeapon } from '../interface/IPlayerWeapon';
import { Player } from './Player';
const { ccclass, property } = _decorator;

@ccclass('PlyaerWeapon')
export class PlayerWeapon extends Component implements IPlayerWeapon{

    private _player: Player;

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
        // 动态加载预制体
        resources.load("bulletBox/bulletObject", Prefab, (err, prefab) => {
            if (err) {
                console.error('Failed to load prefab:', err);
                return;
            }
            const pointPathLineBox = find("GameMainBox/gameBox/bulletBox").getChildByName("bulletPointPathLineBox"); 
            console.log('prefab loaded:', prefab);
            console.log('pointPathLineBox:', pointPathLineBox);
            // const newNode = instantiate(prefab); // 实例化预制体
            // this.node.addChild(newNode); // 添加到当前节点
            // newNode.setPosition(0, 0, 0); // 设置位置
        });
        
        // });
    }

    update(deltaTime: number) {
        
    }

    
    fire(data) {
        // TODO: fire
        console.log('PlyaerWeapon fire========');
        console.log(data);
        console.log(this.player);
        
    }


    public set player(player: Player) {
        this._player = player;
    }
    public get player(): Player {
        return this._player;
    }
}

