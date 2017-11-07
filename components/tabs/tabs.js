(function() {
	'use strict';

	const states = {
		buttonActive: 'tabs__button--active',
		panelActive: 'tabs__panel--active'
	};

	const attributes = {
		button: 'data-tabs-button',
		panel: 'data-tabs-panel',
	};

	window.Code = window.Code || {};

	window.Code.Tabs = function(component) {
		'use strict';

		const selectors = {
			buttons: Array.prototype.slice.call(component.querySelectorAll(`[${attributes.button}]`)),
			panels: Array.prototype.slice.call(component.querySelectorAll(`[${attributes.panel}]`))
		};

		const keyboardHandlers = {
			'39': handleArrowRightEvent,
			'37': handleArrowLeftEvent,
			'36': goToFirstTab,
			'35': goToLastTab
		};

		const activeElements = {
			button: component.querySelector(`.${states.buttonActive}`),
			panel: component.querySelector(`.${states.panelActive}`)
		};

		function removeActiveElement() {
			activeElements.button.setAttribute('tabindex', '-1');
			activeElements.button.setAttribute('aria-selected', 'false');
			activeElements.button.classList.remove(states.buttonActive);
			activeElements.panel.classList.remove(states.panelActive);
		}

		function addActiveElement() {
			activeElements.button.setAttribute('tabindex', '0');
			activeElements.button.setAttribute('aria-selected', 'true');
			activeElements.button.classList.add(states.buttonActive);
			activeElements.button.focus();
			activeElements.panel.classList.add(states.panelActive);
		}

		function setActiveElements(button, panel) {
			activeElements.button = button;
			activeElements.panel = panel;
		}

		function setElementsForIndexActive(index) {
			setActiveElements(
				component.querySelector(`[${attributes.button}="${index}"]`),
				component.querySelector(`[${attributes.panel}="${index}"]`)
			);
		}

		function getCurrentIndex() {
			return parseInt(activeElements.button.getAttribute(attributes.button));
		}

		function setFirstElementActive() {
			setActiveElements(
				selectors.buttons[0],
				selectors.panels[0]
			);
		}

		function setLastElementActive() {
			setActiveElements(
				selectors.buttons[selectors.buttons.length - 1],
				selectors.panels[selectors.panels.length - 1]
			);
		}

		function goToFirstTab() {
			removeActiveElement();
			setFirstElementActive();
			addActiveElement();
		}

		function goToLastTab() {
			removeActiveElement();
			setLastElementActive();
			addActiveElement();
		}

		function handleArrowLeftEvent(element) {
			let currentIndex = getCurrentIndex();

			removeActiveElement();

			if(currentIndex === 0) {
				setLastElementActive();
			} else {
				currentIndex--;
				setElementsForIndexActive(currentIndex);
			}

			addActiveElement();
		}

		function handleArrowRightEvent(element) {
			let currentIndex = getCurrentIndex();

			removeActiveElement();

			if(currentIndex === selectors.buttons.length - 1) {
				setFirstElementActive();
			} else {
				currentIndex++;
				setElementsForIndexActive(currentIndex);
			}

			addActiveElement();
		}

		function handleClickEvent(event) {
			const currentIndex = parseInt(event.currentTarget.getAttribute(attributes.button));
			removeActiveElement();
			setElementsForIndexActive(currentIndex);
			addActiveElement();
		}

		function keyboardHandler(event) {
			if(keyboardHandlers.hasOwnProperty(event.keyCode)) {
				event.preventDefault();
				keyboardHandlers[event.keyCode](event.currentTarget);
			}
		}

		selectors.buttons.forEach(element => {
			element.addEventListener('keydown', keyboardHandler);
			element.addEventListener('click', handleClickEvent);
		});

		return {
			setActiveElements: setActiveElements
		};

	};

	const tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tabs]'));

	tabs.forEach(element => {
		const newTabs = new window.Code.Tabs(element);
	});
})();


