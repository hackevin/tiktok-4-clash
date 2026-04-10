// 中国移动客户端去广告
// 原作者: chatgpt
// 版本: 2026-04-10

(function () {
  // 中国移动首页净化（思路级）
  body = JSON.parse($response.body);

  // 删除常见广告字段
  delete body.ads;
  delete body.adList;
  delete body.bannerList;
  delete body.activityList;

  // 过滤推荐位
  if (body.data && body.data.cards) {
    body.data.cards = body.data.cards.filter(i => !i.type.includes("ad"));
  }

  $done({body: JSON.stringify(body)});
})();
