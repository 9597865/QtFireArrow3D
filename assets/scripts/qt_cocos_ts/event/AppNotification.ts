
/**
 * 
 * 
 * 
 @ccclass('Child')
export class Child extends Component {
    protected onLoad(): void {
        AppNotification.on("MyEvent1", (arg)=>{
            console.log("child收到MyEvent1事件:" + arg);
        }, this);
    }

    start() {
        AppNotification.emit("MyEvent1", "子节点发送")
    }

    protected onDestroy(): void {
        AppNotification.targetOff(this);
    }
}

@ccclass('Parent')
export class Parent extends Component {
    protected onLoad(): void {
        AppNotification.on("MyEvent1", (arg)=>{
            console.log("parent收到MyEvent1事件:" + arg);
        }, this);
    }

    start() {
        AppNotification.emit("MyEvent1", "父节点发送")
    }

    protected onDestroy(): void {
        AppNotification.targetOff(this);
    }
}
 */

import { EventTarget } from "cc";

export class AppNotification extends EventTarget {
    private constructor() {
        super();
    }

    private static instance: AppNotification;
    public static getInstance() {
        if (!this.instance) {
            this.instance = new AppNotification();
        }

        return this.instance;
    }

    public static on(eventName: string, cb: (arg: any)=>void, target: any) {
        this.getInstance().on(eventName, cb, target);
    }

    public static off(eventName: string) {
        this.getInstance().off(eventName);
    }

    public static targetOff(target: any) {
        this.getInstance().targetOff(target);
    }


    public static emit(eventName: string, arg: any = {}) {
        this.getInstance().emit(eventName, arg);
    }
}