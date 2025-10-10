import { Vec2, Vec3 } from 'cc';

// 使用示例
// const start = new Vec3(0, 0, 0);
// const end = new Vec3(100, 100, 0);
// const points = getPointsBetweenTwoPoints(start, end);
// console.log("获取的5个点：", points);

/**
 * 在两点之间的直线上获取5个均匀分布的点（包括起点和终点）
 * @param start 起点坐标
 * @param end 终点坐标
 * @returns 包含5个点的数组
 */
export function getPointsBetweenTwoPoints(start: Vec2 | Vec3, end: Vec2 | Vec3, countNum:number = 5, cutLine:number = 3): (Vec2 | Vec3)[] {
    const points: (Vec2 | Vec3)[] = [];
    const count = countNum; // 要获取的点数量
    
    // 计算两点之间的差值
    const delta = (start instanceof Vec2) ? 
        new Vec2(end.x - start.x, end.y - start.y) : 
        new Vec3(end.x - start.x, end.y - start.y, end.z - start.z);
    
    // 计算每个间隔的比例（0到1之间分为4等份）
    for (let i = 0; i < count; i++) {
        const ratio = i / (count - 1)/cutLine; // 比例从0到1
        
        // 计算当前点坐标
        const point = (start instanceof Vec2) ? 
            new Vec2(
                start.x + delta.x * ratio,
                start.y + delta.y * ratio
            ) : 
            new Vec3(
                start.x + delta.x * ratio,
                start.y + delta.y * ratio,
                start.z + delta.z * ratio
            );
        
        points.push(point);
    }
    
    return points;
}
