import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameStatusEvent')
export class GameStatusEvent {

    public static STATUS_LOADING:string = "status_loading"
    public static STATUS_IDLE:string = "status_idle"
    public static STATUS_START:string = "status_start"
    public static STATUS_PLAYING:string = "status_playing"
    public static STATUS_PAUSE:string = "status_pause"
    public static STATUS_STOP:string = "status_stop"
    public static STATUS_GAMEOVER:string = "status_gameover"
    public static STATUS_SETTING:string = "status_setting"
    public static STATUS_EXIT:string = "status_exit"

}

