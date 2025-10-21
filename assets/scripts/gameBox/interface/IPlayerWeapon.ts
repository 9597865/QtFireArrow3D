import { Player } from "../playerBox/Player";

export interface IPlayerWeapon<T = void>{
    // euiqId:number,
    // euiqType:string,
    player:Player
    attackTarget<T>(data:T):void,
}