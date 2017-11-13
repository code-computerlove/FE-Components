const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'carousel', 'index.html')).toString();

let dom;

module.exports = function() {
	describe('The Carousel Component ', () => {

		beforeEach(function(done) {
			dom = new JSDOM(HTML, {
				runScripts: "dangerously",
				resources: "usable"
			});

			// JS files get loaded in JSDOM Async no matter what.
			dom.window.addEventListener('load', function() {
				done();
			});
		});

		it('should exist on the page', () => {
			const carousel = dom.window.document.querySelectorAll('[data-carousel]');
			carousel.length.should.greaterThan(0);
		});

		it('should have an aria-labelledby that matches with the heading it is bound to', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const id = carousel.getAttribute('aria-labelledby');
			const heading = dom.window.document.getElementById(id);

			var truthy = false;

			if(heading !== null) {
				truthy = true;
			}

			truthy.should.equal(true);
		});

		it('should have next and prev controls on the page', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const buttons = carousel.querySelectorAll('.carousel__controls-button--next, .carousel__controls-button--prev');
			buttons.length.should.equal(2);
		});

		it('should have a liveregion', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const liveregion = carousel.querySelector('.carousel__liveregion');

			liveregion.getAttribute('aria-live').should.equal('polite');
			liveregion.getAttribute('aria-atomic').should.equal('true');

		});

		it('should set the next slide to be active when I select the next button', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const next = carousel.querySelector('.carousel__controls-button--next');
			const activeSlide = carousel.querySelector('.carousel__slide--active');
			const nextSlide = carousel.querySelector('.carousel__slide--active + .carousel__slide');

			const Click = new dom.window.MouseEvent('click', {});

			next.dispatchEvent(Click);

			nextSlide.classList.contains('carousel__slide--active').should.equal(true);
			nextSlide.getAttribute('aria-hidden').should.equal('false');
			dom.window.document.activeElement.should.equal(nextSlide);
		});

		it('should remove active state on the current active slide when I select the next button', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const next = carousel.querySelector('.carousel__controls-button--next');
			const activeSlide = carousel.querySelector('.carousel__slide--active');
			const nextSlide = carousel.querySelector('.carousel__slide--active + .carousel__slide');
			var truthy = false;

			const Click = new dom.window.MouseEvent('click', {});

			next.dispatchEvent(Click);

			activeSlide.classList.contains('carousel__slide--active').should.equal(false);

			if(dom.window.document.activeElement !== activeSlide) {
				truthy = true;
			}

			activeSlide.getAttribute('aria-hidden').should.equal('true');
			truthy.should.equal(true);
		});

		// covers both if I select previous & I am on the first slide & previous functionality.
		it('should set the previous slide to be active when I select the previous button', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const prev = carousel.querySelector('.carousel__controls-button--prev');
			const activeSlide = carousel.querySelector('.carousel__slide--active');
			const prevSlide = carousel.querySelectorAll('.carousel__slide')[2];

			const Click = new dom.window.MouseEvent('click', {});

			prev.dispatchEvent(Click);

			prevSlide.classList.contains('carousel__slide--active').should.equal(true);
			prevSlide.getAttribute('aria-hidden').should.equal('false');
			dom.window.document.activeElement.should.equal(prevSlide);
		});

		it('should go to the first slide when next is selected and the last slide is active', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const next = carousel.querySelector('.carousel__controls-button--next');
			const activeSlide = carousel.querySelector('.carousel__slide--active');
			const nextSlide = carousel.querySelectorAll('.carousel__slide')[0];

			const Click = new dom.window.MouseEvent('click', {});

			next.dispatchEvent(Click);
			next.dispatchEvent(Click);
			next.dispatchEvent(Click);

			nextSlide.classList.contains('carousel__slide--active').should.equal(true);
			nextSlide.getAttribute('aria-hidden').should.equal('false');
			dom.window.document.activeElement.should.equal(nextSlide);
		});

		it('should have aria-hidden on the slide items that are not active', () => {
			const carousel = dom.window.document.querySelector('[data-carousel]');
			const expectedHiddenSlides = carousel.querySelectorAll('.carousel__slide').length - 1; // - 1 due to active being hidden false
			const ariaHiddenSlides = carousel.querySelectorAll('.carousel__slide[aria-hidden="true"]').length;

			ariaHiddenSlides.should.equal(expectedHiddenSlides);
		});
	});
};
