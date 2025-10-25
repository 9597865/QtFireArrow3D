// 定义基础属性接口
export interface IBaseAttributes {
    hp: number;       // 基础生命值
    mp: number;       // 基础魔法值
    attack: number;   // 基础攻击力
    defense: number;  // 基础防御力
    speed: number;    // 基础速度
    level: number;      // 基础等级
    // critRate: number; // 基础暴击率（参考之前的 criticalChance）
}