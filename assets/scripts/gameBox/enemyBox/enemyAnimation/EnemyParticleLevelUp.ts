import { _decorator, Component, instantiate, Node, ParticleSystem, Prefab } from 'cc';
import { IParticleAnimation } from '../../interface/IParticleAnimation';
const { ccclass, property } = _decorator;

@ccclass('EnemyParticle_LevelUp')
export class EnemyParticle_LevelUp extends Component implements IParticleAnimation{

    private _particleFab:Prefab = null;
    private _particleParentBox:Node = null;
    
    private _particleNode:Node = null;
    // start() {}
    // update(deltaTime: number) {}
    constructor(fab:Prefab, parentBox:Node){
        super();
        this.particleFab = fab;
        this.particleParentBox = parentBox;

        if(this.particleFab && this.particleParentBox){
            this._particleNode = instantiate(this.particleFab);
            // particleNode.parent = this.particleParentBox;
            this.particleParentBox.addChild(this._particleNode);
        }
    }
    play(childPTName:string="lightUp01", playCallback: Function=null, ...args: any):void{
        if(!this._particleNode) return;
        if(args.length > 0){
            // playCallback = args[0];
        }
        // console.log("play");
        // console.log(args);
        const ptNode:Node = this._particleNode.getChildByName(childPTName);
        ptNode.setScale(2.5, 2.5, 2.5);
        const pt:ParticleSystem = ptNode.getComponent(ParticleSystem) as ParticleSystem;
        pt.play();
        pt.loop = true; 

        setTimeout(() => {
            this._particleNode.destroy();
            pt.stop();
            playCallback(ptNode,pt);
        },1000);
    }
    del():void{

    }

    public set particleFab(particleFab:Prefab){
        this._particleFab = particleFab;
    }
    public get particleFab():Prefab{
        return this._particleFab;
    }

    public set particleParentBox(parentBox:Node){
        this._particleParentBox = parentBox;
    }
    public get particleParentBox():Node{
        return this._particleParentBox;
    }
}

