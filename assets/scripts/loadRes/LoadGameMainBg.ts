import { _decorator, Camera, Color, Component, director, find, Layers, Material, MeshRenderer, Node, Quat, sp, Sprite, SpriteFrame, Texture2D, UITransform, utils, Vec2, Vec3, view } from 'cc';
import { NetworkImageLoader } from '../qt_cocos_ts/media/NetworkImageLoader';
const { ccclass, property } = _decorator;

@ccclass('LoadGameMainBg')
export class LoadGameMainBg extends Component {
    start() {
        console.log("LoadGameMainBg start");


        // 获取当前窗口（游戏视图）实际尺寸
        const viewSize = view.getVisibleSize();
        console.log(`运行时尺寸: ${viewSize.width}x${viewSize.height}`);

        // this.loadPicToSprite(); 

    }

    update(deltaTime: number) {
        
    }
    // 将纹理应用到 3D 平面
    
    private loadPicToSprite() {
        let bgUrl:string = "https://www.qiter.com/cocos/arrow3d/images/planeBg.jpg";
        NetworkImageLoader.preloadImage(bgUrl).then(spriteFrame=>{
            const meshRenderer = this.node.getComponent(MeshRenderer);
            console.log("meshRenderer", meshRenderer);
            if (meshRenderer) {
                const mat:Material = meshRenderer.materials[0];
                console.log("mat", mat);
                mat.setProperty('mainColor', Color.WHITE);
                mat.setProperty('mainTexture', spriteFrame.texture);
                let w = spriteFrame.texture.width
                let h = spriteFrame.texture.height
                const originalRatio = 1280 / 720;
                console.log("originalRatio=", originalRatio);
                console.log("w=", w/1280);
                console.log("h=", h/720);
                this.node.setScale(new Vec3(originalRatio, originalRatio, 1 ));
            }
        })
    }
    /**
     * 创建默认材质
     * @param meshRenderer 网格渲染器
     * @param color 颜色
     */
    private createDefaultMaterial(meshRenderer: MeshRenderer, color?: Color) {
        // 创建基础材质（使用内置的标准材质）
        const material = new Material();
        material.initialize({
            // effectName: 'builtin-standard',
            effectName: 'builtin-unlit',
            defines: {
               USE_RGBE_CUBEMAP: true
            } 
        });
        // 使用 setProperty 方法设置材质属性
        material.setProperty('albedoColor', color || new Color(200, 200, 200));
        material.setProperty('metallic', 0);
        material.setProperty('roughness', 0.8);
        // meshRenderer.setMaterial(material, 0);
    }
    
}

