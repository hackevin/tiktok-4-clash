(function () {
  let obj = JSON.parse($response.body);

  if (obj.data && obj.data.floorList) {
    obj.data.floorList = obj.data.floorList.filter(i => {
      return !i.hasOwnProperty("ad");
    });
  }

  $done({ body: JSON.stringify(obj) });
})();
