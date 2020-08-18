(function($) {
        //进度条加载提示
        function setLoad(){
            var t = $('.progressbar');
            dataperc = t.attr('data-perc'),
            barperc = Math.round(dataperc*5.56);
            t.find('.bar').animate({width:barperc}, dataperc*25);
            t.find('.label').append('<div class="perc"></div>');
            
            function perc(){
                var length = t.find('.bar').css('width'),
                perc = Math.round(parseInt(length)/5.56),
                labelpos = (parseInt(length)-2);
                t.find('.label').css('left', labelpos);
                t.find('.perc').text(perc +'%');

                if(perc >= 100){
                    $('.panel-query-load').fadeOut(function(){
                            t.find('.bar').css({width:0});
                            t.find('.label').find('.perc').remove();
                        });
                    
                }
            }
            perc();
            setInterval(perc, 0); 
        }
	    $('.btn-fc-query').on('click', function(){
            $('.panel-query-load').fadeIn();
            setLoad();
        })
})(jQuery);