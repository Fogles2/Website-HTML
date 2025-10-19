"use strict";
document.addEventListener("DOMContentLoaded", function () {
	const body = document.querySelector("body");
	/**
	 * Slide Up
	 */
	const slideUp = (target, duration = 500) => {
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.boxSizing = "border-box";
		target.style.height = target.offsetHeight + "px";
		target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = "none";
			target.style.removeProperty("height");
			target.style.removeProperty("padding-top");
			target.style.removeProperty("padding-bottom");
			target.style.removeProperty("margin-top");
			target.style.removeProperty("margin-bottom");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
		}, duration);
	};

	/**
	 * Slide Down
	 */
	const slideDown = (target, duration = 500) => {
		target.style.removeProperty("display");
		let display = window.getComputedStyle(target).display;

		if (display === "none") display = "block";

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = "hidden";
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = "border-box";
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + "ms";
		target.style.height = height + "px";
		target.style.removeProperty("padding-top");
		target.style.removeProperty("padding-bottom");
		target.style.removeProperty("margin-top");
		target.style.removeProperty("margin-bottom");
		window.setTimeout(() => {
			target.style.removeProperty("height");
			target.style.removeProperty("overflow");
			target.style.removeProperty("transition-duration");
			target.style.removeProperty("transition-property");
		}, duration);
	};

	/**
	 * Slide Toggle
	 */
	const slideToggle = (target, duration = 500) => {
		if (target.attributes.style === undefined || target.style.display === "none") {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};

	/**
	 * Header Crossed
	 */
	window.addEventListener("scroll", () => {
		const primaryHeader = document.querySelector(".primary-header");
		if (primaryHeader) {
			const primaryHeaderTop = primaryHeader.offsetHeight / 3;
			const scrolled = window.scrollY;

			const primaryHeaderCrossed = () => {
				if (scrolled > primaryHeaderTop) {
					body.classList.add("primary-header-crossed");
				} else if (scrolled < primaryHeaderTop) {
					body.classList.remove("primary-header-crossed");
				} else {
					body.classList.remove("primary-header-crossed");
				}
			};
			setTimeout(primaryHeaderCrossed, 100);
		}
	});

	/**
	 * Primary Menu
	 */
	const mdScreen = "(max-width: 991px)";
	const mdScreenSize = window.matchMedia(mdScreen);
	const containSub1 = document.querySelectorAll(".has-sub-level-1 > a");
	const containSub2 = document.querySelectorAll(".has-sub-level-2 > a");
	const mdScreenSizeActive = (screen) => {
		if (screen.matches) {
			// if menu has sub
			containSub1.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
					el.stopPropagation();
					el.target.classList.toggle("active");
					const menuSub = e.nextElementSibling;
					if (menuSub) {
						slideToggle(menuSub, 500);
					}
				});
			});
			// if menu has 2nd sub menu
			containSub2.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
					el.stopPropagation();
					el.target.classList.toggle("active");
					const menuSub = e.nextElementSibling;
					if (menuSub) {
						slideToggle(menuSub, 500);
					}
				});
			});
		} else {
			containSub1.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
				});
			});
			containSub2.forEach((e) => {
				e.addEventListener("click", (el) => {
					el.preventDefault();
				});
			});
		}
	};
	mdScreenSize.addEventListener("change", (e) => {
		if (e.matches) {
			window.location.reload();
			mdScreenSizeActive(e);
		} else {
			mdScreenSize.removeEventListener("change", (e) => {
				mdScreenSizeActive(e);
			});
			window.location.reload();
		}
	});
	mdScreenSizeActive(mdScreenSize);

	/**
	 * Theme Settings (Dark / Light)
	 */
	const themeDropdownIcon = document.getElementById("themeDropdownIcon");
	const theme = localStorage.getItem("theme");

	// Set initial theme
	if (theme === "dark") {
		document.documentElement.setAttribute("data-bs-theme", "dark");
		updateThemeIcon("dark");
	} else {
		// Default to light theme if not set
		document.documentElement.setAttribute("data-bs-theme", "light");
		updateThemeIcon("light");
	}

	// Theme change handlers
	const selectLightTheme = document.getElementById("lightTheme");
	if (selectLightTheme) {
		selectLightTheme.addEventListener("click", function () {
			document.documentElement.setAttribute("data-bs-theme", "light");
			localStorage.setItem("theme", "light");
			updateThemeIcon("light");
		});
	}

	const selectDarkTheme = document.getElementById("darkTheme");
	if (selectDarkTheme) {
		selectDarkTheme.addEventListener("click", function () {
			document.documentElement.setAttribute("data-bs-theme", "dark");
			localStorage.setItem("theme", "dark");
			updateThemeIcon("dark");
		});
	}

	function updateThemeIcon(theme) {
		if (!themeDropdownIcon) return;

		themeDropdownIcon.setAttribute(
			"icon",
			theme === "light" ? "bi:sun" : "bi:moon-stars"
		);
	}

	/**
	 * Iterate through each tab group
	 */
	const tabGroups = document.querySelectorAll(".tab-group");
	tabGroups.forEach((group) => {
		const tabButtons = group.querySelectorAll(".tab__links");
		const tabContents = group.querySelectorAll(".tab__content");

		if (!tabButtons.length || !tabContents.length) {
			return;
		}

		// Attach event listeners to each tab button
		tabButtons.forEach((button, index) => {
			button.addEventListener("click", function () {
				// Remove active class from all buttons and contents in this group
				tabButtons.forEach((btn) => btn.classList.remove("active"));
				tabContents.forEach((content) => content.classList.remove("active"));

				// Add active class to clicked button and corresponding content
				button.classList.add("active");
				if (tabContents[index]) {
					tabContents[index].classList.add("active");
				} else {
					console.warn(`No content found for tab index ${index} in this group`);
				}
			});
		});

		// Optionally, activate the first tab by default in each group
		if (tabButtons[0]) {
			tabButtons[0].click();
		}
	});

	/**
	 * Code Snippets Expand
	 */
	const codeExpandBtn = document.querySelectorAll(".code-snippet-expand");
	if (codeExpandBtn) {
		codeExpandBtn.forEach((e) => {
			e.addEventListener("click", () => {
				const codeExpandNav = e.closest(".tab__header");
				const codeSnippetsBody = codeExpandNav.nextElementSibling;
				codeSnippetsBody.classList.toggle("code-snippet--expanded");
			});
		});
	}

	/**
	 * Tooltip Init
	 */
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
	const tooltipList = [...tooltipTriggerList].map(
		(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
	);

	/**
	 * Dropdwon Activate
	 */
	const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
	const dropdownList = [...dropdownElementList].map(
		(dropdownToggleEl) => new bootstrap.Dropdown(dropdownToggleEl)
	);

	/**
	 * Testimonial Slider 1
	 */
	const testimonialSliderOne = document.querySelector(".testimonial-slider-1");
	if (testimonialSliderOne) {
		new Swiper(testimonialSliderOne, {
			loop: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			speed: 5000,
			autoplay: {
				delay: 1,
				disableOnInteraction: false,
			},
			slidesPerView: 1,
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1920: {
					slidesPerView: 5,
				},
			},
		});
	}

	/**
	 * Testimonial Slider 2
	 */
	const testimonialSliderTwo = document.querySelector(".testimonial-slider-2");
	if (testimonialSliderTwo) {
		new Swiper(testimonialSliderTwo, {
			loop: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			speed: 5000,
			autoplay: {
				delay: 1,
				disableOnInteraction: false,
				reverseDirection: true,
			},
			slidesPerView: 1,
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1920: {
					slidesPerView: 5,
				},
			},
		});
	}

	/**
	 * Testimonial Slider 3
	 */
	const testimonialSliderThreeNav = document.querySelector(
		".testimonial-slider-3--nav"
	);
	const testimonialSliderThree = document.querySelector(".testimonial-slider-3");
	if (testimonialSliderThree && testimonialSliderThreeNav) {
		const testimonialSliderThreeNavIs = new Swiper(testimonialSliderThreeNav, {
			direction: "vertical",
			loop: true,
			spaceBetween: 10,
			slidesPerView: 4,
			freeMode: true,
			watchSlidesProgress: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			autoplay: true,
		});
		new Swiper(testimonialSliderThree, {
			loop: true,
			spaceBetween: 10,
			autoplay: true,
			thumbs: {
				swiper: testimonialSliderThreeNavIs,
			},
		});
	}

	/**
	 * Testimonial Slider 4
	 */
	const testimonialSliderFour = document.querySelector(".testimonial-slider-4__is");
	if (testimonialSliderFour) {
		new Swiper(testimonialSliderFour, {
			loop: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			speed: 3000,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
			autoplay: {
				delay: 1,
				disableOnInteraction: false,
				reverseDirection: true,
			},
			slidesPerView: 1,
		});
	}

	/**
	 * Testimonial Slider 5
	 */
	const testimonialSliderFive = document.querySelector(".testimonial-slider-5");
	if (testimonialSliderFive) {
		new Swiper(testimonialSliderFive, {
			loop: true,
			speed: 3000,
			autoplay: true,
			spaceBetween: 16,
			slidesPerView: 1,
			breakpoints: {
				1400: {
					slidesPerView: 2,
				},
				1920: {
					slidesPerView: 3,
				},
				2500: {
					slidesPerView: 4,
				},
			},
		});
	}

	/**
	 * Testimonial Slider 6
	 */
	const testimonialSliderSix = document.querySelector(".testimonial-slider-6");
	if (testimonialSliderSix) {
		new Swiper(testimonialSliderSix, {
			loop: true,
			speed: 1000,
			autoplay: true,
			spaceBetween: 16,
			slidesPerView: 1,
			effect: "fade",
			fadeEffect: {
				crossFade: true,
			},
		});
	}

	/**
	 * Testimonial Slider 7
	 */
	const testimonialSliderSeven = document.querySelector(".testimonial-slider-7");
	if (testimonialSliderSeven) {
		new Swiper(testimonialSliderSeven, {
			loop: true,
			speed: 1000,
			spaceBetween: 16,
			slidesPerView: 1,
			navigation: {
				nextEl: ".testimonial-slider-7__nav-next",
				prevEl: ".testimonial-slider-7__nav-prev",
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1200: {
					slidesPerView: 4,
				},
				1920: {
					slidesPerView: 5,
				},
				2100: {
					slidesPerView: 6,
				},
			},
		});
	}

	/**
	 * Testimonial Slider 8
	 */
	const testimonialSliderEight = document.querySelector(".testimonial-slider-8");
	if (testimonialSliderEight) {
		new Swiper(testimonialSliderEight, {
			loop: true,
			autoplay: true,
			speed: 1000,
			spaceBetween: 16,
			slidesPerView: 1,
			effect: "fade",
		});
	}

	/**
	 * Testimonial Slider 8
	 */
	const testimonialSliderNine = document.querySelector(".testimonial-9");
	if (testimonialSliderNine) {
		new Swiper(testimonialSliderNine, {
			loop: true,
			autoplay: true,
			speed: 1000,
			spaceBetween: 16,
			slidesPerView: 1,
			effect: "fade",
		});
	}

	/**
	 * Team Member 2 Slider
	 */
	const teamMemberTwoSlider = document.querySelector(".team-member-2-slider");
	if (teamMemberTwoSlider) {
		new Swiper(teamMemberTwoSlider, {
			loop: true,
			centeredSlides: true,
			centeredSlidesBounds: true,
			speed: 5000,
			spaceBetween: 16,
			autoplay: {
				delay: 1,
				disableOnInteraction: false,
			},
			slidesPerView: 1,
			breakpoints: {
				768: {
					slidesPerView: 2,
				},
				992: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 4,
				},
				1920: {
					slidesPerView: 5,
				},
			},
		});
	}

	/**
	 * Duplicate Scroller-X Item
	 */
	const scrollerX = document.querySelectorAll(".scroller-x");
	function scrollerXDuplication(scroller) {
		if (scroller.dataset.duplicated === "true") return;
		const scrollerInner = scroller.querySelector(".scroller-x__list");
		if (!scrollerInner) return;
		const scrollerContent = Array.from(scrollerInner.children);
		if (!scrollerContent.length) return;
		const fragment = document.createDocumentFragment();
		scrollerContent.forEach((item) => {
			const duplicateItem = item.cloneNode(true);
			fragment.appendChild(duplicateItem);
		});
		scrollerInner.appendChild(fragment);
		scroller.dataset.duplicated = "true";
	}
	scrollerX.forEach((scroller) => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						scrollerXDuplication(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0 }
		);
		observer.observe(scroller);
	});

	/**
	 * Duplicate Scroller-Y Item
	 */
	const scrollerY = document.querySelectorAll(".scroller-y");

	function scrollerYDuplication(scroller) {
		if (scroller.dataset.duplicated === "true") return;
		const scrollerInner = scroller.querySelector(".scroller-y__list");
		if (!scrollerInner) return;
		const scrollerContent = Array.from(scrollerInner.children);
		if (!scrollerContent.length) return;

		const fragment = document.createDocumentFragment();
		scrollerContent.forEach((item) => {
			const duplicateItem = item.cloneNode(true);
			fragment.appendChild(duplicateItem);
		});

		scrollerInner.appendChild(fragment);
		scroller.dataset.duplicated = "true";
	}

	scrollerY.forEach((scroller) => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						scrollerYDuplication(entry.target);
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0 }
		);
		observer.observe(scroller);
	});

	/**
	 * Case Study Slider
	 */
	const caseStudySlider = document.querySelector(".case-study-slider");
	if (caseStudySlider) {
		new Swiper(caseStudySlider, {
			slidesPerView: 1,
			spaceBetween: 16,
			navigation: {
				nextEl: ".case-study-slider__next",
				prevEl: ".case-study-slider__prev",
			},
			breakpoints: {
				1200: {
					slidesPerView: 2,
				},
			},
		});
	}

	/**
	 * Preloader
	 */
	const preloader = document.querySelector(".preloader");

	// Sync with the page loading process
	window.addEventListener("load", function () {
		if (preloader) {
			setTimeout(() => {
				preloader.style.display = "none";
			}, 300);
		}
	});
	/**
	 * Expiry Date Input
	 */
	const cardExpiryInput = document.getElementById("card-expiry");
	if (cardExpiryInput) {
		cardExpiryInput.addEventListener("input", function (e) {
			const input = e?.target;
			if (!input) return;

			let value = input.value || "";
			value = value.replace(/\D/g, "");
			if (value.length >= 3) {
				input.value = value.slice(0, 2) + "/" + value.slice(2, 4);
			} else {
				input.value = value;
			}
		});
	}
});
