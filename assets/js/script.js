"use strict";
import { dataPortfolios } from "./data.js";

function ready(callback) {
	if (document.readyState != "loading") return callback();
	document.addEventListener("DOMContentLoaded", callback);
}
ready(() => {
	// Memunculkan serta menyembunyikan tombol back to top
	let backToTop = document.querySelector(".back-to-top");
	window.addEventListener("scroll", () => {
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
	window.addEventListener("load", () => {
		foto.classList.add("foto-hero");
	});

	//anonymous mode
	const anonymousSwitch = document.getElementById("anonymous-switch");
	const formName = document.querySelector(".form-name");
	const formEmail = document.querySelector(".form-email");
	const inputName = document.getElementById("name");
	const inputEmail = document.getElementById("email");
	anonymousSwitch.addEventListener("change", () => {
		if (anonymousSwitch.checked) {
			inputName.value = "Anonim";
			inputEmail.value = "anon@anon";
			formName.classList.add("hidden");
			formEmail.classList.add("hidden");
		} else {
			inputName.value = "";
			inputEmail.value = "";
			formName.classList.remove("hidden");
			formEmail.classList.remove("hidden");
		}
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
			.then(() => {
				btnLoading.classList.toggle("d-none");
				btnSubmit.classList.toggle("d-none");
				alertSuccess.classList.remove("d-none");
				form.reset();
			})
			.catch(() => {
				btnLoading.classList.toggle("d-none");
				btnSubmit.classList.toggle("d-none");
				alertFail.classList.remove("d-none");
			});
	});

	//Fill portfolio container
	const portfolio = document.getElementById("portfolio");
	let html = "";
	dataPortfolios.map((item, index) => {
		html += `<div
        class="card mb-2 me-3"
        style="width: 20rem"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="${index * 100}"
    >
        <img
            src="${item.image}"
            class="card-img-top"
            alt="${item.name}"
        />
        <div class="card-body">
        ${item.tags
			.map((tag) => {
				return `<div class="tag badge mb-3 me-2 rounded-pill">${tag}</div>`;
			})
			.join("")}
            <h5
                class="card-title text-danger"
                style="font-weight: 600"
            >
                ${item.name}
            </h5>
            <p class="card-text">
                ${item.description}
            </p>
            <a
                href="${item.url}"
                class="btn btn-danger"
                target="_blank"
                >Visit</a
            >
        </div>
    </div>`;
	});
	portfolio.innerHTML = html;
});
