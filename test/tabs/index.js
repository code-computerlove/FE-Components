const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'tabs', 'index.html')).toString();

const dom = new JSDOM(HTML, {
	runScripts: "dangerously",
	resources: "usable"
});

require('localhost')('./components').listen(8080);

module.exports = function() {

	beforeEach(function(done) {
		dom.window.addEventListener('load', function() {
			done();
		});
	});

	describe('Test', () => {

			it('should be true', () => {
				var p = dom.window.document.querySelector("p");
				p.textContent.should.equal('Hello world');
			});
		});
};
