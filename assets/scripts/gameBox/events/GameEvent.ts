import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameEvent')
export class GameEvent {
    public static EVENT_STAGE_MOUSE_START:string = "event_stage_mouse_start" //飞机爆炸
    public static EVENT_STAGE_MOUSE_MOVE:string = "event_stage_mouse_move" //飞机爆炸
    public static EVENT_STAGE_MOUSE_END:string = "event_stage_mouse_end" //飞机爆炸


    public static EVENT_BULLET_HIT_ENEMYOBJECT_HEAD:string = "event_bullet_hit_enemyobject_head" //飞机爆炸
    public static EVENT_BULLET_HIT_ENEMYOBJECT_BODY:string = "event_bullet_hit_enemyobject_body" //飞机爆炸
    public static EVENT_BULLET_HIT_FLOOR:string = "event_bullet_hit_floor" //飞机爆炸
    public static EVENT_BULLET_HIT_ENEMY_FLOOR:string = "event_bullet_hit_enemy_floor" //飞机爆炸
    
}

