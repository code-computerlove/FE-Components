
(function() {
	'use strict';

	window.Code = window.Code || {};

	window.Code.Component = function(component) {};

	const elements = Array.prototype.slice.call(document.querySelector(`[data-component]`));

	elements.forEach(element => { new window.Code.Component() });
}());
