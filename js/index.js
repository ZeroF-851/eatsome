$(function () {
  var run = 0,
    heading = $("h1"),
    timer,
    jsonData;
  var foodInAddress = null;

  $.ajax({
    type: "GET",
    url: "./json/index.json",
    dataType: "json",
    success: function (result) {
      jsonData = result;
    },
  });

  $("#start").click(function () {
    var list = [];
    var noMapGoodTypeArr = [
      "凉菜",
      "锅底口味",
      "饮料",
      "盲盒装",
      "自提必点",
      "自提打包餐具选择",
      "必选荤菜",
      "自选口味",
      "必选主食",
      "自选搭配",
      "自选荤素",
      "蔬菜选择",
      "加肉蓉面",
      "另加菜品",
      "自选主食",
      "两种荤菜自选",
    ];
    var noMapGoodNameArr = [
      "自提打包餐盒选择",
      "醋",
      "辣椒油",
      "米饭(一次下单免费加米)",
      "打包餐具选择",
      "一元区",
      "2元区",
      "主食",
    ];
    jsonData.map((v) => {
      if (v.shop_name.indexOf("暂不上线") != -1) return;
      v.data.item_list.map((goodType) => {
        if (noMapGoodTypeArr.includes(goodType.tag_name)) return;
        goodType.goods_list.map((good) => {
          if (noMapGoodNameArr.includes(good.goods_name)) return;
          good.service_tel = v.service_tel;
          good.self_take_address = v.self_take_address;
          list.push(good);
        });
      });
    });
    if (!run) {
      heading.html(heading.html().replace("吃这个！", "吃什么？"));
      $(this).val("停止");
      timer = setInterval(function () {
        var r = Math.ceil(Math.random() * list.length),
          food =
            list[r - 1].tag_name +
            "：" +
            list[r - 1].goods_name +
            list[r - 1].detail;
        foodInAddress = list[r - 1].self_take_address;
        console.log(foodInAddress);
        $("#what").html(food);
        var rTop = Math.ceil(Math.random() * $(document).height()),
          rLeft = Math.ceil(Math.random() * ($(document).width() - 50)),
          rSize = Math.ceil(Math.random() * (37 - 14) + 14);
        $("<span class='temp'></span>")
          .html(food)
          .hide()
          .css({
            top: rTop,
            left: rLeft,
            color: "rgba(0,0,0,." + Math.random() + ")",
            fontSize: rSize + "px",
          })
          .appendTo("body")
          .fadeIn("slow", function () {
            $(this).fadeOut("slow", function () {
              $(this).remove();
            });
          });
      }, 50);
      run = 1;
    } else {
      $("#showFoodInAddress").val("选好了到这吃呗~   " + foodInAddress);
      heading.html(heading.html().replace("吃什么？", "吃这个！"));
      $(this).val("不行，换一个");
      $("#showFoodInAddress").show();

      clearInterval(timer);
      run = 0;
    }
  });

  document.onkeydown = function enter(e) {
    var e = e || event;
    if (e.keyCode == 13) $("#start").trigger("click");
  };
});
$i = 0;
$("#start").click(function () {
  $i++;
  if ($i >= 10) {
    $("#start").hide();
    $("#stop").show();
    $("#showFoodInAddress").hide();
  } else {
    $("#showFoodInAddress").hide();
  }
});
$("#stop").click(function () {
  alert("再选下去，食堂都要关门了，厨子都要跑路了~ ，刷新下，再试试呗");
  $(this).hide();
});
