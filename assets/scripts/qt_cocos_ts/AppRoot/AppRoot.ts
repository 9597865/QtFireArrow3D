import { _decorator, approx, Component, Node } from 'cc';
import { GameAudioAssets } from '../data/GameAudioAssets';
import { AudioPlayer } from '../audioPlayer/AudioPlayer';
const { ccclass, property } = _decorator;

@ccclass('AppRoot')
export class AppRoot extends Component {
    @property(AudioPlayer) private audio: AudioPlayer;
    @property(GameAudioAssets) private audioAssets: GameAudioAssets;

    private static instance:AppRoot = null;

    public start(): void {
        console.log('this.gameAudioAssets');
        if (AppRoot.Instance == null) {
            AppRoot.instance = this;
            // director.addPersistRootNode(this.node);
            this.init();
        } else {
            this.node.destroy();
        }
    }
    private async init(): Promise<void> {
        /*
        this.saveSystem = new SaveSystem();
        this.liveUserData = this.saveSystem.load();

        const gameAssetsNode = instantiate(this.gameAssetsPrefab);
        gameAssetsNode.setParent(this.node);
        this.gameAssets = gameAssetsNode.getComponent(GameAssets);
        this.gameAssets.init();

        this.audio.init(this.LiveUserData.soundVolume, this.LiveUserData.musicVolume);

        this.screenFader.init();
        this.screenFader.node.active = false;

        await this.y8.init();

        this.analytics = new Analytics(this.y8);
        */
    }
    public static get Instance():AppRoot {
        return this.instance;
    }

    public get AudioPlayer():AudioPlayer {
        return this.audio;
    }

    public get AudioAssets():GameAudioAssets{
        return this.audioAssets;
    }
    
}

