import { Sprite, Texture2D, SpriteFrame, assetManager, error, warn, ImageAsset, macro, AssetManager } from 'cc';

export class NetworkImageLoader {
    /**
     * 加载网络图片并设置到 Sprite 组件
     * @param sprite 目标 Sprite 组件
     * @param url 图片网络地址
     * @param defaultFrame 加载失败时显示的默认图片
     */
    static loadToSprite(sprite: Sprite, url: string, defaultFrame?: SpriteFrame) {
        if (!url) {
            warn('图片URL不能为空');
            if (defaultFrame) sprite.spriteFrame = defaultFrame;
            return;
        }

        // 使用 assetManager 加载远程图片
        assetManager.loadRemote<Texture2D>(url, (err, texture) => {
            if (err) {
                error(`加载图片失败: ${url}`, err);
                if (defaultFrame) {
                    sprite.spriteFrame = defaultFrame;
                }
                return;
            }

            // 创建 SpriteFrame 并设置给 Sprite
            const spriteFrame = new SpriteFrame();
            spriteFrame.texture = texture!;
            sprite.spriteFrame = spriteFrame;
        });
    }

    /**
     * 预加载网络图片
     * @param url 图片网络地址
     * @returns Promise 对象，包含加载结果
     */
    static async preloadImage(url: string, ext:string = '.png'): Promise<SpriteFrame> {
        return new Promise((resolve) => {
            if (!url) {
                warn('图片URL不能为空');
                resolve(null);
                return;
            }
            //Qt modify
            assetManager.loadRemote<ImageAsset>(url, { ext }, (err, imageAsset:ImageAsset) => {
                if (err || !imageAsset) { // 加强判断
                    error(`预加载图片失败: ${url}`, err);
                    resolve(null);
                    return;
                }

                const texture = new Texture2D();
                texture.image = imageAsset;

                const spriteFrame = new SpriteFrame();
                spriteFrame.texture = texture;
                resolve(spriteFrame);
            });
        });
    }
    static async preloadImageAsset(url: string): Promise<SpriteFrame | null> {
        return new Promise((resolve) => {
            if (!url) {
                warn('图片URL不能为空');
                resolve(null);
                return;
            }

            assetManager.loadRemote<Texture2D>(url, (err, texture: Texture2D) => {
                if (err || !texture) { // 加强判断
                    error(`预加载图片失败: ${url}`, err);
                    resolve(null);
                    return;
                }
                const spriteFrame = new SpriteFrame();
                spriteFrame.texture = texture;
                resolve(spriteFrame);
            });
        });
    }
    

    /**
     * 批量预加载网络图片
     * @param urls 图片URL数组
     * @returns Promise 对象，包含所有加载结果
     */
    static async preloadImagesBatch(urls: string[]): Promise<(SpriteFrame | null)[]> {
        const promises = urls.map(url => this.preloadImage(url));
        return Promise.all(promises);
    }


    /**
     * 加载ZIP远程包
     * @param bundleName ZIP包名称（不含.zip后缀）
     * @returns 加载成功的AssetBundle实例
     */
    static async loadBundle(bundleName: string){
        try {
            console.log(`开始加载远程包: ${bundleName}.zip`);
            // 检查是否已加载
            const existingBundle = assetManager.getBundle(bundleName);
            if (existingBundle) {
                console.log(`远程包${bundleName}已加载，直接使用缓存`);
                return existingBundle;
            }
            // 加载并自动解压ZIP包
            const bundle = await assetManager.loadBundle(bundleName);
            
            console.log(`远程包${bundleName}.zip加载并解压成功`);
            return bundle;
        } catch (error) {
            console.error(`远程包${bundleName}.zip加载失败:`, error);
            throw error; // 向上传递错误，便于上层处理
        }
    }
    /**
     * 从远程包中加载具体资源
     * @param bundle 已加载的AssetBundle
     * @param path 资源在包内的相对路径（如"textures/icon"）
     * @param type 资源类型（如Texture2D、AudioClip等）
     * @returns 加载成功的资源
     */
    static async loadAsset<T>(bundle: AssetManager, path: string, type: new () => T) {
        try {
            console.log(`从远程包加载资源: ${path}`);
            const asset = await bundle.loadRemote(path, type);
            console.log(`资源${path}加载成功`);
            return asset;
        } catch (error) {
            console.error(`资源${path}加载失败:`, error);
            throw error;
        }
    }
}
    