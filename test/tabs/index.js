const should = require('should');
const path = require('path');
const fs = require('fs');

module.exports = function() {


	describe('Test', () => {

			it('should be true', () => {
				var truthy = true;

				truthy.should.equal(true);
			});
		});
};
