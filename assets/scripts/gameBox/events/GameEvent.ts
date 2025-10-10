import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameEvent')
export class GameEvent {
    public static EVENT_STAGE_MOUSE_START:string = "event_stage_mouse_start" //飞机爆炸
    public static EVENT_STAGE_MOUSE_MOVE:string = "event_stage_mouse_move" //飞机爆炸
    public static EVENT_STAGE_MOUSE_END:string = "event_stage_mouse_end" //飞机爆炸
}

