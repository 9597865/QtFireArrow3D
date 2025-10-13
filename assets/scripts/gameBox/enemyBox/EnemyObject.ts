import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyObject')
export class EnemyObject extends Component {


    private _life:number = 1;

    
    start() {
        // const angle = Vec3.angle(this.node.position, new Vec3(0, 0, 0));
        // console.log("angle", angle);

        
    }

    gameTick(deltaTime: number) {
    //    if(this.node.position.y > 0){
    //         this.node.setPosition(this.node.position.x, this.node.position.y - deltaTime, 0);
    //    } 
    }

    get life():number{
        return this._life;
    }
    set life(value:number){
        this._life = value;
    }
}

