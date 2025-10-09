import { Node, Sprite, find, error, warn } from 'cc';

export class SpriteUtils {
    /**
     * 通过节点获取自身的 Sprite 组件
     * @param node 目标节点
     * @returns Sprite 组件或 null
     */
    static getSpriteFromNode(node: Node): Sprite | null {
        if (!node) {
            warn("节点为空，无法获取 Sprite 组件");
            return null;
        }

        const sprite = node.getComponent(Sprite);
        if (!sprite) {
            warn(`节点 ${node.name} 上没有 Sprite 组件`);
        }
        return sprite;
    }

    /**
     * 通过节点路径查找 Sprite 组件
     * @param path 节点路径（如 "Canvas/ImageNode"）
     * @returns Sprite 组件或 null
     */
    static getSpriteByPath(path: string): Sprite | null {
        const node = find(path);
        if (!node) {
            error(`找不到路径为 ${path} 的节点`);
            return null;
        }

        return this.getSpriteFromNode(node);
    }

    /**
     * 在节点及其子节点中查找第一个 Sprite 组件
     * @param rootNode 根节点
     * @returns Sprite 组件或 null
     */
    static findSpriteInChildren(rootNode: Node): Sprite | null {
        if (!rootNode) {
            warn("根节点为空，无法查找 Sprite 组件");
            return null;
        }

        return rootNode.getComponentInChildren(Sprite);
    }

    /**
     * 确保节点上存在 Sprite 组件（如果没有则添加）
     * @param node 目标节点
     * @returns 已存在或新添加的 Sprite 组件
     */
    static ensureSpriteComponent(node: Node): Sprite {
        if (!node) {
            throw new Error("节点为空，无法添加 Sprite 组件");
        }

        let sprite = node.getComponent(Sprite);
        if (!sprite) {
            sprite = node.addComponent(Sprite);
            console.log(`节点 ${node.name} 上已自动添加 Sprite 组件`);
        }
        return sprite;
    }
}
