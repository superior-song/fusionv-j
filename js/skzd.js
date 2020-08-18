(function ($) {
  // 左侧导航栏交互

  $(".qt-control").on("click", function () {
    if (!$(this).find(".btn-icon_arrow").hasClass('bi-zk')) {
      $(this).find(".btn-icon_arrow").addClass("bi-zk");
      $(this)
          .parents(".left-panel")
          .find(".left_panel-inner")
          .addClass("move");
      $(this).parents(".left-panel").find(".add-ct").addClass("move");
      // $(this).addClass("move");
      $('#js_sf_id').text('折叠巡查分组')
      $(this)
          .parents(".left-panel")
          .find(".detail-qt").css({left: '160px'})
    } else {
      $(this).find(".btn-icon_arrow").removeClass("bi-zk");
      $(this).parents(".left-panel").find(".left_panel-inner").removeClass("move");
      $(this).parents(".left-panel").find(".add-ct").removeClass("move");
      // $(this).removeClass("move");
      $('#js_sf_id').text('展开巡查分组')
      $(this)
          .parents(".left-panel")
          .find(".detail-qt").css({left: '75px'})
    }
  });

  //轮播图
  var mySwiper = new Swiper("#screen-box", {
    direction: "horizontal",
    slidesPerView: "1",
    spaceBetween: 8,
  });
  $(".sk-left").on("click", function (e) {
    console.log("111");
    e.preventDefault();
    mySwiper.swipePrev();
  });
  $(".sk-right").on("click", function (e) {
    console.log("222");
    e.preventDefault();
    mySwiper.swipeNext();
  });

  // 关闭弹窗
  $(".pos-icons").on("click", function () {
    $(".skzd-set").removeClass("visibility");
  });
  $(".box-close").on("click", function () {
    $(this).parents(".skzd-set").addClass("visibility");
  });

  // 滚动条设置
  function showScroll() {
    // 判断niceScroll插件是否存在
    if (!$(".comp-list, .scroll-lp").niceScroll) return;
    $(".comp-list, .scroll-lp").niceScroll({
      cursorcolor: "rgba(0, 0, 0, 0)",
      cursorwidth: "6",
      cursorborderradius: "20",
      cursoropacitymin: "0",
      cursorborder: "0",
      hidecursordelay: 800,
      horizrailenabled: true,
      background: "",
      cursorfixedheight: "80",
    });
  }
  showScroll();

  // $(".lp_item-tag").on("contextmenu", function (e) {
  //   e.preventDefault();
  //   $(this)
  //     .parents(".lp-item")
  //     .siblings(".lp-item")
  //     .find(".wrap-contextmenu")
  //     .fadeOut();
  //   $(this).parents(".lp-item").find(".wrap-contextmenu").fadeIn();
  // });

  // $("body").on("click", function (e) {
  //   var target = $(e.target);
  //   if (!target.is(".wrap-contextmenu") && !target.is(".js-fly")) {
  //     $(".wrap-contextmenu").fadeOut();
  //   }
  // });

  var ofsX = $(window).width() - 200;
  var ofsY = $(window).height() - 120;
  $(window).resize(function () {
    var ofsX = $(window).width() - 200;
    var ofsY = $(window).height() - 120;
  });

  var flag = false;

  // 飞行效果
  $(document).on("click", ".js-fly", function (e) {
    if(!fly_flag){
      showWarn("系统正在轮巡，不可继续添加！")
      return false;
    }
    var imgSrc = $(this).attr("data-src");
    var imgTarget = $(this).attr("data-target");
    var allNum = $(this).attr("data-allNum");
    var thisNum = $(this).attr("data-thisNum");
    var task_id = $(this).attr("data-task_id");
    var data_names=$(this).attr("data_names");
    if (fly_arr.length < 8) {
      for (var i = 0; i < fly_arr.length; i++) {
        //判断当前播放ID
        if (fly_arr[i].task_id == task_id) {
          showWarn("该巡查组已添加到轮巡仓，不可继续添加！")
          return false;
        }
      }
      //前端全局变量添加
      fly_arr.push({
        task_id: task_id,
        imgTarget: imgTarget,
        imgSrc: imgSrc,
        flyIndexImg: parseInt($(this).attr("data-id")),
        glob_taks_id: "-1",
        glob_taks_id_num: fly_arr.length + 1,
        data_names:data_names
      });
       addVideo(task_id, thisNum, allNum,data_names);
    } else {
      showWarn("轮巡仓只能容纳八个！")
      return false;
    }


    var cont =
        "<div class=\"tip-hov\" id='"+task_id+"'>" +
        '<img class="js-trag" src=' +
        imgSrc +
        ">" +
        '<span class="xkt-info"><em> ' +
        thisNum +
        " </em>/"+ allNum +"</span>" +
        '<span class="tip_light-all js-sf">'+data_names+'</span>' +
        "</div>";
    flag = true;
    // $(this).parents(".wrap-contextmenu").fadeOut();
    $(this)
        .parents(".lp-item")
        .append('<img class="js-img" src=' + imgSrc + ">");
    $(this)
        .parents(".lp-item")
        .find(".js-img")
        .fly({
          start: {
            left: event.clientX, //开始位置（必填）#fly元素会被设置成position: fixed
            top: event.clientY //开始位置（必填）
          },
          end: {
            left: ofsX, //结束位置（必填）
            top: ofsY, //结束位置（必填）
            width: 0, //结束时高度
            height: 0, //结束时高度
          },
          autoPlay: true, //是否直接运动,默认true
          speed: 1.1, //越大越快，默认1.2
          vertex_Rtop: 240, //运动轨迹最高点top值，默认20
          onEnd: function () {
            $(".js-img").fadeOut();
            if ($(".btn-xkc-ct").hasClass("min")) {
              $(".min-box").empty();
              $(".min-box").append(cont);
              $(".jgg-model").find("li").each(function() {
                if ($(this).children('div').length <= 0) {
                  $(this).append(cont);
                  return false
                }
              })
              $(".animate_line").hide();
            } else {
              $(".jgg-model").find("li").each(function() {
                if ($(this).children('div').length <= 0) {
                  $(this).append(cont);
                  return false
                }
              })
              //$(".animate_line").fadeIn();
            }

            var startleft = 0;
            var starttop = 0;
            $(".js-trag").draggable({
              start: function () {
                //为两个变量设置被拖动图片的初始坐标
                startleft = $(this).offset().left;
                starttop = $(this).offset().top;
              },
              stop: function () {

                if (!fly_flag) {
                  showWarn("系统正在轮巡，不可查询巡查组！")
                  //复位
                  $(this).offset({
                    left: startleft,
                    top: starttop,
                  });
                } else{
                  var box = $(this).parents(".js-cells");
                  if (
                      $(this).offset().left < box.offset().left + box.width() ||
                      $(this).offset().top < box.offset().top + box.height()
                  ) {
                    $(this).offset({
                      left: startleft,
                      top: starttop,
                    });

                    $(".animate_line").hide();
                    $(".tip-panel").show();

                    var _this = $(this);

                    $(".js-del-sure").off("click");
                    $(".js-del-sure").on("click", function () {


                      _this.parent().remove();
                      $(".tip-panel").hide();
                      var this_taskid = _this.parent().attr('id')

                      //移除
                      removeByVal(fly_arr, this_taskid);
                      delVideo(this_taskid);
                    });
                    $(".js-del-cancel, .js-del-tip").on("click", function () {
                      $(".tip-panel").hide();
                    });
                  } else {
                    //复位
                    $(this).offset({
                      left: startleft,
                      top: starttop,
                    });
                  }
                }
              },
            });
          }, //结束回调
        });
  });

  // 巡控仓 -放大缩小
  $(".btn-xkc-ct").on("click", function () {
    var _this = $(this);
    if (_this.hasClass("min")) {
      _this.removeClass("min");
      $(".xck-mode").removeClass("small-box");
      $(".jgg-model").find("li").fadeIn();

      /*if (flag) {
        $(".animate_line").fadeIn();
      }*/
      $(".min-box").hide();
      $(".min-box").empty();
      $('.logo-xkc').removeClass('min')
      //跑马线控制
      if(animate_line_is){
        $(".animate_line").fadeIn();
      }else{
        $(".animate_line").hide();
      }
    } else {
      _this.addClass("min");
      $(".xck-mode").addClass("small-box");
      $(".animate_line").hide();
      $(".jgg-model").find("li").hide();
      $(".min-box").fadeIn();
      $('.logo-xkc').addClass('min')

      var glob_taks_id=""
      for(var i ;i<fly_arr.length;i++){
        if(fly_arr[i].glob_taks_id!="-1"){
          glob_taks_id=fly_arr[i].glob_taks_id;
        }
      }

      if(glob_taks_id!="") {
        $(".min-box").html("<div class=\"tip-hov\" id='"+glob_taks_id+"'>"+$("#"+glob_taks_id).html()+"</div>");
      }else{
        if(fly_arr.length>0){
          var ss = fly_arr[0].task_id;
          $(".min-box").html("<div class=\"tip-hov\" id='"+ss+"'>"+$("#"+ss).html()+"</div>");
        }
      }


    }
  });

  $(".js-qt-close").on("click", function () {
    $(this).parents(".detail-qt").fadeOut();
  });

  $(document).on("click", ".lp_item-state", function () {
    var num = $(this).attr("data-num");
    var txt = $(this).attr("data-txt");
    var offtX = $(this).parents(".lp-item").offset().left + 160;
    var offtY = $(this).parents(".lp-item").offset().top - 110;

    console.log(offtY);
    $(".js-data1").text(num);
    $(".js-data2").text(txt);
    $(this)
        .parents(".left-panel")
        .find(".detail-qt")
        .css({ top: offtY, left: offtX });
    $(this).parents(".left-panel").find(".detail-qt").fadeIn();


  });

  $('.btn-look-intro').on("click", function () {
    $('.system-introduce').fadeIn()
  });
  // zq()

  $('.system-introduce .icon-close').on("click", function () {
    $('.system-introduce').fadeOut()
  });

  // 播放
  $('#begin1').on("click", function () {
    if ($(this).find('i').hasClass('stop')) {
      $(this).find('i').removeClass('stop')
      $(".animate_line").hide();
      $('.js-play').text('开始轮巡 ')
    } else {
      $(this).find('i').addClass('stop');
      $(".animate_line").fadeIn();
      $('.js-play').text('停止轮巡')
    }
  });
  function zq() {
    var list = $("#content").find("li"),
        len = list.length,
        begin = $("#begin"),
        index = 0,
        interval = null;

    if (this.running) return;
    this.running = true;
    this.remain = 3000 + Math.random() * 5000;
    interval = setInterval(function () {
      list[index].className = "";
      list[(index + 1) % len].className = "current";
      index = ++index % len;
      begin.remain -= 100;
    }, 200);
  }
})(jQuery);
