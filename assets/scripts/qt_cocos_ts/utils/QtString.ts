/**
     // 使用示例
    const testUrls = [
        "https://example.com/textures/skybox/right.png",
        "http://test.com/images/bg.jpg?width=1024",
        "https://cdn.com/models/model1.glb#part1",
        "https://example.com/data/file",
        "https://example.com/folder/"
    ];

    testUrls.forEach(url => {
        const result = getSuffixFromUrl(url);
        console.log(`URL: ${url}`);
        console.log(`文件名: ${result.name}, 后缀: ${result.suffix}\n`);
    });
 */
export class QtString {
    /**
     * 从URL中提取文件名和后缀
     * @param url 目标URL
     * @returns 包含文件名和后缀的对象，若没有后缀则suffix为''
     */
    static getSuffixFromUrl(url: string): { name: string, suffix: string } {
        // 处理URL中的查询参数和哈希值
        let processedUrl = url.split('?')[0].split('#')[0];
        
        // 找到最后一个斜杠的位置，提取文件名部分
        const lastSlashIndex = processedUrl.lastIndexOf('/');
        const fileNameWithSuffix = lastSlashIndex !== -1 
            ? processedUrl.substring(lastSlashIndex + 1) 
            : processedUrl;
        
        // 处理没有文件名的情况（如URL以斜杠结尾）
        if (!fileNameWithSuffix) {
            return { name: '', suffix: '' };
        }
        
        // 找到最后一个点的位置，分离文件名和后缀
        const lastDotIndex = fileNameWithSuffix.lastIndexOf('.');
        if (lastDotIndex === -1) {
            // 没有后缀的情况
            return { name: fileNameWithSuffix, suffix: '' };
        }
        
        // 有后缀的情况
        const name = fileNameWithSuffix.substring(0, lastDotIndex);
        const suffix = fileNameWithSuffix.substring(lastDotIndex + 1);
        
        return { name, suffix };
    }
}