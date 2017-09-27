const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'base', 'index.html')).toString();

let dom;

module.exports = function() {
	describe('The Base Component ', () => {

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

		it('should be true', () => {
			const truthy = true;
			truthy.should.equal(true);
		});
	});
};
