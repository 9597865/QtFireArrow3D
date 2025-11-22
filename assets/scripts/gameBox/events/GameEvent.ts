import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameEvent')
export class GameEvent {

    public static EVENT_GAME_KEY_UP:string = "event_game_key_up" 
    public static EVENT_GAME_KEY_DOWN:string = "event_game_key_down"

    public static EVENT_STAGE_MOUSE_START:string = "event_stage_mouse_start" 
    public static EVENT_STAGE_MOUSE_MOVE:string = "event_stage_mouse_move"
    public static EVENT_STAGE_MOUSE_END:string = "event_stage_mouse_end"


    
    public static EVENT_BULLET_HIT_ENEMYOBJECT_BODY_CHEST:string = "event_bullet_hit_enemyobject_body_chest" 
    public static EVENT_BULLET_HIT_ENEMYOBJECT_HEADCROWN:string = "event_bullet_hit_enemyobject_headcrown" 
    public static EVENT_BULLET_HIT_ENEMYOBJECT_LEG:string = "event_bullet_hit_enemyobject_leg" 
    public static EVENT_BULLET_HIT_ENEMYOBJECT_HEAD:string = "event_bullet_hit_enemyobject_head" 
    public static EVENT_BULLET_HIT_ENEMYOBJECT_BODY:string = "event_bullet_hit_enemyobject_body" 
    public static EVENT_BULLET_HIT_FLOOR:string = "event_bullet_hit_floor"
    public static EVENT_BULLET_HIT_ENEMY_FLOOR:string = "event_bullet_hit_enemy_floor" 
    
}

