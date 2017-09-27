const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'accordion', 'index.html')).toString();

let dom;

module.exports = function() {
	describe('The Accordion Component ', () => {

		beforeEach(function(done) {
			dom = new JSDOM(HTML, {
				runScripts: "dangerously",
				resources: "usable"
			});

			dom.window.addEventListener('load', function() {
				done();
			});
		});

		it('should have aria-expanded set to true when selected', () => {
			const Click = new dom.window.MouseEvent('click', {});
			const buttons = dom.window.document.querySelectorAll('[data-accordion-button]');

			buttons[0].addEventListener('click', () => {
				buttons[0].getAttribute('aria-expanded').should.equal('true');
			});

			buttons[0].dispatchEvent(Click);
		});

		it('should have a active class on the button', () => {
			const Click = new dom.window.MouseEvent('click', { });
			const buttons = dom.window.document.querySelectorAll('[data-accordion-button]');

			buttons[0].addEventListener('click', () => {
				buttons[0].classList.contains('accordion__button--active').should.equal(true);
			});

			buttons[0].dispatchEvent(Click);

		});
	});
};
