import { _decorator, Component, Node } from 'cc';
import { BulletObject } from '../bulletBox/BulletObject';
const { ccclass, property } = _decorator;

export interface IBullet<T = void>{
    bulletAngle:number,
    bulletSpeed:number,
    bulletDamage:number,
    bulletType:string,
}