import { _decorator, Camera, Vec2, Vec3, geometry, PhysicsSystem } from 'cc';
const { ccclass } = _decorator;

@ccclass('CoordinateConverter')
export class CoordinateConverter {
    /**
     * 将2D屏幕坐标转换为3D世界坐标（指定深度）
     * @param camera 用于转换的相机
     * @param screenPos 屏幕坐标（Vec2）
     * @param zDepth 目标3D点在相机视角下的z轴深度（正值为相机前方）
     * @returns 转换后的3D坐标
     */
    static screenToWorld(camera: Camera, screenPos: Vec2, zDepth: number): Vec3 {
        if (!camera) {
            console.error("请传入有效的相机组件");
            return new Vec3();
        }

        // 1. 将屏幕坐标转换为NDC坐标（标准化设备坐标，范围[-1,1]）
        const ndcPos = new Vec3(
            (screenPos.x / camera.window.width) * 2 - 1,
            (screenPos.y / camera.window.height) * 2 - 1,
            0
        );

        // 2. 设置深度（NDC空间中z=0是近平面，z=1是远平面）
        // 这里根据传入的zDepth计算对应的NDC z值
        const near = camera.near;
        const far = camera.far;
        const ndcZ = (zDepth - near) / (far - near) * 2 - 1;
        ndcPos.z = ndcZ;

        // 3. 通过相机的视图投影逆矩阵转换为世界坐标
        const mat = camera.camera.matViewProj.clone();
        mat.invert();
        const worldPos = new Vec3();
        Vec3.transformMat4(worldPos, ndcPos, mat);

        return worldPos;
    }

    /**
     * 通过射线检测获取2D屏幕坐标对应的3D碰撞点
     * @param camera 用于发射射线的相机
     * @param screenPos 屏幕坐标
     * @returns 碰撞点的3D坐标（未碰撞到则返回null）
     */
    static screenToWorldByRaycast(camera: Camera, screenPos: Vec2): Vec3 | null {
        if (!camera) {
            console.error("请传入有效的相机组件");
            return null;
        }

        // 创建射线
        const ray = new geometry.Ray();
        camera.screenPointToRay(screenPos.x, screenPos.y, ray);

        // 射线检测
        if (PhysicsSystem.instance.raycast(ray)) {
            const hits = PhysicsSystem.instance.raycastResults;
            return hits[0].hitPoint.clone(); // 返回最近的碰撞点
        }

        return null;
    }
}
    