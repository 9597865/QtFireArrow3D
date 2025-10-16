import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 装备类型（武器/头盔/ armor/饰品等，枚举类型）
enum EquipmentType { Weapon, Helmet, ChestArmor, LegArmor, Ring, Amulet }

// 属性类型（攻击/防御/血量等，枚举类型）
enum AttributeType { Attack, Defense, Health, Mana, CriticalChance }

// 稀有度（普通/稀有/史诗/传说，影响属性上限）
enum EquipmentRarity { Common, Rare, Epic, Legendary }

@ccclass('EuiqmentObject')
export class EuiqmentObject extends Component {

    public id:number = 0;               // 唯一标识（用于数据库/配置表索引）
    public euiqmentName:string = "";          // 装备名称
    public euiqmentType:EquipmentType;   // 类型（武器/头盔/ armor/饰品等，枚举类型）
    public rarity:EquipmentRarity; // 稀有度（普通/稀有/史诗/传说，影响属性上限）; 
    public levelRequirement:number = 0; // 佩戴等级要求
    public durability:number = 0;       // 耐久度（0时失效，可修复）
    public maxDurability:number = 0;    // 最大耐久度
    public baseAttributes:Object = {}; // 基础属性（攻击/防御/血量等）
    public specialEffects:string[] = []; // 特殊效果（如“吸血”“暴击率+5%”）
    public isBind:boolean = false;          // 是否绑定（绑定后不可交易）
    public iconPath:string = "";      // 图标资源路径（UI显示用）
    public description:string = "";   // 描述（用于显示在UI上）

    start() {

    }

    update(deltaTime: number) {
        
    }
}

