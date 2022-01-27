"use strict";

function ready(callback) {
	if (document.readyState != "loading") return callback();
	document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
	// Memunculkan serta menyembunyikan tombol back to top
	let backToTop = document.querySelector(".back-to-top");
	this.addEventListener("scroll", () => {
		if (scrollY > 200) {
			backToTop.classList.add("active");
		} else {
			backToTop.classList.remove("active");
		}
	});

	//Animasi scroll back to top
	backToTop.addEventListener(
		"click",
		() => {
			window.scroll({
				top: 0,
				behavior: "smooth",
			});
		},
		false
	);

	let hyperlink = document.querySelectorAll('a[href^="#"]');
	//scroll to element
	hyperlink.forEach((element) => {
		element.addEventListener("click", (event) => {
			event.preventDefault();
			let hash = element.getAttribute("href");
			document.querySelector(hash).scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		});
	});

	//Preloader
	let preloader = document.querySelector(".spinner-wrapper");
	preloader.classList.add("hide");
	preloader.classList.remove("show");

	let foto = document.querySelector("img.rounded-circle");
	window.addEventListener("load", function () {
		foto.classList.add("foto-hero");
	});
});
