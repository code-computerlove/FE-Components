# Modal Dialog

Modals are pretty straight forward to do but what we all tend to forget is that Modals/Dialogs need to be accessible. Based on [this article](https://bitsofco.de/accessible-modal-dialog/) we have managed to build a modal that can be simply dropped into your solution. We have written tests around the following:

- Markup the Dialog and Dialog Overlay Appropriately
- On Dialog Open, Set Focus
- On Dialog Close, Return Focus to the Last Focused Element
- Allow the ESC Key to Close the Dialog

Things that just work based on the CSS:
- While Open, Prevent Mouse Clicks Outside the Dialog

## Modal

The modal wrapper needs to have the role of `dialog` applied to the component.

```html
<div class="modal" role="dialog"></div>
```

Next it will need `aria-labelledby` & `aria-describedby` on the modal.
```html
<div class="modal" role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogText">
```

Finally we need to add our JS data attribute `data-modal=""` & an Id of what you want to call your modal `id="myModal"`.

```html
<div class="modal" data-modal="" id="modalWindow" role="dialog" aria-labelledby="dialogTitle" aria-describedby="dialogText"></div>
```

## Modal Toggle Buttons

This is how you should markup your buttons that toggle the visibility of the modal from showing and hiding. 

Firslty we will be using an anchor tag to initiate the button click instead of a button. The reason is because when there is no JavaScript we can use CSS `:target` to open and close.

We also need to add the data attribute `data-modal-toggle`. The data attribute needs to have the name of the modal you want to open. Just incase there is multiple modals on the page.

```html
<a href="#myModal" class="button" role="button" data-modal-toggle="myModal">
  Read More
</a>
```

## Modal overlay

Even though we have the escape key to leave the modal we also have the ability to leave the modal if you click on the overlay. To do this add `data-modal-toggle="myModal"` onto the overlay element.

```html
<div class="modal__overlay" data-modal-toggle="modalWindow"></div>
```

## CSS

```css

.modal__overlay {
  background: rgba(0, 0, 0, 0.5);
  display: none;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
}

.modal {
  background: white;
  border-radius: 5px;
  display: none;
  left: 50%;
  padding: 20px;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  z-index: 3;
}

.modal--open,
.modal--open + .modal__overlay,
.no-js .modal:target,
.no-js .modal:target + .modal__overlay {
  display: block;
}
```

## Note: How to handle new elements that get added to the modal

Adding new elements to the modal will break the keyboard trap fucntionality. Here is my work around this bug.

Make a function that unbinds all the current elements that are currently bound to the modal. Example: a close button. This is something that would just sit in the modal at all times. We dont want the bind a keydown event to the button more than once. What we need is an unbind function.

```js
function unbindFocusEvents() {
  focusableElements.forEach(element => { element.removeEventListener('keydown', handleKeyDownEvents); });
}
```

Once the function is added, create the reset function. What this function will do is it will:

- Unbind the current focus elements
- Reset the focusableElements, firstFocusableEl & lastFocusableEl 
- Bind the new focusableElements

This is how that would look:

```js
function resetFocusableElements() {

  unbindFocusEvents();

  focusableElements = Array.prototype.slice.call(component.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
  firstFocusableEl  = focusableElements[0];
  lastFocusableEl = focusableElements[focusableElements.length - 1];

  bindFocusEvents();
}
```

The final step we need to take is to make this function public so when a new html gets added to the modal we can call the reset after.

```js
return {
  init: init,
  resetFocusableElements: resetFocusableElements
};
```

Here is a basic example of how this would work:

```js
(function(Modal) {
  'use strict';

  const modal = document.querySelector(`[data-modal="myModal"]`);
	let ModalInstance = null;

  const buttons = Array.prototype.slice.call(document.querySelectorAll(`[data-modal-toggle]`));

  function populateHTML() {
		// some innerHTML stuff
		var html = `<a href="/path/to/somewhere">Hello World</a>`
    ModalInstance.resetFocusableElements();
  }

  buttons.forEach(button => { button.addEventListener('click', populateHTML) });

  if(modal !== null) {
    ModalInstance = new Modal(element);
    ModalInstance.init();
  }
	
}(window.Code.ModalDialog));

```

## Resources 
- [Demo Example](http://code-computerlove-fe-components.surge.sh/modal-dialog/)
- [Creating an accessible modal](https://bitsofco.de/accessible-modal-dialog/)
