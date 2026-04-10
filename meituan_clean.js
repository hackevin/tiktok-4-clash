(function () {
  let obj = JSON.parse($response.body);

  if (obj.data && obj.data.data) {
    obj.data.data = obj.data.data.filter(i => {
      return !i.hasOwnProperty("ad");
    });
  }

  $done({ body: JSON.stringify(obj) });
})();
