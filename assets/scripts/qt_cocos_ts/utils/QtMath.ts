import { Vec2, Vec3, math, assetManager, Texture2D, director  } from 'cc';

export class QtMath {
    /**
     * 保留两位小数
     * @param num 
     * @returns 
     */
    public static numTo2(num: number): number {
        return Math.round(num * 100) / 100;
    }
    public static radiansToDegrees(radians: number): number {
        return radians * (180/Math.PI);
    }
    public static degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }
    /**
     * 生成指定范围的随机整数
     * @param {number} min 最小值（包含）
     * @param {number} max 最大值（包含）
     * @returns {number} 随机整数
     */
    public static randomInt(min:number, max:number):number {
        // 先将范围转换为 [min, max+1)，再取整
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    /**
     * 将速度和角度转换为向量
     * @param speed 速度大小
     * @param angle 角度（以度为单位）
     * @returns 向量 cc.Vec2
     */
    public static convertSpeedAngleToVector3(speed: number, angle: number): Vec3 {
        // 将角度转换为弧度
        const radians = this.degreesToRadians(angle);
        // 计算x和y分量
        // 注意：Cocos中y轴向上为正，所以sin计算y分量
        const x = speed * Math.cos(radians);
        const y = speed * Math.sin(radians);
        return new Vec3(x, y, 0);
    }
    // 统计所有已加载资源的内存占用
    public static calculateAssetMemory() {
        // 获取所有已加载的资源
        const assets = assetManager.assets;
        let totalTextureMemory = 0;
        let totalAssetCount = 0;

        // 遍历所有资源，计算纹理内存
        for (const id in assets) {
            const asset = assets[id];
            totalAssetCount++;
            
            // 计算纹理资源内存（RGBA8888 格式按 4 字节/像素计算）
            if (asset instanceof Texture2D) {
                const texture = asset as Texture2D;
                // 实际内存 = 宽 * 高 * 像素字节数（根据纹理格式可能不同）
                const memory = texture.width * texture.height * 4; 
                totalTextureMemory += memory;
                console.log(`纹理资源: ${texture.name}, 大小: ${(memory / 1024).toFixed(2)} KB`);
            }
        }

        // 输出统计结果
        console.log(`总加载资源数: ${totalAssetCount}`);
        console.log(`总纹理内存: ${(totalTextureMemory / (1024 * 1024)).toFixed(2)} MB`);
    }

    /**
     * 计算 Vec3 与 X 轴正方向的夹角（角度）
     * @param vec 
     * @returns 
     */
    public static getAngleWithXAxis3D(vec: Vec3): number {
        const radians = Math.atan2(vec.y, vec.x); // 3D 中通常用 z 轴作为深度, 此函数 用y轴
        return radians * (180 / Math.PI);
    } 

    /**
     * 计算两点相对于原点的向量夹角（弧度）
     * @param pointA 点A
     * @param pointB 点B
     * @returns 夹角（弧度）
     */
    public static getAngleBetweenPoints(pointA: Vec2 | Vec3, pointB: Vec2 | Vec3): number {
        // 计算两点到原点的向量（如果需要计算两点之间连线与基准方向的夹角，可直接用 pointB - pointA）
        const vecA = pointA instanceof Vec2 ? new Vec2(pointA.x, pointA.y) : new Vec3(pointA.x, pointA.y, pointA.z);
        const vecB = pointB instanceof Vec2 ? new Vec2(pointB.x, pointB.y) : new Vec3(pointB.x, pointB.y, pointB.z);

        // 计算点积
        const dot = Vec2.dot(vecA as Vec2, vecB as Vec2); // 2D 直接用 dot
        // 3D 需用 Vec3.dot(vecA as Vec3, vecB as Vec3)

        // 计算模长乘积
        const lenA = vecA.length();
        const lenB = vecB.length();
        const lenProduct = lenA * lenB;

        if (lenProduct === 0) return 0; // 避免除以零

        // 计算夹角（弧度）
        const angle = Math.acos(Math.max(-1, Math.min(1, dot / lenProduct))); // 限制值在 [-1, 1] 避免精度问题
        return angle;
    }
    /**
     * 在指定角度范围内平均分配角度
     * @param startAngle 起始角度（度）
     * @param endAngle 结束角度（度）
     * @param count 分配的角度数量（正整数）
     * @returns 角度数组（度）
     */
    public static distributeAnglesInRange(startAngle: number, endAngle: number, count: number): number[] {
        if (!Number.isInteger(count) || count <= 0) {
            throw new Error("角度数量必须是正整数");
        }

        const angles: number[] = [];
        // 计算角度间隔（包含首尾两点）
        const step = (endAngle - startAngle) / (count - 1);

        for (let i = 0; i < count; i++) {
            const angle = startAngle + i * step;
            angles.push(angle);
        }

        return angles;
    }

    /**
     * 将角度转换为二维向量（Vec2）
     * @param angle 角度（度，0°为x轴正方向，顺时针增加）
     * @param magnitude 向量模长（默认1.0）模长就是速度
     * @returns 转换后的向量
     */
    public static angleToVec3(angle: number, magnitude: number = 1.0): Vec3 {
        // 将角度转换为弧度
        const radians = angle * Math.PI / 180;
        // 计算分量（注意：Cocos 2D 中 y 轴向下为正，如需向上可加负号）
        const x = magnitude * Math.cos(radians);
        const y = magnitude * Math.sin(radians);
        return new Vec3(x, y, 0);
    }
    public static distribute3DVectorsZisZero(n: number, magnitude: number = 1.0): Vec3[] {
        if (!Number.isInteger(n) || n <= 0) {
            throw new Error("n必须是正整数");
        }

        const vectors: Vec3[] = [];
        // const angleStep = (2 * Math.PI) / n; // 360° 弧度制角度间隔
        const angleStep = (Math.PI/3 ) / n ; // 弧度制角度间隔

        for (let k = 0; k < n; k++) {
            const angle = k * angleStep ; // 第k个向量的角度
            const y = magnitude * Math.sin(angle);
            const x = magnitude * Math.cos(angle);
            vectors.push(new Vec3(x, y, 0));
        }

        return vectors;
    }
    /**
     * 生成二维平面上角度平均分配的向量
     * @param n 向量数量（正整数）
     * @param magnitude 向量模长（默认1.0）
     * @returns 向量数组（Vec2）
     */
    public static distribute2DVectors(n: number, magnitude: number = 1.0): Vec2[] {
        if (!Number.isInteger(n) || n <= 0) {
            throw new Error("n必须是正整数");
        }

        const vectors: Vec2[] = [];
        const angleStep = (2 * Math.PI) / n; // 弧度制角度间隔

        for (let k = 0; k < n; k++) {
            const angle = k * angleStep; // 第k个向量的角度
            const x = magnitude * Math.cos(angle);
            const y = magnitude * Math.sin(angle);
            vectors.push(new Vec2(x, y));
        }

        return vectors;
    }
    /**
     * 生成三维空间中均匀分布的向量（黄金螺旋法）
     * @param n 向量数量（正整数）
     * @param magnitude 向量模长（默认1.0）
     * @returns 向量数组（Vec3）
     */
    public static distribute3DVectors(n: number, magnitude: number = 1.0): Vec3[] {
        if (!Number.isInteger(n) || n <= 0) {
            throw new Error("n必须是正整数");
        }

        const vectors: Vec3[] = [];
        const goldenRatio = (1 + Math.sqrt(5)) / 2; // 黄金比例
        const thetaStep = Math.PI * 2 * goldenRatio; // 螺旋角度步长

        for (let k = 0; k < n; k++) {
            const t = k / n; // 0到1的比例
            const theta = Math.acos(1 - 2 * t); // 极角（控制纬度）
            const phi = thetaStep * k; // 方位角（控制经度）

            const sinTheta = Math.sin(theta);
            const x = magnitude * sinTheta * Math.cos(phi);
            const y = magnitude * sinTheta * Math.sin(phi);
            const z = magnitude * Math.cos(theta);

            vectors.push(new Vec3(x, y, z));
        }

        return vectors;
    }
    /**
     * 以中心点为基准，计算两侧的坐标位置
     * @param center 中心点坐标
     * @param count 每侧要生成的坐标数量
     * @param distance 相邻坐标之间的距离
     * @param axis 生成坐标的轴，'x'或'y'，默认是'x'轴
     * @returns 包含所有生成坐标的数组，顺序为[左侧所有点, 中心点, 右侧所有点]
     */
    public static getSurroundingCoordinates(
        center: Vec2, 
        count: number, 
        distance: number = 100, 
        axis: 'x' | 'y' = 'x'
    ): Vec2[] {
        const coordinates: Vec2[] = [];
        
        // 生成左侧坐标（数值减小方向）
        for (let i = 1; i <= count; i++) {
            if (axis === 'x') {
                coordinates.push(new Vec2(center.x - i * distance, center.y));
            } else {
                coordinates.push(new Vec2(center.x, center.y - i * distance));
            }
        }
        
        // 添加中心点
        coordinates.push(new Vec2(center.x, center.y));
        
        // 生成右侧坐标（数值增大方向）
        for (let i = 1; i <= count; i++) {
            if (axis === 'x') {
                coordinates.push(new Vec2(center.x + i * distance, center.y));
            } else {
                coordinates.push(new Vec2(center.x, center.y + i * distance));
            }
        }
        
        return coordinates;
    }
    /**
     * 已知两点创建直线，求直线上距离第二点指定距离的第三点
     * @param pointA 直线上的第一个点
     * @param pointB 直线上的第二个点
     * @param distance 第三点到pointB的距离
     * @returns 计算得到的第三点
     */
    public static getThirdPointOnLine(pointA: Vec2, pointB: Vec2, distance: number): Vec2 {
        // 计算AB方向向量
        // 计算AB方向向量
        const abVec = new Vec2();
        Vec2.subtract(abVec, pointB, pointA);
        
        // 归一化方向向量
        const dir = new Vec2();
        Vec2.copy(dir, abVec);
        dir.normalize();
        
        // 计算第三点
        const pointC = new Vec2();
        Vec2.scaleAndAdd(pointC, pointB, dir, distance);
        
        return pointC;
    }
}

