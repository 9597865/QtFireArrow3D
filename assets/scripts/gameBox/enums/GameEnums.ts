// 导出游戏角色状态枚举
export enum RoleState {
    IDLE = 0,    // 空闲
    MOVE = 1,    // 移动
    ATTACK = 2,  // 攻击
    HURT = 3,    // 受击
    DEAD = 4     // 死亡
}

// weapon, helmet, armor, boot, jewelry
export enum EquipmentType {
    WEAPON = "weapon",   // 武器
    HELMET = "helmet",    // 头盔
    ARMOR = "armor",     // 铠甲
    BOOT = "boot",       // 鞋子
    JEWELRY = "jewelry",  // 饰品
    CONSUMABLE = "consumable"  // 消耗品
}

// 稀有度（普通/稀有/史诗/传说，影响属性上限）
export enum EquipmentRarity {
    COMMON = 0,    // 普通
    RARE = 1,      // 稀有
    EPIC = 2,      // 史诗
    LEGENDARY = 3  // 传说
}
// 属性类型（攻击/防御/血量等，枚举类型）
export enum AttributeType {
    Attack = "Attack",    // 攻击
    Defense = "Defense",  // 防御
    Health = "Health",    // 血量
    Mana = "Mana",        // 法力
    CriticalChance = "CriticalChance"  // 暴击率
}
// 导出方向枚举（数字枚举）
export enum Direction {
    UP,    // 默认值 0
    RIGHT, // 1
    DOWN,  // 2
    LEFT   // 3
}