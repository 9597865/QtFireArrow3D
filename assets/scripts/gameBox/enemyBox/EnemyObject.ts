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
     * @param _attackLife 攻击方造成的伤害值
     */
    public beaten(_attackLife:number = 1){
        this.node.setScale(1.2, 1.2, 1.2);
        setTimeout(() => {
            this.node.setScale(1, 1, 1);
        }, 100);
        this._life -= _attackLife;
        if(this._life <= 0){
           this._life = 0;
        }
    }

    public del(){
        this.node.destroy();
    }

    get life():number{
        return this._life;
    }
    set life(value:number){
        this._life = value;
    }
}

