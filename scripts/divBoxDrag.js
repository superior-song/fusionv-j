/**
 * 
 */
// 初始化弹窗位置
function initBoxPos(box) {
    var  winH=0;
    var _iframe=parent.document.getElementById('right_body');
    if(_iframe!=null)
        winH = window.parent.innerHeight-100;
    else
        winH = window.parent.innerHeight;
    var winW = window.innerWidth;
 //   var winH = window.parent.innerHeight;
    var boxW =  box.offsetWidth;
    var boxH =  box.offsetHeight;
    box.style.left = (winW - boxW) / 2 + 'px';
    box.style.top = (winH - boxH) / 2 + 'px';
}
// 弹出窗任意拖动
function dragBox(box){
    box.onmousedown = function(e){
        var e = e || window.event;

        // 获取鼠标点击位置相对于弹窗left和top的位移
        var diffX = e.clientX - box.offsetLeft;
        var diffY = e.clientY - box.offsetTop;

        // 鼠标移动事件
        document.onmousemove = function(e) {
            var e = e || window.event;

            //根据鼠标点击位置相对于弹窗的位移来计算弹窗当前的left,top值
            if(diffY <= 28){

                var left = e.clientX - diffX;
                var top = e.clientY - diffY;

                if(left < 0) {
                    left = 0;
                } else if(left > window.innerWidth - box.offsetWidth){
                    left = window.innerWidth - box.offsetWidth;
                }

                if(top < 0) {
                    top = 0;
                } else if(top > window.innerHeight - box.offsetHeight){
                    top = window.innerHeight - box.offsetHeight;
                }

                box.style.left = left + 'px';
                box.style.top = top + 'px';
            }

        }
        document.onmouseup = function() {
            this.onmousemove = null;
            this.onmouseup = null;
        }
    }
}