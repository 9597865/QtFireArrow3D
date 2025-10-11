import { Vec3 } from "cc";
import { BulletObject } from "../bulletBox/BulletObject";

export interface IBulletDataObject<T = void>{
    bulletObject:BulletObject,
    bulletAngle:number
}