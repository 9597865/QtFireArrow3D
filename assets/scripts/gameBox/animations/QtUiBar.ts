import { _decorator, Camera, Component, find, instantiate, Node, Prefab, Sprite, UIOpacity, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('QtUIBar')
export class QtUIBar extends Component {

    mainCamera: Camera = null;
    uiCamera: Camera = null;

    private spriteBg:Sprite = null;
    private spriteBar:Sprite = null;
    private barValue: number = 0;

    private _fab:Prefab = null;

    public get fab():Prefab{
        return this._fab;
    }
    public set fab(value:Prefab){
        this._fab = value;
    }

    start() {
        console.log('QtUIBloodBar start');
        // console.log(this.mainCamera);
    }
    constructor() {
        super();
        this.uiCamera = find("GameMainBox/Canvas/Camera").getComponent(Camera) as Camera; 
        this.mainCamera = find("Main Camera").getComponent(Camera) as Camera; 
    }
    update(deltaTime: number) {
        
    }
    // create(mountNode:Node, parentBox:Node){
    create(mountNode:Node, parentBox:Node){
        if (!mountNode || !parentBox) {
            throw new Error('Invalid node parameters');
        }
        

        let mountWorldPos: Vec3 = mountNode.getWorldPosition(); 
        let screenPos: Vec3  = this.mainCamera.worldToScreen(mountWorldPos); 
        // console.log('mountWorldPos', mountWorldPos);
        // console.log('screenPos',screenPos);
        //
        let uiTransform:UITransform = parentBox.getComponent(UITransform);
        let wPos:Vec3 = this.uiCamera.screenToWorld(screenPos);
        let pos:Vec3 = uiTransform.convertToNodeSpaceAR(wPos);


        const bar:Node = instantiate(this.fab);
        bar.addComponent(UIOpacity);
        bar.setPosition(pos.x, pos.y, 0);

        parentBox.addChild(bar);
        //
        this.spriteBg = bar.getChildByName("background").getComponent(Sprite);
        this.spriteBar = bar.getChildByName("bar").getComponent(Sprite); 
        // console.log('create wPos', wPos);
    }
    setBarValue(value:number){
        value = Math.max(0, Math.min(1, value));
        this.barValue = value;
        this.spriteBar.fillRange = this.barValue;
    }
}

