
(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.Accordion = function(component) {
		const buttons = Array.prototype.slice.call(component.querySelectorAll('[data-accordion-button]'));

		const ACTIVE_BUTTON = 'accordion__button--active';
		const ACTIVE_SECTION = 'accordion__content--open';

		let activeButton = component.querySelector(`.${ACTIVE_BUTTON}`);
		let activeSection = component.querySelector(`.${ACTIVE_SECTION}`);

		function getOffsetHeight(el) {
			const style = getComputedStyle(el);
			return el.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);
		}

		function animateOpenHeight(section) {
			const height = getOffsetHeight(section.querySelector('[data-accordion-content-wrapper]'));
			section.setAttribute(`style`, `height: ${height}px;`);
		}

		function delayCloseClass(section) {
		}

		function closeSection(section) {
			section.setAttribute(`style`, `height: 0px;`);
			section.classList.remove(ACTIVE_SECTION);
		}

		function removeActiveButtonState(button) {
			button.classList.remove(ACTIVE_BUTTON);
			button.setAttribute('aria-expanded', false);
		}

		function openSection(section) {
			section.classList.add(ACTIVE_SECTION);
			animateOpenHeight(section);
			activeSection = section;
		}

		function addActiveButtonState(button) {
			button.classList.add(ACTIVE_BUTTON);
			button.setAttribute('aria-expanded', true);
			activeButton = button;
		}

		function closeAccordion(button, section) {
			removeActiveButtonState(button);
			closeSection(section);
		}

		function openAccordion(button, section) {

			if(activeButton !== null) {
				closeAccordion(activeButton, activeSection);
			}

			addActiveButtonState(button);
			openSection(section);
		}

		function handleAccordionToggle(event) {
			const currentButton = event.currentTarget;
			const currentSection = currentButton.parentNode.querySelector('[data-accordion-section]');
			const isOpen = currentSection.classList.contains(ACTIVE_SECTION);

			isOpen ? closeAccordion(currentButton, currentSection) : openAccordion(currentButton, currentSection);
		}

		buttons.forEach(button => button.addEventListener('click', handleAccordionToggle));
	};

	new window.Code.Accordion(document.querySelector('[data-accordion]'));
}());
