import { Vec3 } from "cc";
import { BulletObject } from "../bulletBox/BulletObject";
import { EnemyObject } from "../enemyBox/EnemyObject";
import { ILabelAnimation } from "./ILabelAnimation";

export interface IBulletDataObject<T = void>{
    bulletObject:BulletObject,
    bulletAngle:number,
    enemyBody?:EnemyObject,
    enemyHead?:EnemyObject,
    enemyCrownTorus?:EnemyObject,
    enemyBodyHitChest?:EnemyObject,
    qtUILabelAni?:ILabelAnimation
}