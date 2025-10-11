import { _decorator, Collider, ColliderComponent, Component, ICollisionEvent, Node, RigidBody, Vec3 } from 'cc';
import { Vehicle } from '../vehicleBox/Vehicle';
const { ccclass, property } = _decorator;

@ccclass('BulletObject')
export class BulletObject extends Vehicle {
    //加速度
    private _accForce:number = 0.2;
    //阻力
    private _resistanceForce:number = 0.001*0.5;
    //射速
    private _maxForce:number = 1;
    //
    private _arrivalThreshold:number = 50;
    //
    private _steeringForce:Vec3 = null;

    private _skinObject:Node = null;

    private _gravity:number = 0.98;
    private _gravNum:number = 0.002;
    // 刚体组件
    // private rigidBody: RigidBody | null = null;

    private lv:Vec3 = new Vec3();

    onLoad(): void {
        // this.rigidBody = this.getComponent(RigidBody);
        // console.log('BulletObject onLoad')
        // console.log(this.rigidBody);
       
    }
    start() {
        // console.log(' run BulletObject start')
        this._name = 'bullet';
        this.mass = 0.1;
        this.maxSpeed = 0.5;
    
    }

    // update(deltaTime: number) {
        
    // }

    constructor(v3?:Vec3) {
        // console.log(' run SteeredVehicle constructor')
        super();
        this._steeringForce = v3 || new Vec3()
    }

    public set skinObject(value:Node){
        this._skinObject = value;
    }

    public set maxForce(value:number){
        this._maxForce = value;
    }

    public get maxForce():number{
        return this._maxForce;
    }
    
    public set arrivalThreshold(value:number){
        this._arrivalThreshold = value;
    }

    public get arrivalThreshold():number{
        return this._arrivalThreshold;
    }
    
    public set resistanceForce(value:number){
        this._resistanceForce = value;
    }

    public get resistanceForce():number{
        return this._resistanceForce;
    }
    
    public get steeringForce():Vec3{
        return this._steeringForce;
    }
    public set gravNum(value:number){
        this._gravNum = value;
    }

    public get gravNum():number{
        return this._gravNum;
    }
    override gameTick(deltaTime: number) {

        this._steeringForce = this._steeringForce.divide3f(this.mass, this.mass, this.mass);
        if (this._steeringForce.length() > this._maxForce) {
            this._steeringForce = this._steeringForce.normalize().multiplyScalar(this._maxForce);
        }

        //增加重力
        this.velocity = this.velocity.add(new Vec3(0, -this._gravity*this._gravNum, 0)); 
        //this.velocity = this.velocity.add(new Vec3(0, 0, 0)); 

        // 应用转向力到速度（考虑时间 deltaTime，确保不同帧率下表现一致）
        // 乘以60统一帧率影响
        this.velocity = this.velocity.add(this._steeringForce.multiplyScalar(deltaTime * 60)); 
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity = this.velocity.normalize().multiplyScalar(this.maxSpeed);
        }

        //
        const angle = this.getBulletAngle(); 
        this._skinObject.setRotationFromEuler(new Vec3(0,0,angle));
        this._skinObject.setPosition(this.position);

        this._steeringForce = new Vec3();

        super.gameTick(deltaTime);

        // this.node.setPosition(this.position);
        // console.log("angle")
        // console.log(angle)

        // this._skinObject.setWorlsdfjjdPosition(this.position);
        //
        
        //-------------------------
        // console.log(this.rigidBody.linearFactor)
        // 让箭矢朝向运动方向（可选）
        // if (this.rigidBody && this.rigidBody.linearFactor.length() > 0.1) {
            // const angle = Math.atan2(this.rigidBody.linearFactor.y, this.rigidBody.linearFactor.x) * 180 / Math.PI ;
            // this._skinObject.setRotationFromEuler(new Vec3(0,0,angle));
        // }
        
        // const angle = this.rigidBody.linearVelocity.signAngle(v2(1,0));
        // this.node.angle = -(angle * 180 / Math.PI);
        
        // this.rigidBody.getLinearVelocity(this.lv);
        // const angle = lv.signAngle
        // console.log('lv',this.lv)
        //-------------------------

        // 1. 获取导弹和目标的位置
        // const missilePos = this.position;
        // const targetPos = this._skinObject.getPosition();
        
        // 2. 计算方向向量（目标 - 导弹）
        // const direction = new Vec3();
        // Vec3.subtract(direction, targetPos, missilePos);
        // 归一化方向向量
        // direction.normalize();
        
        // if (direction.lengthSqr() < 0.0001) return; // 防止除以零
        
        // 3. 计算目标旋转角度
        // const targetRotation = new Quat();
        // 计算从当前方向到目标方向的旋转
        // 这里假设导弹默认朝向是前方（0,0,1），根据实际模型朝向调整
        // Quat.fromLookAt(targetRotation, Vec3.ZERO, direction);
        // Quat.fromEuler(targetRotation, direction.x, direction.y, direction.z);
        // this._skinObject.setRotationFromEuler(direction)

        // const angle = Math.atan2(this.velocity.y, this.velocity.x) * 180 / Math.PI + 180;
        // this._skinObject.setRotationFromEuler(new Vec3(angle,0,0));
    }
    public getBulletAngle(){
        const angle = Math.atan2(this.velocity.y, this.velocity.x) * 180 / Math.PI + 90 ;
        return angle;
    }
    seek(target:Vec3):void
	{
		let desiredVelocity:Vec3 = target.subtract(this.position);
		desiredVelocity.normalize();
		desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed);
		let force:Vec3 = desiredVelocity.subtract(this.velocity);

        // 限制转向力
        if (force.length() > this.maxForce) {
           force.normalize().multiplyScalar(this.maxForce);
        }
        
		this._steeringForce = this._steeringForce.add(force);

    }
    seek2(target:Vec3):void
	{
        let desiredVelocity:Vec3 = target.subtract(this.position);
		desiredVelocity.normalize();
        //最大速度 减速
        // this._maxSpeed -= this._resistanceForce;
        // if(this._maxSpeed<0.3/5){
        //     this._maxSpeed = 0.3;
        // }
        // console.log("this._maxSpeed:"+this._maxSpeed)
		desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed);
		let force:Vec3 = desiredVelocity.subtract(this.velocity);
		this._steeringForce = this._steeringForce.add(force);
	}

    seek3(target:Vec3){
        let desiredVelocity:Vec3 = target.subtract(this.position);
		desiredVelocity.normalize();
        let dist:number = Vec3.distance(target, this.position);
        // console.log('---dist---')
        // console.log(dist)
        // console.log(this._arrivalThreshold)
        if(dist > this._arrivalThreshold){
		     desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed);
        }else{
		     desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed*dist/this._arrivalThreshold);
        }
		let force:Vec3 = desiredVelocity.subtract(this.velocity);
		this._steeringForce = this._steeringForce.add(force);
    }

    flee(target:Vec3):void
	{
		let desiredVelocity:Vec3 = target.subtract(this.position);
		desiredVelocity.normalize();
		desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed);
		let force:Vec3 = desiredVelocity.subtract(this.velocity);
		this._steeringForce = this._steeringForce.subtract(force);
	}

    arrive(target:Vec3):void
	{
		let desiredVelocity:Vec3 = target.subtract(this.position);
		desiredVelocity.normalize();
        let dist:number = Vec3.distance(target, this.position);
        
        if(dist > this._arrivalThreshold){
		     desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed);
        }else{
		     desiredVelocity = desiredVelocity.multiplyScalar(this.maxSpeed*dist/this._arrivalThreshold);
        }
		let force:Vec3 = desiredVelocity.subtract(this.velocity);
		this._steeringForce = this._steeringForce.add(force);
    }

    pursue(target:Vec3){
        let dist:number = Vec3.distance(target, this.position);
        let lookAheadTime:number = dist/this.maxSpeed; 
        let predictedTarget:Vec3 = this.position.add(target.multiplyScalar(lookAheadTime));
        // this.seek(predictedTarget)
        console.log('this._maxSpeed')
        console.log(predictedTarget)
    }
}

