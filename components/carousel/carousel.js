
(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.Carousel = function(carousel, options) {
		const slides 				= carousel.querySelectorAll(options.slideSelector);
		const totalSlides 	= slides.length - 1;
		let activeSlide   	= carousel.querySelector(`.${options.activeClass}`);
		let slideIndex 			= 0;

		function removeClass(el, className) {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}

		function addClass(el, className) {
			el.className += ' ' + className; // ie8+
		}

		function hasClass(el, className) {
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
		}

		function calcHeightOfCarousel() {
			carousel.style.height = `${activeSlide.offsetHeight}px`;
		}

		function alertLiveRegion() {
			const liveregion = carousel.querySelector(`.${options.bemClass}__liveregion`);
			liveregion.textContent = 'Item ' + (slideIndex + 1) + ' of ' + slides.length;
		}

		function setActiveState() {
			activeSlide.setAttribute('tabindex', '-1');
			addClass(activeSlide, options.activeClass);
			activeSlide.focus();
			activeSlide.setAttribute('aria-hidden', 'false');
		}

		function removeActiveState() {
			activeSlide.removeAttribute('tabindex');
			removeClass(activeSlide, options.activeClass);
			activeSlide.setAttribute('aria-hidden', 'true');
		}

		function nextSlide() {
			removeActiveState();

			if(slideIndex === totalSlides) {
				slideIndex = 0;
			} else {
				slideIndex++;
			}

			activeSlide = slides[slideIndex];
			setActiveState();
			alertLiveRegion();
			calcHeightOfCarousel();
		}

		function prevSlide() {
			removeActiveState();

			if(slideIndex === 0) {
				slideIndex = totalSlides;
			} else {
				slideIndex--;
			}

			activeSlide = slides[slideIndex];

			setActiveState();
			alertLiveRegion();
			calcHeightOfCarousel();
		}

		function createControlButtonHTML(modifier) {
			return `<li class="${options.bemClass}__controls-item">
				<button type="button" class="${options.bemClass}__controls-button ${options.bemClass}__controls-button--${modifier}">
					${modifier} slide
				</button>
			</li>`;
		}

		function setAriaHiddenToSlidesThatAreNotActive() {
			Array.prototype.slice.call(slides)
			.filter(slide => hasClass(slide, options.activeClass))
			.forEach(slide => { slide.setAttribute('aria-hidden', true); });

			activeSlide.setAttribute('aria-hidden', false);
		}

		function createControls() {
			const controls = document.createElement('ul');
			controls.className = `${options.bemClass}__controls`;
			controls.innerHTML = createControlButtonHTML('prev') + createControlButtonHTML('next');

			carousel.appendChild(controls);
		}

		function createLiveRegion() {
			const liveregion = document.createElement('div');
			liveregion.setAttribute('aria-live', 'polite');
			liveregion.setAttribute('aria-atomic', 'true');
			liveregion.setAttribute('class', `${options.bemClass}__liveregion`);

			carousel.appendChild(liveregion);
		}

		function bindWindowEvents() {
			window.addEventListener('resize', () => {
				setTimeout(function() {
					calcHeightOfCarousel();
					clearTimeout(this);
				}, 300);
			});
		}

		function bindEvents() {
			const next = carousel.querySelector(`.${options.bemClass}__controls-button--next`);
			const prev = carousel.querySelector(`.${options.bemClass}__controls-button--prev`);

			next.addEventListener('click', nextSlide);
			prev.addEventListener('click', prevSlide);
		}

		function init() {
			createControls();
			createLiveRegion();
			setAriaHiddenToSlidesThatAreNotActive();
			alertLiveRegion();
			bindEvents();
			bindWindowEvents();
			calcHeightOfCarousel();
		}

		return {
			init: init
		};
	};

	const elements = Array.prototype.slice.call(document.querySelectorAll(`[data-carousel]`));

	const options = {
		slideSelector: '[data-carousel-slide-item]',
		bemClass: 'carousel',
		activeClass: 'carousel__slide--active'
	};

	elements.forEach(element => {
		let carousel = new window.Code.Carousel(element, options);
		carousel.init();
	});
}());
