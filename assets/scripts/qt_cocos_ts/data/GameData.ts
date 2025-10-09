import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameData')
export class GameData {
    private static _score:number = 0;
    private static _scoreBest:number = 0;

    private static _globalMusicVolume = 0.3;
    private static _globalSoundVolume = 0.5;

    public static resetScore(n:number=1){
        this._score = 0;
    }
    public static addScore(n:number=1){
        this.saveScoreBest() 
        this._score += n;
    }
    public static getScore():number{
        return this._score;
    }

    public static getScoreBest():number{
        this.saveScoreBest() 
        return this._scoreBest;
    }

    private static saveScoreBest(){
        if(this._score>this._scoreBest){
            this._scoreBest = this._score;
            localStorage.setItem('bestScore',this._score.toString());
        }else{
            this._scoreBest = Number(localStorage.getItem('bestScore'));
        }
    }


    public static getGlobalMusicVolume():number {
        return this._globalMusicVolume;
    }
    public static setGlobalMusicVolume(volume: number) {
        this._globalMusicVolume = volume;
    }

    public static getGlobalSoundVolume():number {
        return this._globalSoundVolume;
    }
    public static setGlobalSoundVolume(volume: number) {
        this._globalSoundVolume = volume;
    }
}

