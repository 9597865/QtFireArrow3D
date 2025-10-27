import { Component, Prefab } from "cc";

export interface ILabelAnimation{
    labelString:string,
    showDuration:number,
    labelFab:Prefab,
    showLabel:(mountNode:Component, parentBox:any)=>any,
    hideLabel:()=>any,

}