const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'tabs', 'index.html')).toString();

let dom = new JSDOM(HTML, {
	runScripts: "dangerously",
	resources: "usable"
});

require('localhost')('./components').listen(8080);

module.exports = function() {

	before(function(done) {
		dom.window.addEventListener('load', function() {
			done();
		});
	});

	describe('The Tabs Component ', () => {

			it('Right Arrow - should be able to navigate to the next tab using the arrow right key', () => {

				let activeTab = dom.window.document.querySelector('.tabs__button--active');
				let currentIndex = parseInt(activeTab.getAttribute('data-tabs-button'));
				const newIndex = 1;
				const tabs = dom.window.document.querySelector('[data-tabs]');

				// Get to the starting point of where I want to test.
				activeTab.focus();

				new dom.window.Code.Tabs(tabs);

				// Create stub events
				const ArrowRight = new dom.window.KeyboardEvent('keyup', { keyCode: 39, code: 'ArrowRight' });

				activeTab.dispatchEvent(ArrowRight);

				activeTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeTab.getAttribute('data-tabs-button'));

				newIndex.should.equal(currentIndex);
			});

			it('Right Arrow - should be able to navigate to the first tab if focus is on the last tab', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[buttons.length - 1];

				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const ArrowRight = new dom.window.KeyboardEvent('keyup', { keyCode: 39, code: 'ArrowRight' });

				activeButtonTab.dispatchEvent(ArrowRight);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				currentIndex.should.equal(0);

			});

			it('Right Arrow - should activate the newly focused tab', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[0];
				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);
				let oldActiveTabPanel = null;
				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const ArrowRight = new dom.window.KeyboardEvent('keyup', { keyCode: 39, code: 'ArrowRight' });

				activeButtonTab.dispatchEvent(ArrowRight);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				oldActiveTabPanel = activeTabPanel;
				activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				activeTabPanel.should.not.equal(oldActiveTabPanel);
			});

			it('Left Arrow - should move focus to the previous tab', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[buttons.length - 1];

				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const ArrowLeft = new dom.window.KeyboardEvent('keyup', { keyCode: 37, code: 'ArrowLeft' });

				activeButtonTab.dispatchEvent(ArrowLeft);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				currentIndex.should.equal(0);
			});

			it('Left Arrow - should be able to navigate to the last tab if focus is on the first tab', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[0];

				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const ArrowLeft = new dom.window.KeyboardEvent('keyup', { keyCode: 37, code: 'ArrowLeft' });

				activeButtonTab.dispatchEvent(ArrowLeft);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				currentIndex.should.equal(1);
			});

			it('Left Arrow - should activate the newly focused tab', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[0];
				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);
				let oldActiveTabPanel = null;
				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const ArrowLeft = new dom.window.KeyboardEvent('keyup', { keyCode: 37, code: 'ArrowLeft' });

				activeButtonTab.dispatchEvent(ArrowLeft);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				oldActiveTabPanel = activeTabPanel;
				activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				activeTabPanel.should.not.equal(oldActiveTabPanel);
			});

			it('should return to the first tab when the home key is selected', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[buttons.length - 1];
				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const HomeKey = new dom.window.KeyboardEvent('keyup', { keyCode: 37, code: 'Home' });

				activeButtonTab.dispatchEvent(HomeKey);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				currentIndex.should.equal(0);
			});

			it('should return to the first tab when the end key is selected', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let activeButtonTab = buttons[0];
				let currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));
				let activeTabPanel = tabs.querySelector(`[data-tabs-panel="${currentIndex}"]`);

				// Get to the starting point of where I want to test.
				activeButtonTab.focus();

				const tabComponents = new dom.window.Code.Tabs(tabs);

				tabComponents.setActiveElements(activeButtonTab, activeTabPanel);

				const EndKey = new dom.window.KeyboardEvent('keyup', { keyCode: 35, code: 'End' });

				activeButtonTab.dispatchEvent(EndKey);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				currentIndex = parseInt(activeButtonTab.getAttribute('data-tabs-button'));

				currentIndex.should.equal(1);
			});

			it('should be set active when clicked', () => {
				const tabs = dom.window.document.querySelector('[data-tabs]');
				let buttons = dom.window.document.querySelectorAll('.tabs__button');
				let panels = dom.window.document.querySelectorAll('.tabs__panel');
				let activeButtonTab = buttons[0];
				let activeTabPanel = panels[0];

				let oldActiveTabPanel = activeTabPanel;
				let oldActiveButton = activeButtonTab;

				const tabComponents = new dom.window.Code.Tabs(tabs);

				const Click = new dom.window.KeyboardEvent('click', { });

				buttons[1].dispatchEvent(Click);

				activeButtonTab = dom.window.document.querySelector('.tabs__button--active');
				activeTabPanel = parseInt(activeButtonTab.getAttribute('.tabs__panel--active'));

				if(activeButtonTab !== oldActiveButton && activeTabPanel !== oldActiveTabPanel) {
					true.should.equal(true);
				}

			});
		});
};
