/**
*  by Mantou qq:676015863
*  数字滚动插件 v1.0
*/
;(function($) {
  $.fn.numberAnimate = function(setting) {
    var defaults = {
      speed : 1000,      // 动画速度
      num : '',          // 初始化值
      iniAnimate : true, // 是否要初始化动画效果
      symbol : '',       // 默认的分割符号，千，万，千万
      dot : 0,           // 保留几位小数点
      minBits : ''       // 数字最小位数
    }
    // 如果setting为空，就取default的值
    var setting = $.extend(defaults, setting);
  
    // 如果对象有多个，提示出错
    if($(this).length > 1){
      alert('just only one obj!');
      return;
    }
  
    // 如果未设置初始化值。提示出错
    if(setting.num == ''){
      alert('must set a num!');
      return;
    }

    // 如果未设置最小位数,则默认是初始化值的位数
    if(setting.minBits == ''){
      setting.minBits = setting.num.length;
    }
    var nHtml = '<div class="mt-number-animate-dom" data-num="{{num}}">\
            <span class="mt-number-animate-span">0</span>\
            <span class="mt-number-animate-span">1</span>\
            <span class="mt-number-animate-span">2</span>\
            <span class="mt-number-animate-span">3</span>\
            <span class="mt-number-animate-span">4</span>\
            <span class="mt-number-animate-span">5</span>\
            <span class="mt-number-animate-span">6</span>\
            <span class="mt-number-animate-span">7</span>\
            <span class="mt-number-animate-span">8</span>\
            <span class="mt-number-animate-span">9</span>\
            <span class="mt-number-animate-span">.</span>\
          </div>';
  
    //数字处理
    var numToArr = function(num){
      num = parseFloat(num).toFixed(setting.dot);

      var len = num.toString().length;
      while(len < setting.minBits) {
        num = '0' + num;
        len++;
      }

      // var zeroNum = '';
      // for(var i=0; i<setting.zero; i++) {
      //   zeroNum += '0';
      // }
      // num = zeroNum + num;

      if(typeof(num) == 'number'){
        var arrStr = num.toString().split('');
      }else{
        var arrStr = num.split('');
      }
      //console.log(arrStr);
      return arrStr;
    }
  
    //设置DOM symbol:分割符号
    var setNumDom = function(arrStr){
      var shtml = '<div class="mt-number-animate">';
      for(var i=0,len=arrStr.length; i<len; i++){
        if(i != 0 && (len-i)%4 == 0 && setting.symbol != '' && arrStr[i]!='.'){
          shtml += '<div class="mt-number-animate-dot">'+setting.symbol+'</div>'+nHtml.replace("{{num}}",arrStr[i]);
        }else{
          shtml += nHtml.replace('{{num}}',arrStr[i]);
        }
      }
      shtml += '</div>';
      return shtml;
    }
  
    //执行动画
    var runAnimate = function($parent){
      $parent.find('.mt-number-animate-dom').each(function() {
        var num = $(this).attr("data-num");
        num = (num=='.'?10:num);
        var spanHei = $(this).height()/11; //11为元素个数
        var thisTop = -num*spanHei+'px';
        if(parseInt(thisTop) != $(this).css('top')){
          if(setting.iniAnimate){
            //HTML5不支持
            if(!window.applicationCache){
              $(this).animate({
                top : thisTop
              }, setting.speed);
            }else{
              $(this).css({
                'transform':'translateY('+thisTop+')',
                '-ms-transform':'translateY('+thisTop+')',   /* IE 9 */
                '-moz-transform':'translateY('+thisTop+')',  /* Firefox */
                '-webkit-transform':'translateY('+thisTop+')', /* Safari 和 Chrome */
                '-o-transform':'translateY('+thisTop+')',
                '-ms-transition':setting.speed/1000+'s',
                '-moz-transition':setting.speed/1000+'s',
                '-webkit-transition':setting.speed/1000+'s',
                '-o-transition':setting.speed/1000+'s',
                'transition':setting.speed/1000+'s'
              }); 
            }
          }else{
            setting.iniAnimate = true;
            $(this).css({
              top : thisTop
            });
          }
        }
      });
    }
  
    //初始化
    var init = function($parent){
      //初始化
      $parent.html(setNumDom(numToArr(setting.num)));
      runAnimate($parent);
    };
  
    //重置参数
    this.resetData = function(num){
      var newArr = numToArr(num);
      var $dom = $(this).find('.mt-number-animate-dom');
      //console.log($dom.length)
      if($dom.length < newArr.length){
        $(this).html(setNumDom(numToArr(num)));
      } else if($dom.length > newArr.length) {
        $(this).html(setNumDom(numToArr(num)));
      } else {
        $dom.each(function(index, el) {
          $(this).attr('data-num',newArr[index]);
        });
      }
      runAnimate($(this));
    }

    init($(this));
    return this;
  }
})(jQuery);

var numRun1;
var nums1;
var numRun2;
var nums2;
$(function(){

  //初始化
  numRun1 = $('#top1').numberAnimate({num:'0000',minBits:4, speed:800, symbol:''});
  nums1 = 0000;

  numRun2 = $('#top2').numberAnimate({num:'000000',minBits:6, speed:800, symbol:''});
  nums2 = 000000;
  /*setInterval(function(){
    nums1+= 1;
    numRun1.resetData(nums1);

    nums2+= 1;
    numRun2.resetData(nums2);
  },2000);*/1

});

function numAdd(){
  nums1+= 1;
  numRun1.resetData(nums1);

  nums2+= 1;
  numRun2.resetData(nums2);
}