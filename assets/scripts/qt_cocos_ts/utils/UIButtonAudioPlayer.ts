import { Component, _decorator } from "cc";
// import { AppRoot } from "../AppRoot/AppRoot";
import { UIButton } from "../ui/button/UIButton";
import { AppRoot } from "../AppRoot/AppRoot";
const { ccclass, property } = _decorator;

@ccclass("UIButtonAudioPlayer")
export class UIButtonAudioPlayer extends Component {
    @property(UIButton) private button: UIButton;
    public start(): void {
        this.button.InteractedEvent.on(this.playButtonClick, this);
    }

    private playButtonClick(): void {
        console.log('=========播放音效=========')
        const audioClip = AppRoot.Instance.AudioAssets.buttonClick;
        AppRoot.Instance.AudioPlayer.playSound(audioClip);
    }
}
