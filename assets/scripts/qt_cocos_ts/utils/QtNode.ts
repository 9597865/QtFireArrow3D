import { _decorator, Animation, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('QtNode')
export class QtNode extends Animation {

    private _hide:boolean = true;

    
    public get hide(){
        
        return this._hide;
    }

    public set hide(_b:boolean){
        console.log('---------- 隐藏 set hide-----------')
        console.log(_b)
        if(_b){
            this.node.setPosition(new Vec3(0,-3000,0))
        }else {
            this.node.setPosition(new Vec3(0,0,0))
        }
        this._hide = _b
    }

    start() {

    }

    // update(deltaTime: number) {}
}

