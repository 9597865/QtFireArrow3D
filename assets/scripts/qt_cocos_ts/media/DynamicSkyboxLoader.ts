import { director, TextureCube, Material, Scene, resources, Texture2D, ImageAsset } from 'cc';

/**
 * 动态天空盒加载器
 * 支持从本地资源和网络加载天空盒图片并应用到场景
 */
export class DynamicSkyboxLoader {
    

    
    /**
     * 从6个Texture2D对象创建立方体贴图
     * @param textures 6个面的Texture2D数组，顺序：[右, 左, 上, 下, 前, 后]
     * @returns 创建的立方体贴图对象
     */
    static createCubeMapFromTextures(textureObject: Object): TextureCube | null {
        if (Object.keys(textureObject).length !== 6) {
            console.error("需要提供6个Texture2D对象");
            return null;
        }

        try {
            const textures = new Array<Texture2D>(6);
            textures[TextureCube.FaceIndex.front] = textureObject['frontImage'];
            textures[TextureCube.FaceIndex.back] = textureObject['backImage'];
            textures[TextureCube.FaceIndex.left] = textureObject['leftImage'];
            textures[TextureCube.FaceIndex.right] = textureObject['rightImage'];
            textures[TextureCube.FaceIndex.top] = textureObject['topImage'];
            textures[TextureCube.FaceIndex.bottom] = textureObject['bottomImage'];
            const cubeTexture = TextureCube.fromTexture2DArray(textures); 
            console.log("立方体贴图创建成功");
            return cubeTexture;
        } catch (error) {
            console.error("从Texture2D创建立方体贴图失败:", error);
            return null;
        }
    }
    /**
     * 将立方体贴图应用到场景天空盒
     * @param cubeTexture 立方体贴图
     */
    // static applyToSkybox(cubeTexture: TextureCube) {
    //     const scene = director.getScene() as Scene;
    //     if (!scene) {
    //         console.error("无法获取当前场景");
    //         return;
    //     }

    //     // 创建或获取天空盒材质
    //     let skyboxMaterial = scene.env.skyboxMaterial;
    //     if (!skyboxMaterial) {
    //         skyboxMaterial = new Material();
    //         skyboxMaterial.initialize({ effectName: 'skybox' });
    //     }

    //     // 设置材质属性并应用
    //     skyboxMaterial.setProperty('cubeMap', cubeTexture);
    //     scene.env.skyboxMaterial = skyboxMaterial;
    //     scene.env.reflectionTexture = cubeTexture; // 更新反射纹理

    //     console.log("天空盒已更新");
    // }

    
}

// 使用示例
// 1. 从本地加载
// DynamicSkyboxLoader.loadFromLocal("textures/skyboxes/mountain");

// 2. 从网络加载
// const skyboxUrls = [
//     "https://example.com/sky/right.jpg",
//     "https://example.com/sky/left.jpg",
//     "https://example.com/sky/top.jpg",
//     "https://example.com/sky/bottom.jpg",
//     "https://example.com/sky/front.jpg",
//     "https://example.com/sky/back.jpg"
// ];
// DynamicSkyboxLoader.loadFromNetwork(skyboxUrls);

// 3. 清除天空盒
// DynamicSkyboxLoader.clearSkybox();
    