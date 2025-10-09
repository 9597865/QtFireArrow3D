import { _decorator, Component, Node } from 'cc';
import { ISignal } from '../../event/ISignal';
import { Signal } from '../../event/Signal';

const { ccclass, property } = _decorator;

@ccclass('UIButton')
export class UIButton extends Component {
    private interactedEvent = new Signal<UIButton>();

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.interact, this);
    }

    public get InteractedEvent():ISignal<UIButton>{
        return this.interactedEvent;
    }

    private interact(): void {
        // console.log("interact --- UIButton");
        this.scheduleOnce(()=>{
            this.interactedEvent.trigger(this)
        }, .15);
    }
}

