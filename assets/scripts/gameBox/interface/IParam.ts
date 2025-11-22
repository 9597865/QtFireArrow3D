import { Vec3 } from "cc";
import { BulletObject } from "../bulletBox/BulletObject";
import { EnemyObject } from "../enemyBox/EnemyObject";
import { ILabelAnimation } from "./ILabelAnimation";

export interface IBulletDataObject<T = void>{
    name:string,
    bulletObject:BulletObject,
    bulletAngle:number,
    enemyObject?:EnemyObject,
    qtUILabelAni?:ILabelAnimation
}