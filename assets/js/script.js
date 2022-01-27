"use strict";

function ready(callback) {
	if (document.readyState != "loading") return callback();
	document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
	// Memunculkan serta menyembunyikan tombol back to top
	let backToTop = document.querySelector(".back-to-top");
	this.addEventListener("scroll", () => {
		if (innerHeight + scrollY >= document.body.offsetHeight - 300) {
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

	//foto profil
	let foto = document.querySelector("img.rounded-circle");
	window.addEventListener("load", function () {
		foto.classList.add("foto-hero");
	});

	//send form
	const scriptURL =
		"https://script.google.com/macros/s/AKfycbxocTJG7_P4uvvIrwHBT5EAweJNNhkaIieFNcp0mLwMItnwoixb1-lH8crhp5MAlCA2/exec";
	const form = document.forms["submit-to-google-sheet"];
	const btnSubmit = document.querySelector(".btn-submit");
	const btnLoading = document.querySelector(".btn-loading");
	const alertSuccess = document.querySelector(".alert-success");
	const alertFail = document.querySelector(".alert-danger");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		btnLoading.classList.toggle("d-none");
		btnSubmit.classList.toggle("d-none");
		fetch(scriptURL, { method: "POST", body: new FormData(form) })
			.then((response) => {
				btnLoading.classList.toggle("d-none");
				btnSubmit.classList.toggle("d-none");
				alertSuccess.classList.remove("d-none");
				form.reset();
				console.log("Success!", response);
			})
			.catch((error) => {
				btnLoading.classList.toggle("d-none");
				btnSubmit.classList.toggle("d-none");
				alertFail.classList.remove("d-none");
				console.error("Error!", error.message);
			});
	});
});
