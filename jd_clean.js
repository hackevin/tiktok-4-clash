(function () {
  try {
    let obj = JSON.parse($response.body);
  
    if (obj.data?.floorList) {
      obj.data.floorList = obj.data.floorList.filter(i => {
        return !i.ad && !i.bizCode?.includes("ads");
      });
    }
  
    // 搜索广告
    if (obj.data?.searchm?.Paragraph) {
      obj.data.searchm.Paragraph = obj.data.searchm.Paragraph.filter(i => {
        return !i.ad;
      });
    }
  
    $done({ body: JSON.stringify(obj) });
  
  } catch (e) {
    $done({});
  }
})();
