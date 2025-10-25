import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyObject')
export class EnemyObject extends Component {


    private _life:number = 3;


    
    start() {
        // const angle = Vec3.angle(this.node.position, new Vec3(0, 0, 0));
        // console.log("angle", angle);

        this._name = 'enemy';

        console.log("EnemyObject life:", this._life);
        
    }

    gameTick(deltaTime: number) {
    //    if(this.node.position.y > 0){
    //         this.node.setPosition(this.node.position.x, this.node.position.y - deltaTime, 0);
    //    } 
    }

    /**
     * 处理角色受到伤害的方法
     * @param _damage 攻击方造成的伤害值
     */
    public beaten(_damage:number = 1){
        //
        this.scaleNode(_damage) ;
        //-------------------------------
        this._life -= _damage;
        //
        if(this._life <= 0){
           this._life = 0;
        }
    }
    private scaleNode(_damage:number){
        let scaleNumBig:number = 1.2;
        let scaleNumSmall:number = 1.02;
        let scaleNum:number = 1;
        if(_damage>1 || this._life==1){
            this.node.setScale(scaleNumBig, scaleNumBig, scaleNumBig);
        }else{
            this.node.setScale(scaleNumSmall, scaleNumSmall, scaleNumSmall);
        }
        setTimeout(() => {
            this.node.setScale(scaleNum, scaleNum, scaleNum);
        }, 100);
    }
    public del(){
        if(this.node) {
            this.node.destroy();
            console.log("del this.node", this.node);
        }
    }

    get life():number{
        return this._life;
    }
    set life(value:number){
        this._life = value;
    }
}

