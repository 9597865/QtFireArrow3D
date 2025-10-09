import { _decorator, Collider, Collider2D, Component, geometry, math, Node, Vec3, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Vehicle')
export class Vehicle extends Component {

    public _name:string = '';
    //质量
    private _mass:number = 1;
    //最大速度
    private _maxSpeed:number = 1;
    //
    private _position:Vec3 = null;
    private _velocity:Vec3 = null;

    
    constructor() {
        super();
        this._position = new Vec3(); 
        this._velocity = new Vec3(); 
    }
    
    gameTick(deltaTime: number) {

        // this.truncate(this._velocity,this._maxSpeed); 

        // Vec3.min(this._velocity, new Vec3(this.maxSpeed,this.maxSpeed,this.maxSpeed), this._velocity);
        
        this._position = this._position.add(this._velocity);

        // console.log(this._velocity); 
    }
    

    /**
    * 求一个向量的反射向量 3d
    * @param inVec 入射向量
    * @param N 法向量
    * @returns 反射向量
    */
    public reflect2(inVec: Vec3, N: Vec3) {
        return inVec.subtract((N.multiplyScalar(2 * Vec3.dot(inVec, N))))
    }

    public set mass(value:number){
        this._mass = value;
    }
    public get mass():number{
        return this._mass;
    }

    public set maxSpeed(value:number){
        this._maxSpeed = value;
    }
    public get maxSpeed():number{
        return this._maxSpeed;
    }

    public set position(value:Vec3){
        this._position = value;
    }
    public get position():Vec3{
        return this._position;
    }

    public set velocity(value:Vec3){
        this._velocity = value;
    }
    public get velocity():Vec3{
        return this._velocity;
    } 


}

