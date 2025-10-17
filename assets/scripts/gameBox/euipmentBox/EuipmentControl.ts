import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EuipmentControl')
export class EuipmentControl extends Component {

    //武器、头盔、铠甲、靴子、饰品, 这五个大类，每个只能有一个装备占位子
    //weapon, helmet, armour, boot, jewelry
    private _euipmentDataList: Object[] = [];

    private _euipmentDataListMap: Map<string, Object> = new Map<string, Object>();

    
    start() {
        
        let euiqObj = {
            id: 1001,
            eqName: "木剑",
            eqType: "weapon",
            rarity: "common",
            levelRequirement: 1,
            // criticalChance 暴击率
            baseAttributes: { damage: 5, criticalChance: 0.01 },
            specialEffects: [],
            iconPath: "Icons/Weapons/BronzeSword.png"
        }
        // this.euipmentDataList.push(euiqObj);


        this._euipmentDataListMap.set("weapon", euiqObj);
        this._euipmentDataListMap.set("helmet", {});
        this._euipmentDataListMap.set("armour", {});
        this._euipmentDataListMap.set("boot", {qiter:'9527'});
        this._euipmentDataListMap.set("jewelry", {});

        // console.log('this.euipmentDataListMap');
        // console.log(this.euipmentDataListMap);

        // const weaponDataObj:Object = this._euipmentDataListMap.get("weapon");
        // const bootDataObj:Object = this._euipmentDataListMap.get("boot");
        // console.log('weaponDataObj');
        // console.log(weaponDataObj);
        // console.log('bootDataObj');
        // console.log(bootDataObj);
    }

    update(deltaTime: number) {
        
    }


    public get euipmentDataList() {
        return this._euipmentDataList; // 返回当前实例的设备数据列表
    }
    public set euipmentDataList(value: Object[]) {
        this._euipmentDataList = value; // 设置当前实例的设备数据列表
    }
    /**
     * 获取设备数据列表映射
     * @returns 返回设备数据列表映射对象
     */
    public get euipmentDataListMap() {
        return this._euipmentDataListMap; // 返回当前实例的设备数据列表映射
    }
    public set euipmentDataListMap(value: Map<string, Object>) {
        this._euipmentDataListMap = value; // 设置当前实例的设备数据列表映射
    }
}

