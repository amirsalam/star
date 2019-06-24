
(function($){
	$.fn.jRatingAdvance = function( options ){
		var self = $(this);

		var defaults = $.extend({
			stars: 5,
			// size: false,
			// buttons_color: false,
			// active_color: false,
			// text: false,
			// rating: 0
		}, options );

		//for css
		$(this).addClass("j-rating");

		//add btns
		var btns = function(){
			var btns = "";

			for (var i = 1; i <= defaults.stars; i++ ) {
				btns += "<span class='glyphicon glyphicon-star'></span>";
			}

			return btns;
		};

		self.append("<div class='stars'><div class='bottom'>" + btns() + "</div><div class='top'>" + btns() + "</div></div>");

		//add hidden input
		self.append("<input type='hidden' name='j-rating' value='0' />");

		//size
		if (defaults.size) {
			self.css("font-size", defaults.size);
		}

		//buttons color
		if (defaults.buttons_color) {
			$(this).append("<style type='text/css'>#" + self[0].id + " .bottom { color: " + defaults.buttons_color +"; }</style>");
		}

		//active color
		if (defaults.active_color) {
			$(this).append("<style type='text/css'>#" + self[0].id + " .top { color: " + defaults.active_color + " !important; }</style>");
		}

		//display text
		if (defaults.text) {
			$(this).append("<div class='text'>" + defaults.rating + "/10" ,"</div>");
		}

		//mouse enter & move
		var mouseClicked = 0;

		self.find(".stars").mousemove(function(e){
			var w = self.find(".stars").width();
			var pos = e.pageX - self.offset().left;
			var percent = Math.round( (pos / w ) * 100 );
			var starPercent = percent / (100 / (defaults.stars * 19.95 ) ) / 10;

			starPercent = starPercent.toFixed(1);

			$(this).find(".top").width(percent + "%");

			self.click(function(){
				self.find("input[name=j-rating]").val(starPercent);
				self.find(".text").html(starPercent);
				mouseClicked = percent;
			});

		});

		//mouse leave
		self.find(".stars").mouseleave(function(){
			$(this).find(".top").width(mouseClicked + "%");
		});

		//edit page
		if (defaults.rating != 0) {
			var percent = 100 / (defaults.stars / defaults.rating);
			self.find(".top").width(percent + "%");
			mouseClicked = percent;

			self.find("input[name=j-rating]").val(defaults.rating );
		}
	};
})(jQuery);
