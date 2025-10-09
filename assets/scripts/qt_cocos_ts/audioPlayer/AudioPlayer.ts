import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AudioPlayer')
export class AudioPlayer extends Component {

    @property(AudioSource) private soundSource:AudioSource = null;
    @property(AudioSource) private musicSource:AudioSource = null;

    public init(soundVolume: number, musicVolume: number): void {
        this.setSoundVolume(soundVolume);
        this.setMusicVolume(musicVolume);
    }

    public get SoundVolume(): number {
        return this.soundSource.volume;
    }

    public get MusicVolume(): number {
        return this.musicSource.volume;
    }

    public setSoundVolume(volume: number): void {
        this.soundSource.volume = volume;
    }

    public getMusicIsPlaying():boolean{
        return this.musicSource.playing
    }
    /**
     * 背景音乐 音量大小设置
     * @param volume 为0-1的值
     */
    public setMusicVolume(volume: number): void {
        this.musicSource.volume = volume;
    }

    public playSound(clip: AudioClip): void {
        this.soundSource.playOneShot(clip);
    }

    public playMusic(clip: AudioClip): void {
        this.musicSource.stop();
        this.musicSource.clip = clip;
        this.musicSource.play();
    }

    public stopMusic(){
        this.musicSource.stop();
    }

    public stopSound(){
        this.soundSource.stop();
    }

}

