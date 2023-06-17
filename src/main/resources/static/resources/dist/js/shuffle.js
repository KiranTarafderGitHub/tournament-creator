$( document ).ready(function() {
	shuffleBox();
	$(".Shuffle_body1").each(function() {
		categoryId = $(this).attr("id");
		subCategoryLength = $(".Shuffle_body2").parent().find(".shuffle"+categoryId).length;
		$(this).attr("colspan",subCategoryLength);
    });
	$(".subcategorytr").each(function() {
		subCategoryTdLength = $(this).find("td").length;
		subCategoryBlankTdLength = $(this).find("td.blanksubCategory").length;
		subCategoryTdLength == subCategoryBlankTdLength ? $(this).hide() : $(this).removeAttr("style");
    });	
	$('#saveShuffle').click(function(){	
		$('#saveShuffle').addClass("disabled");
		  $.ajax({                
            type: "POST",
            url:"saveFoodItemShuffle.do",
            async: false,
            data:$("#formItemPrev").serialize(),//formItemPrev is id of the form                
            success:function (map) {                    
            	$("#info").text('Food items shuffled successfully!'); 
            	$('#saveShuffle').removeClass("disabled");
            },
            error:function (xhr) {
            	$("#info").text('Food items failed to shuffle!');
            }
        })
	});
	$(".tab-pane").each(function(){
		var shuffleCatLength = $(this).find(".Shuffle_body1").length;
		var shuffleItemLength = $(this).find(".Shuffle_body3").length;
		if(shuffleCatLength == 1){
			$(this).find(".Shuffle_body1").addClass("Shuffle_catreturn").removeClass("Shuffle_body1");
			$(".move-prev").addClass("move-prev-off");
			$(".move-next").addClass("move-next-off");
		}
		if(shuffleItemLength == 1){
			$(this).find(".Shuffle_body3").addClass("Shuffle_return").removeClass("Shuffle_body3");
			$(".move-up").addClass("move-up-off");
			$(".move-down").addClass("move-down-off");
		}
	});
	$(".nav-tabs li a").click(function(){
		var navtabId = $(this).attr("href");
		var shuffleCatLength = $(navtabId).find(".Shuffle_body1").length;
		var shuffleItemLength = $(navtabId).find(".Shuffle_body3").length;
		if(shuffleCatLength == 0){
			$(".move-prev").addClass("move-prev-off");
			$(".move-next").addClass("move-next-off");
		}else{
			$(".move-prev-off").addClass("move-prev").removeClass("move-prev-off");
			$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
			$(".move-next-off").addClass("move-next").removeClass("move-next-off");
			$(".move-next-return").addClass("move-next").removeClass("move-next-return");
		}
		if(shuffleItemLength == 0){
			$(".move-up").addClass("move-up-off");
			$(".move-down").addClass("move-down-off");
		}else{
			$(".move-up-off").addClass("move-up").removeClass("move-up-off");
			$(".move-up-return").addClass("move-up").removeClass("move-up-return");
			$(".move-down-off").addClass("move-down").removeClass("move-down-off");
			$(".move-down-return").addClass("move-down").removeClass("move-down-return");
		}
	});
	$(".Shuffle_body1").click(function(){
		$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
		$(".move-next-return").addClass("move-next").removeClass("move-next-return");
		var shuffleIndex = $(this).index();
		var shuffleLastIndex = $(this).parent().find("td").last().index();
		if(shuffleIndex == 0){
			$(".move-prev").addClass("move-prev-return").removeClass("move-prev");
			$(".move-prev-off").addClass("move-prev-return").removeClass("move-prev-off");
			$(".move-next-return").addClass("move-next").removeClass("move-next-return");
		}
		if(shuffleIndex == shuffleLastIndex){
			$(".move-next").addClass("move-next-return").removeClass("move-next");
			$(".move-next-off").addClass("move-next-return").removeClass("move-next-off");
			$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
		}
		$(".move-down-return").removeClass("move-down-return").addClass("move-down-off");
	});
	$(".Shuffle_body3").click(function(){
		var shuffleIndex = $(this).index();
		var shuffleLastIndex = $(this).parent().next().find("td").eq(shuffleIndex);
		$(".move-down-return").addClass("move-down").removeClass("move-down-return");
		if(shuffleLastIndex.html() == "&nbsp;"){
			$(".move-down-off").addClass("move-down-return").removeClass("move-down-off");
			$(".move-down").addClass("move-down-return").removeClass("move-down");
		}
	});
	$(".move-up").click(function(){
		var shuffleIndex = $(".Shuffle_body3.active").index();
		var shuffleLastIndex = $(".Shuffle_body3.active").parent().next().find("td").eq(shuffleIndex);
		if(shuffleLastIndex.html() == "&nbsp;"){
			$(".move-down-return").addClass("move-down").removeClass("move-down-return");
		}
	});
	$(".move-down").click(function(){
		var shuffleIndex = $(".Shuffle_body3.active").index();
		var shuffleLastIndex = $(".Shuffle_body3.active").parent().next().next().find("td").eq(shuffleIndex);
		if(shuffleLastIndex.attr("class") == "Shuffle_return"){
			$(this).removeClass("move-down").addClass("move-down-off");
		}
	});
	$(".move-prev").click(function(){
		var moveIndex = $(".tab-pane.active").find(".Shuffle_body1.active").index();
		var moveLastIndex = $(".tab-pane.active").find(".Shuffle_body1").parent().find("td").last().index();
		if(moveIndex == 1){
			$(".move-prev").addClass("move-prev-return").removeClass("move-prev");
			$(".move-next-return").addClass("move-next").removeClass("move-next-return");
		}else{
			$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
			$(".move-next-return").addClass("move-next").removeClass("move-next-return");
		}
	});
	$(".move-next").click(function(){
		var moveIndex = $(".tab-pane.active").find(".Shuffle_body1.active").index();
		var moveLastIndex = $(".tab-pane.active").find(".Shuffle_body1").parent().find("td").last().index();
		if(moveIndex+1 == moveLastIndex){
			$(".move-next").addClass("move-next-return").removeClass("move-next");
			$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
		}else{
			$(".move-next-return").addClass("move-next").removeClass("move-next-return");
			$(".move-prev-return").addClass("move-prev").removeClass("move-prev-return");
		}
	});
});
function shuffleBox() {
	var prevScroll = 0;
	$("#shuffleBox").scroll( function(evt) {
	    var currentTop = $(this).scrollTop();
	    if(prevScroll !== currentTop) {
	    	$(".Shuffle_body1").parent().addClass("fixed").css({"top": currentTop});
	    	$(".Shuffle_body2").parent().addClass("fixed").css({"top": currentTop})
	    }else{
	    	$(".Shuffle_body1").parent().removeClass("fixed");
	    	$(".Shuffle_body2").parent().removeClass("fixed");
	    }
		
		
	});
}