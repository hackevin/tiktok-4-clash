(function () {
  try {
    let obj = JSON.parse($response.body);
  
    if (obj.data?.items) {
      obj.data.items = obj.data.items.filter(i => {
        return !i.ad_info && !i.card_goto?.includes("ad");
      });
    }
  
    // 去 banner
    if (obj.data?.banner) {
      delete obj.data.banner;
    }
  
    $done({ body: JSON.stringify(obj) });
  
  } catch (e) {
    $done({});
  }
})();
