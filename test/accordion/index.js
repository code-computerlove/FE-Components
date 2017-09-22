const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'accordion', 'index.html')).toString();

let dom = new JSDOM(HTML, {
	runScripts: "dangerously",
	resources: "usable"
});

module.exports = function() {
	describe('The Accordion Component ', () => {

		it('should have aria-expanded set to true when selected', () => {
			const Click = new dom.window.KeyboardEvent('click', { });
			const buttons = dom.window.document.querySelectorAll('[data-accordion-button]');

			buttons[0].dispatchEvent(Click);

			buttons[0].getAttribute('aria-expanded').should.equal('true');
		});

		it('should have a active class on the button', () => {
			const Click = new dom.window.KeyboardEvent('click', { });
			const buttons = dom.window.document.querySelectorAll('[data-accordion-button]');

			buttons[0].dispatchEvent(Click);

			buttons[0].classList.contains('accordion__button--active').should.equal(true);
		});
	});
};
