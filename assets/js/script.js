"use strict";
$(document).ready(() => {
	// Memunculkan serta menyembunyikan tombol back to top
	let backToTop = $(".back-to-top");
	$(window).scroll(() => {
		if ($(this).scrollTop() > 200) {
			backToTop.addClass("active");
		} else {
			backToTop.removeClass("active");
		}
	});
	//Animasi scroll back to top
	backToTop.click(() => {
		$("body,html").animate(
			{
				scrollTop: 0,
			},
			50
		);
	});
	//Animasi scroll link
	$('a[href^="#"]').on("click", function (e) {
		e.preventDefault();
		$("html, body").animate(
			{
				scrollTop: $($(this).attr("href")).offset().top - 20,
			},
			50,
			"linear"
		);
	});
	//Preloader
	(() => $(".spinner-wrapper").fadeOut("slow"))();
});
