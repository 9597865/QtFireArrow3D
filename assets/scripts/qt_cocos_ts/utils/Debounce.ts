/**
 * // 创建防抖处理函数（300ms延迟）
        const debouncedClick = debounce(this.onButtonClick.bind(this), 300);
        
        // 绑定防抖函数到按钮点击事件
        this.clickButton.node.on(Node.EventType.TOUCH_END, debouncedClick);
        
        // 或者使用立即执行模式（适合防止重复提交）
        // const debouncedSubmit = debounce(this.onSubmit.bind(this), 500, true);
 */
/**
 * 防抖函数 - 确保在指定时间间隔内只执行一次回调
 * @param callback 需要防抖的回调函数
 * @param delay 防抖延迟时间（毫秒）
 * @param immediate 是否立即执行（true: 首次触发立即执行，false: 延迟后执行）
 * @returns 包装后的防抖函数
 */
export function debounce<T extends (...args: any[]) => void>(
    callback: T, 
    delay: number = 300, 
    immediate: boolean = false
): T {
    let timer: number | null = null;
    
    // 使用箭头函数保持this上下文
    const debounced = function(this: any, ...args: any[]) {
        // 如果有定时器在运行，清除它
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
        
        // 如果是立即执行模式且没有定时器在运行
        if (immediate && !timer) {
            callback.apply(this, args);
        }
        
        // 设置新的定时器
        timer = setTimeout(() => {
            if (!immediate) {
                callback.apply(this, args);
            }
            timer = null;
        }, delay) as unknown as number;
    } as unknown as T;
    
    // 添加取消方法
    (debounced as any).cancel = () => {
        if (timer !== null) {
            clearTimeout(timer);
            timer = null;
        }
    };
    
    return debounced;
}