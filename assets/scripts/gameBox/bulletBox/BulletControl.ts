import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
import { Player } from '../playerBox/Player';
import { BulletObject } from './BulletObject';
import { QtMath } from '../../qt_cocos_ts/utils/QtMath';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {

    @property(Prefab)
    bulletPrefab: Node = null;


    bulletLayerBox: Node = null;

    bulletLayerListArr: Node[] = [];

    start() {
        this.bulletLayerBox = this.node.getChildByName("bulletLayerBox");
        if(this.bulletLayerBox){
            // console.log("bulletLayerBox is null");
            // console.log(this.bulletLayerBox)
        }
    }

    // update(deltaTime: number) {
    gameTick(deltaTime: number) {
       for (const bullet of this.bulletLayerListArr) {
            const blt:Node = bullet as Node;
            const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
            // console.log(bltObj)
            if(bltObj.velocity!=Vec3.ZERO){
               bltObj.gameTick(deltaTime);
            }
        } 
    }

    public fire(player:Player){
        // console.log("bulletControl fire");
        const blt = instantiate(this.bulletPrefab);
        // this.node.addChild(blt);
        this.bulletLayerBox.addChild(blt);
        // blt.setPosition(player.node.position.x,player.node.position.y,0);
        blt.setRotationFromEuler(0,0,player.getGunAngle());
        //
        const bltObj:BulletObject = blt.getComponent('BulletObject') as BulletObject;
        const velocity = QtMath.convertSpeedAngleToVector3(0.2,player.getGunAngle()+90);
        bltObj.name = 'bullet';
        // bltObj.position = new Vec3();//player.node.getPosition();
        bltObj.velocity = velocity;
        bltObj.position = player.node.getPosition();
        // bltObj.velocity = new Vec3(0,0.1,0);
        bltObj.maxForce = 10;
        bltObj.maxSpeed = 1;
        bltObj.mass = 50;
        bltObj.skinObject = blt;
        //

        this.bulletLayerListArr.push(blt);

    }
}

