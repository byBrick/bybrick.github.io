/* =Codekit imports
-------------------------------------------------------------- */

// @codekit-prepend "../app/bower_components/jquery/jquery.js" 

/* =jQuery
-------------------------------------------------------------- */

jQuery(document).ready(function($) {

	//  Equal height on footer boxes
	var maxHeight = 0;
	var $eqHeightElement = $('.bybrick')

	$eqHeightElement.each(function() {
		if ($(this).height() > maxHeight) { 
			maxHeight = $(this).height();
		}
	});
	$eqHeightElement.height(maxHeight);


	//  Make whole container clikable
	$('.bybrick').click(function() {
		window.location=$(this).find('a').attr('href'); 
		return false;
	});

});