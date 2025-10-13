import { Vec3 } from "cc";
import { BulletObject } from "../bulletBox/BulletObject";
import { EnemyObject } from "../enemyBox/EnemyObject";

export interface IBulletDataObject<T = void>{
    bulletObject:BulletObject,
    bulletAngle:number,
    enemyBody?:EnemyObject,
}