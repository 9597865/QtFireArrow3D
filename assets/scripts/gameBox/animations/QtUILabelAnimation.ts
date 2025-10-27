import { _decorator, Camera, Component, find, instantiate, Label, Node, Prefab, UITransform, Vec3 } from 'cc';
import { ILabelAnimation } from '../interface/ILabelAnimation';
const { ccclass, property } = _decorator;

@ccclass('QtUILabelAnimation')
export class QtUILabelAnimation extends Component implements ILabelAnimation {

    mainCamera: Camera = null;
    uiCamera: Camera = null;

    private _labelString: string = '';  // 添加value属性

    private _showDuration: number = 0;  // 添加showDuration属性

    private _labelFab: Prefab | null = null;  // 添加fab属性

    public get labelString(): string {
        return this._labelString;
    }
    public set labelString(value: string) {
        this._labelString = value;
    }
    public get showDuration(): number {
        return this._showDuration;  
    }
    public set showDuration(value: number) {
        this._showDuration = value;
    }
    public get labelFab(): Prefab {
        return this._labelFab!;
    }
    public set labelFab(value: Prefab) {
        this._labelFab = value;
    }

    constructor() {
        // console.log(' run SteeredVehicle constructor')
        super();

        this.uiCamera = find("GameMainBox/Canvas/Camera").getComponent(Camera) as Camera; 
        this.mainCamera = find("Main Camera").getComponent(Camera) as Camera; 

    }

    showLabel(mountComponent:Component, parentBox:Node): Node {  // 实现showLabel方法
        if (!mountComponent || !parentBox || !this._labelFab) {
            throw new Error('Invalid node parameters');
        }
        // 实现显示标签的逻辑
        let mountWorldPos: Vec3 = mountComponent.node.getWorldPosition(); 
        let screenPos: Vec3  = this.mainCamera.worldToScreen(mountWorldPos); 
        //
        let uiTransform:UITransform = parentBox.getComponent(UITransform);
        let wPos:Vec3 = this.uiCamera.screenToWorld(screenPos);
        let pos:Vec3 = uiTransform.convertToNodeSpaceAR(wPos);
        //
        const labelScore:Node = instantiate(this._labelFab);
        labelScore.setPosition(pos.x, pos.y, 0);
        labelScore.getComponent(Label).string = this.labelString || "100";
        parentBox.addChild(labelScore);
        return labelScore;
    }

    hideLabel(): Node {  // 实现hideLabel方法
        // 实现隐藏标签的逻辑
        return new Node();
    }

    start() {
        // 初始化逻辑
    }

    update(deltaTime: number) {
        // 更新逻辑
    }
}
