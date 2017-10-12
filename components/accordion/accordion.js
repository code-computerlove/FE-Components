
(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.Accordion = function(component) {
		const accordionButtons = Array.prototype.slice.call(component.querySelectorAll('[data-accordion-button]'));
		const accordionTabs = Array.prototype.slice.call(component.querySelectorAll('[data-accordion-content-area]'));

		const ariaExpanded = 'aria-expanded';
		const ariaHidden = 'aria-hidden';

		function showAccordionTab(button, section) {
			button.setAttribute(ariaExpanded, true);
			section.setAttribute(ariaHidden, false);
		}

		function hideAccordionTab(button, section) {
			button.setAttribute(ariaExpanded, false);
			section.setAttribute(ariaHidden, true);
		}

		function closeAllAccordions() {
			accordionButtons.forEach((element, i) => {
				hideAccordionTab(element, accordionTabs[i]);
			});
		}

		function toggleAccordion(event) {
			const activeButton = event.currentTarget;
			const activeContentArea = activeButton.parentNode.querySelector('[data-accordion-content-area]');

			if(activeButton.getAttribute(ariaExpanded) === 'true') {
				hideAccordionTab(activeButton, activeContentArea);
			} else {
				closeAllAccordions();
				showAccordionTab(activeButton, activeContentArea);
			}
		}

		function init() {
			accordionButtons.forEach(element => element.addEventListener('click', toggleAccordion));
		}

		init();
	};

	new window.Code.Accordion(document.querySelector('[data-accordion]'));
}());
