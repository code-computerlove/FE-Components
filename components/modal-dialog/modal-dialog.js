
(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.ModalDialog = function(component) {

		const MODAL_TOGGLE_ATTR 				= 'data-modal-toggle';

		const modalToggle 							= Array.prototype.slice.call(document.querySelectorAll(`[${MODAL_TOGGLE_ATTR}]`));
		const focusableElements 				= Array.prototype.slice.call(component.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));

		let previousFocusedElement 			= null;
		let firstFocusableEl 						= focusableElements[0];
		let lastFocusableEl 						= focusableElements[focusableElements.length - 1];

		function isModalOpen() {
			return component.classList.contains('modal--open');
		}

		function addModalClass() {
			component.classList.add('modal--open');
		}

		function removeModalClass() {
			component.classList.remove('modal--open');
		}

		function setFocusToElement(element) {
			element.focus();
		}

		function handleBackwardsTab(event) {
			if(document.activeElement === firstFocusableEl) {
				event.preventDefault();
				setFocusToElement(lastFocusableEl);
			}
		}

		function handleForwardTab(event) {
			if(document.activeElement === lastFocusableEl) {
				event.preventDefault();
				setFocusToElement(firstFocusableEl);
			}
		}

		function keyBoardTrapModal(event) {
			if(focusableElements.length === 1) {
				event.preventDefault();
				return;
			}

			event.shiftKey ? handleBackwardsTab(event) : handleForwardTab(event);
		}

		function handleKeyDownEvents(event) {
			const keyCodes = {
				'27': closeModal,
				'9': keyBoardTrapModal
			};

			if(keyCodes.hasOwnProperty(event.keyCode) && isModalOpen()) {
				keyCodes[event.keyCode](event);
			}
		}

		function handleEscapeKeyEvent(event) {
			const keyCodes = {
				'27': closeModal
			};

			if(keyCodes.hasOwnProperty(event.keyCode) && isModalOpen()) {
				keyCodes[event.keyCode](event);
			}
		}

		function showModal(currentTarget) {
			addModalClass();
			setFocusToElement(focusableElements[0]);
			previousFocusedElement = currentTarget;
			document.body.addEventListener('keydown', handleEscapeKeyEvent);
		}

		function closeModal() {
			removeModalClass();
			setFocusToElement(previousFocusedElement);
			document.body.removeEventListener('keydown', handleEscapeKeyEvent);
		}

		function handleClickEvent(event) {
			event.preventDefault();
			!isModalOpen() ? showModal(event.currentTarget) : closeModal();
		}

		function bindFocusEvents() {
			focusableElements.forEach(element => { element.addEventListener('keydown', handleKeyDownEvents); });
		}

		function init() {
			modalToggle.forEach(element => element.addEventListener('click', handleClickEvent));
			bindFocusEvents();
		}

		return {
			init: init
		};
	};

	// you dont need this bit.
	const elements = Array.prototype.slice.call(document.querySelectorAll(`[data-modal]`));

	elements.forEach(element => {
		const newModal = new window.Code.ModalDialog(element);
		newModal.init();
	});
}());
