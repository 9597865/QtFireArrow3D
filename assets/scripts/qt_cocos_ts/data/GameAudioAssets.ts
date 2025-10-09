import { _decorator, AudioClip, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameAudioAssets')
export class GameAudioAssets extends Component {
    @property(AudioClip) public bgMusic: AudioClip;

    @property(AudioClip) public buttonClick: AudioClip;
    @property(AudioClip) public birdJump: AudioClip;
    @property(AudioClip) public birdDeath: AudioClip;
    @property(AudioClip) public birdOnLand: AudioClip;
    @property(AudioClip) public birdHitPipe: AudioClip;
    @property(AudioClip) public birdPassPipe: AudioClip;
}

