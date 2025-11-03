import { Prefab } from "cc";

export interface IParticleAnimation{
    // attackTarget<T>(data:T):void,
    particleFab:Prefab,
    particleParentBox:any,
    // init(fab:Prefab, parentBox:any):void,
    play(childPTName:string,playCallback: Function, ...args: any):void,
    del():void,
}