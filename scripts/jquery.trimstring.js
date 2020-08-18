(function($){
    $(document).ready(function(){
        $("form").submit(function(){
            $(":text").each(function(i,text){
                text.value=$.trim(text.value);
            });
        });
        if($(".tj td").length>0 && $(".tj td:empty").length===$(".tj td").length){
        	$(".tj").remove();
        }
    });
})(jQuery);