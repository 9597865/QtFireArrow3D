import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EuipmentControl')
export class EuipmentControl extends Component {


    private euipmentDataList: Object[] = [];

    start() {
        
        let euiqObj = {
            id: 1001,
            euiqmentName: "木剑",
            euiqmentType: "weapon",
            rarity: "common",
            levelRequirement: 1,
            baseAttributes: { attack: 5, criticalChance: 0.01 },
            specialEffects: [],
            iconPath: "Icons/Weapons/BronzeSword.png"
        }
        this.euipmentDataList.push(euiqObj);
    }

    update(deltaTime: number) {
        
    }

}

