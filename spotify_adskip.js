// spotify_adskip.js
// 过滤 Spotify iOS 播放队列中的广告 track

var body = $response.body;

if (!body || body.length === 0) {
    $done({});
    return;
}

try {
    var obj = JSON.parse(body);

    // 过滤 pages 中的广告 track
    if (obj && obj.pages) {
        obj.pages = obj.pages.map(function(page) {
            if (page && page.tracks) {
                page.tracks = page.tracks.filter(function(track) {
                    // 广告 track 的 provider 或 metadata 含有 ad 标识
                    if (!track) return false;
                    var provider = (track.provider || '').toLowerCase();
                    var reason = (track.reason || '').toLowerCase();
                    var isAd = provider.indexOf('ad') !== -1 || reason === 'ad';
                    return !isAd;
                });
            }
            return page;
        });
    }

    // 过滤 next_tracks 中的广告
    if (obj && obj.next_tracks) {
        obj.next_tracks = obj.next_tracks.filter(function(track) {
            if (!track) return false;
            var provider = (track.provider || '').toLowerCase();
            return provider.indexOf('ad') === -1;
        });
    }

    $done({ body: JSON.stringify(obj) });

} catch(e) {
    // JSON 解析失败时透传原始响应（防止破坏正常播放）
    $done({});
}
