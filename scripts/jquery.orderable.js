(function($) {
    var $inputTemplate = $("<input type=\"hidden\" name=\"orderby\" />");
    var $iconTemplate = $("<div></div>");
    $.fn.extend({
        orderable: function(order, searchForm, otherForm) {
            var $this = $(this);
            var $input = $inputTemplate.clone().val(order);
            var $otherForm = $(otherForm);
            $otherForm.each(function() {
                $input.clone().appendTo(this);
            });
            var $searchForm = $(searchForm);
            $searchForm.append($input);
            var originalFunc=$searchForm.find(":input[name=method]").val();
            $this.click(function() {
                var nextOrder = nextOrderby($(this));
                if (nextOrder) {
                    $input.val(nextOrder);
                } else {
                    $input.remove();
                }
                //以下两行为qis项目专用
                $searchForm.find(":input[name=method]").val(originalFunc);
                $searchForm.find(".template").remove();
                
                $searchForm.submit();
            });
            if (order.length === 0) {
                return $this;
            }
            var arr = order.split(" ");
            var state = (arr[1] || "asc").toLowerCase();
            $this.each(function(fieldDom) {
                var $field = $(fieldDom);
                if (!$field.hasClass("orderable")) {
                    $field.addClass("orderable");
                }
            });
            $this.filter("#" + arr[0].replace(".", "\\.")).append(createIcon(state));
            
            return $this;

            function nextOrderby($field) {
                if ($field.find(".asc").length > 0) {
                    return $field[0].id + " DESC";
                } else if ($field.find(".desc").length > 0) {
                    return false;
                } else {
                    return $field[0].id + " ASC";
                }
            }
            function createIcon(state) {
                var $icon = $iconTemplate.clone();
                $icon.addClass(state);
                return $icon;
            }
        }
    });

})(jQuery);