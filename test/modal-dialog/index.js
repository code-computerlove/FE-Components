const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'modal-dialog', 'index.html')).toString();

let dom;

module.exports = function() {
	describe('The Modal Dialog Component ', () => {

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

		it('should have a role attribute set to dialog', () => {
			let truthy = false;

			const modal = dom.window.document.querySelector('[data-modal]');
			const attribute = modal.getAttribute('role');

			if( 'dialog' === attribute ) {
				truthy = true;
			}

			truthy.should.equal(true);

		});

		it('should have an aria-labelledby attribute set to dialogTitle and an element that matches', () => {
			let truthy = false;


			const modal = dom.window.document.querySelector('[data-modal]');

			const attribute = modal.getAttribute('aria-labelledby');

			if( modal.hasAttribute( 'aria-labelledby' ) ) {

				if( dom.window.document.getElementById( `${attribute}` ).length !== 0) {
					truthy = true;
				}

			}

			truthy.should.equal(true);

		});

		it('should have an aria-describedby attribute set to dialogText and an element that matches', () => {
			let truthy = false;


			const modal = dom.window.document.querySelector('[data-modal]');

			const attribute = modal.getAttribute('aria-describedby');

			if( modal.hasAttribute( 'aria-describedby' ) ) {

				if( dom.window.document.getElementById( `${attribute}` ).length !== 0) {
					truthy = true;
				}

			}

			truthy.should.equal(true);

		});

		it('should have the class of modal--open when data-modal-toggle is selected', () => {
			let truthy = false;
			const modal = dom.window.document.querySelector('[data-modal]');
			const buttonTogglers = dom.window.document.querySelector('[data-modal-toggle]');

			const Click = new dom.window.MouseEvent('click', { });

			buttonTogglers.dispatchEvent(Click);

			if(modal.classList.contains('modal--open')) {
				truthy = true;
			}

			truthy.should.equal(true);
		});

		it('should remove the class of modal--open when data-modal-toggle is selected when the modal is open', () => {
			let truthy = false;
			const modal = dom.window.document.querySelector('[data-modal]');
			const buttonTogglers = dom.window.document.querySelector('[data-modal-toggle]');

			const Click = new dom.window.MouseEvent('click', { });

			buttonTogglers.dispatchEvent(Click);

			if(modal.classList.contains('modal--open')) {

				buttonTogglers.dispatchEvent(Click);

				if(!modal.classList.contains('modal--open')) {
					truthy = true;
				}

			}

			truthy.should.equal(true);
		});

		it('should set focus on the first focusable element in the modal when opened', () => {
			let truthy = false;
			const modal = dom.window.document.querySelector('[data-modal]');
			const buttonTogglers = dom.window.document.querySelector('[data-modal-toggle]');

			const focusableElements = modal.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

			const Click = new dom.window.MouseEvent('click', { });

			buttonTogglers.dispatchEvent(Click);

			if(dom.window.document.activeElement === focusableElements[0]) {
				truthy = true;
			}

			truthy.should.equal(true);
		});

		it('should reset the focus back to the trigger element when the modal closes', () => {
			let truthy = false;
			const modal = dom.window.document.querySelector('[data-modal]');
			const buttonTogglers = dom.window.document.querySelectorAll('[data-modal-toggle]');

			const Click = new dom.window.MouseEvent('click', { });

			buttonTogglers[0].dispatchEvent(Click);

			if(modal.classList.contains('modal--open')) {

				buttonTogglers[1].dispatchEvent(Click);

				if(dom.window.document.activeElement === buttonTogglers[0]) {
					truthy = true;
				}

			}

			truthy.should.equal(true);
		});

		it('should close all modals that are open when the escape key is clicked.', () => {
			let truthy = false;
			const modal = dom.window.document.querySelector('[data-modal]');
			const buttonTogglers = dom.window.document.querySelectorAll('[data-modal-toggle]');

			const KEY_ESC = new dom.window.KeyboardEvent('keydown', { keyCode: 27 });

			const EVENT_CLICK = new dom.window.MouseEvent('click', { });

			buttonTogglers[0].dispatchEvent(EVENT_CLICK);

			dom.window.document.body.dispatchEvent(KEY_ESC);

			if(!modal.classList.contains('modal--open')) {
				truthy = true;
			}

			truthy.should.equal(true);
		});

	});
};
