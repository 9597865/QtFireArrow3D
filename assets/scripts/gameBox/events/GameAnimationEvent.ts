import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameAnimationEvent {

    public static ANIMATION_EVENT_START:string = "event_game_animation_start"
    public static ANIMATION_EVENT_STOP:string = "event_game_animation_stop"

    public static ANIMATION_EVENT_IDLE:string = "event_game_animation_idle"
    public static ANIMATION_EVENT_ATTACK:string = "event_game_animation_attack"
    public static ANIMATION_EVENT_RUN:string = "event_game_animation_run"
    public static ANIMATION_EVENT_WALK:string = "event_game_animation_walk"
    public static ANIMATION_EVENT_JUMP:string = "event_game_animation_jump"
    public static ANIMATION_EVENT_DIE:string = "event_game_animation_die"
}

