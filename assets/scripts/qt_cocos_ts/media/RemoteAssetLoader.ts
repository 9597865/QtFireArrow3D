import { assetManager, Texture2D, AudioClip, SpriteFrame, ImageAsset, error, warn, Asset } from 'cc';
/**
 // 加载网络图片为纹理
const texture = await RemoteAssetLoader.loadTexture("https://example.com/image.png");

// 加载并直接获取SpriteFrame
const spriteFrame = await RemoteAssetLoader.loadSpriteFrame("https://example.com/bg.png");
if (spriteFrame) {
    this.spriteComponent.spriteFrame = spriteFrame;
}

// 加载音频
const audioClip = await RemoteAssetLoader.loadAudio("https://example.com/bgm.mp3");

// 加载文本
const textContent = await RemoteAssetLoader.loadText("https://example.com/config.json");


// 带进度回调和超时设置的加载
const texture = await RemoteAssetLoader.loadTexture(
    "https://example.com/large-image.png",
    {
        ext: 'png',
        crossOrigin: 'use-credentials', // 带凭据的跨域请求
        onProgress: (loaded, total) => {
            console.log(`加载进度: ${Math.floor(loaded/total*100)}%`);
        },
        timeout: 10000 // 超时时间（毫秒）
    }
);

// 批量加载图片
const imageUrls = [
    "https://example.com/img1.png",
    "https://example.com/img2.png"
];
const textures = await RemoteAssetLoader.batchLoad(
    imageUrls,
    Texture2D
);
 */
export class RemoteAssetLoader {
    /**
     * 加载远程纹理（Texture2D）
     * @param url 资源URL
     * @param options 加载选项
     * @returns 加载的Texture2D或null
     */
    static async loadTexture(
        url: string,
        options: Record<string, any> = {}
    ): Promise<Texture2D | null> {
        return this.loadRemoteAsset<Texture2D>(url, { ext: 'png', ...options });
    }

    /**
     * 加载远程音频（AudioClip）
     * @param url 资源URL
     * @param options 加载选项
     * @returns 加载的AudioClip或null
     */
    static async loadAudio(
        url: string,
        options: Record<string, any> = {}
    ): Promise<AudioClip | null> {
        return this.loadRemoteAsset<AudioClip>(url, { ext: 'mp3', ...options });
    }

    /**
     * 加载远程图片并转为SpriteFrame
     * @param url 资源URL
     * @param options 加载选项
     * @returns 生成的SpriteFrame或null
     */
    static async loadSpriteFrame(
        url: string,
        options: Record<string, any> = {}
    ): Promise<SpriteFrame | null> {
        const texture = await this.loadTexture(url, options);
        if (!texture) return null;

        const spriteFrame = new SpriteFrame();
        spriteFrame.texture = texture;
        return spriteFrame;
    }

    /**
     * 加载远程ImageAsset
     * @param url 资源URL
     * @param options 加载选项
     * @returns 加载的ImageAsset或null
     */
    static async loadImageAsset(
        url: string,
        options: Record<string, any> = {}
    ): Promise<ImageAsset | null> {
        return this.loadRemoteAsset<ImageAsset>(url, { ext: 'png', ...options });
    }

    /**
     * 加载远程文本资源
     * @param url 资源URL
     * @returns 文本内容或null
     */
    static async loadText(url: string): Promise<string | null> {
        return new Promise((resolve) => {
            if (!url) {
                warn('文本URL不能为空');
                resolve(null);
                return;
            }

            assetManager.loadRemote<string>(url, (err, content:string) => {
                if (err || !content) {
                    error(`加载文本失败: ${url}`, err);
                    resolve(null);
                    return;
                }
                resolve(content);
            });
        });
    }

    /**
     * 通用远程资源加载方法
     * @param url 资源URL
     * @param options 加载选项
     * @returns 加载的资源或null
     */
    static async loadRemoteAsset<T extends Asset>(
        url: string,
        options: Record<string, any> = {}
    ): Promise<T | null> {
        return new Promise((resolve) => {
            if (!url) {
                warn('资源URL不能为空');
                resolve(null);
                return;
            }

            // 默认选项：处理跨域
            const loadOptions = {
                crossOrigin: 'anonymous',
                ...options
            };

            assetManager.loadRemote<T>(url, loadOptions, (err, asset) => {
                if (err || !asset) {
                    error(`加载远程资源失败: ${url}`, err);
                    resolve(null);
                    return;
                }

                resolve(asset);
            });
        });
    }

    /**
     * 批量加载远程资源
     * @param urls 资源URL数组
     * @param type 资源类型
     * @returns 资源数组（失败项为null）
     */
    static async batchLoad<T extends Asset>(
        urls: string[],
        type: new () => T,
        options: Record<string, any> = {}
    ): Promise<(T | null)[]> {
        const promises = urls.map(url => this.loadRemoteAsset<T>(url, options));
        return Promise.all(promises);
    }
}
