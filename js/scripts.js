function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setIntro() {
	$('.intro-slider .item').each(function() {
		$(this).css({
			'background': 'url("'+$(this).find('.bg').attr('src')+'") no-repeat center 0',
			'background-size': 'auto 100%'
		})
	});
}
function setPicRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.pic');
		t.height(t.width()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:960px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('.intro-slider__row').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					dots: false
				}
			}
		]
	});
	$('.partners-slider__row .item').each(function() {
		$(this).css({
			width: $(this).outerWidth()
		});
	});
	$('.partners-slider__row').slick({
		arrows: true,
		dots: false,
		infinite: true,
		variableWidth: true,
		cssEase: 'ease-out',
		speed: 300
	});
	$('.advices__slider').slick({
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		variableWidth: true,
		speed: 300
	});
	$('input[type="checkbox"], input[type="radio"]').uniform();
	$('.quantity-e .minus').on('click', function(e) {
		e.preventDefault();
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
    });
	$('.quantity-e .plus').on('click', function(e) {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
	});
	$('.vacancy__scroll').jScrollPane({
		verticalGutter: 0,
		verticalDragMinHeight: 39,
		verticalDragMaxHeight: 39
	});
	$('.vacancy__list li').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('.vacancy__group').find('.vacancy__content');
		var elem = t.find('.vacancy__scroll[data="'+$(this).attr('data')+'"]');
		elem.show().siblings('.vacancy__scroll').hide();
		var api = elem.data('jsp');	
		api.reinitialise();
	}).filter(':first').click();
	$('.compare__filter li').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	function openBasket() {
		$('.header--basket').addClass('is-active');
		$('.basket-drop').addClass('is-dropped');
		if ( !isMobile ) {
			$('.basket-drop').css({
				'max-height': 'none'
			});
		} else {
			$('.basket-drop').css({
				'max-height': $(window).height()-75+'px'
			});
		}
	}
	function closeBasket() {
		$('.header--basket').removeClass('is-active');
		$('.basket-drop').removeClass('is-dropped');
	}
	function openMobileMenu() {
		$('.panel').addClass('is-opened');
		$('.fade-bg').addClass('is-active');
		$('body').addClass('is-locked');
	}
	function closeMobileMenu() {
		$('.panel').removeClass('is-opened');
		$('.fade-bg').removeClass('is-active');
		$('body').removeClass('is-locked');
	}
	$('.header--basket').on('click', function(e) {
		e.preventDefault();
		if ( !$(this).hasClass('is-active') ) {
			openBasket();
		} else {
			closeBasket();
		}
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header--basket').length && !$(e.target).closest('.basket-drop').length ) {
			closeBasket();
		}
		if ( !$(e.target).closest('.panel').length && !$(e.target).closest('.menu-open').length && isMobile ) {
			closeMobileMenu();
		}
	});
	$(document).on('click', '.menu-open', function(e) {
		e.preventDefault();
		openMobileMenu();
	});
	$(document).on('click', '.menu-close', function(e) {
		e.preventDefault();
		closeMobileMenu();
	});
	$('.footer-nav__item.is-nav h5, .vacancy__roll h5, .lc__nav--title').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
	});
	$('.card__gallery--main').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		infinite: true,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					dots: true
				}
			}
		]
	});
	$('.card__gallery--preview .pic').on('click', function(e) {
		e.preventDefault();
		var t = $(this).parents('.card__gallery').find('.card__gallery--main');
		t.slick('slickGoTo',parseInt($(this).attr('data')-1));
	});
	$('.nav--item.has-sub .nav--link').on('click', function(e) {
		e.preventDefault();
		$(this).parent('.nav--item').toggleClass('is-active');
	});
	
	$(window).on('resize', function() {
		detectDevice();
		setPicRatio();
		setIntro();
		if ( justSwitched ) {
			if ( isMobile ) {
				$('.panel').append('<span class="menu-close"></span>');
				$('.header').append('<span class="menu-open"></span>');
				$('.header').append('<span class="header--search-open"></span>');
			} else {
				$('.menu-close, .menu-open, .header--search-open').remove();
				closeMobileMenu();
			}
		}
	});
	$(window).trigger('resize');
});
$(function() {
	$('.item-card--compare').each(function() {
		var t = $(this);
		var checker = t.find('input[type="checkbox"]');
		function active() {
			t.find('.state-passive').hide();
			t.find('.state-active').show();
		}
		function passive() {
			t.find('.state-active').hide();
			t.find('.state-passive').show();
		}
		active();
		function change() {
			if ( checker.prop('checked') == true ) {
				active();
			} else {
				passive();
			}			
		}
		change();
		checker.on('click', function() {
			change();
		})
	});
});
$(function() {
	$('.lc__filter--item').each(function() {
		var t = $(this);
		var range = t.find('.lc__filter--range');
		var inputFrom = t.find('input.from');
		var inputTo = t.find('input.to');
		var min = 0;
		var max  = 10000;
		var start = 500;
		var end = 8000;
		range.slider({
			range: true,
			min: 0,
			max: 10000,
			values: [500, 8000],
			slide: function(event, ui) {
				inputFrom.val(ui.values[0]);
				inputTo.val(ui.values[1]);
			}
		});
		inputFrom.val(start);
		inputTo.val(end);
		inputFrom.change(function() {
			var val = $(this).val();
			if ( val < min ) {
				val = min;
			} else if ( val > range.slider('values',1) ) {
				val = range.slider('values',1);
			}
			range.slider('values',0,val);
			$(this).val(val);
		});
		inputTo.change(function() {
			var val = $(this).val();
			if ( val > max ) {
				val = max;
			} else if ( val < range.slider('values',0) ) {
				val = range.slider('values',0);
			}
			range.slider('values',1,val);
			$(this).val(val);
		});
	});
});