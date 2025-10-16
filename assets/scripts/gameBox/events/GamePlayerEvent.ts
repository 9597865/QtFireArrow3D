import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GamePlayerEvent')
export class GamePlayerEvent {
    
    public static EVENT_PLYAYER_FIRE:string = "event_player_fire" //飞机爆炸
    
}

