const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'accordion', 'index.html')).toString();

let dom;

module.exports = function() {

	describe('Accordion', () => {

		beforeEach(function(done) {
			dom = new JSDOM(HTML, {
				runScripts: 'dangerously',
				resources: 'usable'
			});

			dom.window.addEventListener('load', function() {
				done();
			});
		});

		it('should have an aria-label on the on the accordion to display its context', () => {
			var truthy = false;
			const accordion = dom.window.document.querySelector('[data-accordion]');

			if(accordion.getAttribute('aria-label') !== null) {
				truthy = true
			}

			truthy.should.equal(true);

		});

		it('should have buttons that have an aria-controls that matches the id of the content area', () => {
			const accordion = dom.window.document.querySelector('[data-accordion]');
			const buttons = Array.prototype.slice.call(accordion.querySelectorAll('[data-accordion-button]'));
			const contentArea = Array.prototype.slice.call(accordion.querySelectorAll('[data-accordion-content-area]'));

			let expectedResult = buttons.length;
			let totalMatching = 0;

			buttons.forEach((element, i) => {

				const attribute = element.getAttribute('aria-controls');
				const contentAreaId = contentArea[i].getAttribute('id');

				if(attribute !== null) {
					if(attribute === contentAreaId) {
						totalMatching++;
					}
				}
			});

			totalMatching.should.equal(expectedResult);
		});

		it('should have aria-expanded on the accordion buttons', () => {
			const accordion = dom.window.document.querySelector('[data-accordion]');
			const buttons = Array.prototype.slice.call(accordion.querySelectorAll('[data-accordion-button]'));

			let expectedResult = buttons.length;
			let totalMatching = 0;

			buttons.forEach(element => {

				const attribute = element.getAttribute('aria-expanded');

				if(attribute !== null) {
					totalMatching++;
				}
			});

			totalMatching.should.equal(expectedResult);
		});

		it('should have aria-hidden on the accordion content areas', () => {
			const accordion = dom.window.document.querySelector('[data-accordion]');
			const contentArea = Array.prototype.slice.call(accordion.querySelectorAll('[data-accordion-content-area]'));

			let expectedResult = contentArea.length;
			let totalMatching = 0;

			contentArea.forEach(element => {

				const attribute = element.getAttribute('aria-hidden');

				if(attribute !== null) {
					totalMatching++;
				}
			});

			totalMatching.should.equal(expectedResult);
		});

		it('should set the button aria-expanded="true" when selected', () => {
			var truthy = false;
			const Click = new dom.window.MouseEvent('click', {});

			const accordion = dom.window.document.querySelector('[data-accordion]');
			const button = accordion.querySelector('[data-accordion-button]');

			button.addEventListener('click', (event) => {
				if(event.currentTarget.getAttribute('aria-expanded') === 'true') {
					truthy = true;
				}
			});

			button.dispatchEvent(Click);

			truthy.should.equal(true);
		});

		it('should set the button aria-hidden="false" when the button is selected', () => {
			var truthy = false;
			const Click = new dom.window.MouseEvent('click', {});

			const accordion = dom.window.document.querySelector('[data-accordion]');
			const button = accordion.querySelector('[data-accordion-button]');
			const section = accordion.querySelector('[data-accordion-content-area]');

			button.addEventListener('click', (event) => {
				if(section.getAttribute('aria-hidden') === 'false') {
					truthy = true;
				}
			});

			button.dispatchEvent(Click);

			truthy.should.equal(true);
		});

		it('should set the button aria-expanded="false" when selected a second time', () => {
			var truthy = false;
			const Click = new dom.window.MouseEvent('click', {});

			const accordion = dom.window.document.querySelector('[data-accordion]');

			const button = accordion.querySelector('[data-accordion-button]');
			const contentArea = accordion.querySelector('[data-accordion-content-area]');

			// set the first one to be active
			button.setAttribute('aria-expanded', true);
			contentArea.setAttribute('aria-hidden', false);

			button.addEventListener('click', (event) => {
				if(event.currentTarget.getAttribute('aria-expanded') !== 'true') {
					truthy = true;
				}
			});

			button.dispatchEvent(Click);

			truthy.should.equal(true);
		});

		it('should set the button aria-hidden="true" when the button is selected a second time', () => {
			var truthy = false;
			const Click = new dom.window.MouseEvent('click', {});

			const accordion = dom.window.document.querySelector('[data-accordion]');

			const button = accordion.querySelector('[data-accordion-button]');
			const contentArea = accordion.querySelector('[data-accordion-content-area]');

			// set the first one to be active
			button.setAttribute('aria-expanded', true);
			contentArea.setAttribute('aria-hidden', false);

			button.addEventListener('click', (event) => {
				if(contentArea.getAttribute('aria-hidden') === 'true') {
					truthy = true;
				}
			});

			button.dispatchEvent(Click);

			truthy.should.equal(true);
		});
	});
};
