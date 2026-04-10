(function () {
  try {
    let obj = JSON.parse($response.body);
  
    if (obj.data?.data) {
      obj.data.data = obj.data.data.filter(i => {
        return !i.ad && !i.is_ad;
      });
    }
  
    // 去顶部banner
    if (obj.data?.banner) {
      delete obj.data.banner;
    }
  
    $done({ body: JSON.stringify(obj) });
  
  } catch (e) {
    $done({});
  }
})();
