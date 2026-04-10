(function () {
  let obj = JSON.parse($response.body);

  if (obj.data && obj.data.items) {
    obj.data.items = obj.data.items.filter(item => {
      return !item.hasOwnProperty("ad_info");
    });
  }

  $done({ body: JSON.stringify(obj) });
})();
