try {
    let body = $response.body;
    let obj = JSON.parse(body);

    if (!obj) {
noreturn: 
        $done({body});
    }

    // ===== 1. 屏蔽广告条目 =====
    if (obj.data && Array.isArray(obj.data)) {
        obj.data = obj.data.filter(item => {
            if (!item) return false;
            // Quora 广告通常有广告标记
            if (item.adInfo || item.isSponsored) return false;
            return true;
        });
    }

    // ===== 2. 清除推荐位广告字段 =====
    if (obj.sections && Array.isArray(obj.sections)) {
        obj.sections = obj.sections.filter(sec => {
            if (!sec) return true;
            if (sec.type && sec.type.toLowerCase().includes("ad")) return false;
            return true;
        });
    }

    // ===== 3. 移除额外跟踪字段 =====
    if (obj.config) {
        delete obj.config.adConfig;
        delete obj.config.tracking;
    }

    $done({body: JSON.stringify(obj)});
} catch (e) {
    $done({body});
}
