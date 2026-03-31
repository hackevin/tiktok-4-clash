// duolingo_cn.js
// 适用于 ios-api-2.duolingo.cn，修改用户数据解锁无限体力

var body = $response.body;
var obj = JSON.parse(body);

// 解锁 Plus
obj.hasPlus = true;

// 无限体力
if (obj.health) {
    obj.health.useHealth = false;
    obj.health.unlimitedHeartsAvailable = true;
    obj.health.hearts = obj.health.maxHearts || 5;
    obj.health.eligibleForFreeRefill = false;
    obj.health.secondsUntilNextHeartSegment = null;
}

// 关闭各课程的体力开关
if (obj.courses) {
    obj.courses.forEach(function(course) {
        course.healthEnabled = false;
    });
}

$done({ body: JSON.stringify(obj) });
