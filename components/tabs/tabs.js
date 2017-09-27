(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.Tabs = function(component) {
		'use strict';

		const selectors = {
			buttons: component.querySelectorAll('[data-tabs-button]'),
			panels: component.querySelectorAll('[data-tabs-panel]')
		};

		const states = {
			buttonActive: 'tabs__button--active',
			panelActive: 'tabs__panel--active'
		};

		const keyboardHandlers = {
			ArrowRight: handleArrowRightEvent,
			ArrowLeft: handleArrowLeftEvent,
			Home: goToFirstTab,
			End: goToLastTab
		};

		const activeElements = {
			button: component.querySelector(`.${states.buttonActive}`),
			panel: component.querySelector(`.${states.panelActive}`)
		};

		function removeActiveElement() {
			activeElements.button.setAttribute('tabindex', '-1');
			activeElements.button.classList.remove(states.buttonActive);
			activeElements.panel.classList.remove(states.panelActive);
		}

		function addActiveElement() {
			activeElements.button.setAttribute('tabindex', '0');
			activeElements.button.classList.add(states.buttonActive);
			activeElements.button.focus();
			activeElements.panel.classList.add(states.panelActive);
		}

		function setActiveElements(button, panel) {
			activeElements.button = button;
			activeElements.panel = panel;
		}

		function getCurrentIndex() {
			return parseInt(activeElements.button.getAttribute('data-tabs-button'));
		}

		function goToFirstTab() {
			removeActiveElement();
			setActiveElements(selectors.buttons[0], selectors.panels[0]);
			addActiveElement();
		}

		function goToLastTab() {
			removeActiveElement();
			setActiveElements(selectors.buttons[selectors.buttons.length - 1], selectors.panels[selectors.panels.length - 1]);
			addActiveElement();
		}

		function handleArrowLeftEvent(element) {
			var currentIndex = getCurrentIndex();

			removeActiveElement();

			if(currentIndex === 0) {
				setActiveElements(selectors.buttons[selectors.buttons.length - 1], selectors.panels[selectors.panels.length - 1]);
			} else {
				currentIndex--;
				setActiveElements(component.querySelector(`[data-tabs-button="${currentIndex}"]`), component.querySelector(`[data-tabs-panel="${currentIndex}"]`));
			}

			addActiveElement();

		}

		function handleArrowRightEvent(element) {
			var currentIndex = getCurrentIndex();

			removeActiveElement();

			if(currentIndex === selectors.buttons.length - 1) {
				setActiveElements(selectors.buttons[0], selectors.panels[0]);
			} else {
				currentIndex++;
				setActiveElements(component.querySelector(`[data-tabs-button="${currentIndex}"]`), component.querySelector(`[data-tabs-panel="${currentIndex}"]`));
			}

			addActiveElement();
		}

		function handleClickEvent(event) {
			const currentIndex = parseInt(event.currentTarget.getAttribute('data-tabs-button'));
			removeActiveElement();
			setActiveElements(component.querySelector(`[data-tabs-button="${currentIndex}"]`), component.querySelector(`[data-tabs-panel="${currentIndex}"]`));
			addActiveElement();
		}

		function keyboardHandler(event) {
			if(keyboardHandlers.hasOwnProperty(event.code)) {
				keyboardHandlers[event.code](event.currentTarget);
			}
		}

		selectors.buttons.forEach(element => {
			element.addEventListener('keyup', keyboardHandler);
			element.addEventListener('click', handleClickEvent);
		});

		return {
			setActiveElements: setActiveElements
		};

	};

	var tabs = document.querySelector('[data-tabs]');

	new window.Code.Tabs(tabs);
})();


