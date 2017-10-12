# Accordion
Here is a list of guidelines we have followed to write our tests.

*   Add an **aria-label** on the **ul** tag to let the user know explicitly that they are dealing with accordions.
*   Every content area has an id that matches up with the **aria-controls** for each button. **Hint:** This will be difficult to test on a BE solution as the **id** will change. So just check if the attribute exists and does it match with the content area next to it.
*   The buttons should have an attribute of **aria-expanded** to be false
*   Each content area has **aria-hidden** set to it. **Hint:** Use CSS to set the **aria-hidden** to display none.
*   When I click/focus on an accordion button, the tab section should have an attribute of **aria-hidden** that is false.
*   When I click/focus on an accordion button, the button should have an attribute of **aria-expanded** that is true.
*   When I click/focus on an active accordion button, the button should have an attribute of **aria-expanded** that is false.
*   When I click/focus on an active accordion button, the tab section should have an attribute of **aria-hidden** that is false.

## Markup

```html
<ul class="accordion" aria-label="Hello World Accordion" data-accordion>
  <li class="accordion__section">
    <button class="accordion__toggler" aria-expanded="false" aria-controls="item1" data-accordion-button>Item One</button>
    <div class="accordion__content-area" id="item1" aria-hidden="true" data-accordion-content-area>
      Hello World Content One
    </div>
  </li>
  <li class="accordion__section">
    <button class="accordion__toggler" aria-expanded="false" aria-controls="item2" data-accordion-button>Item Two</button>
    <div class="accordion__content-area" id="item2" aria-hidden="true" data-accordion-content-area>
      Hello World Content Two
    </div>
  </li>
</ul>

```

## CSS

```css
.accordion__content-area[aria-hidden="true"] {
  display: none;
}

.accordion__content-area[aria-hidden="false"],
.no-js .accordion__content-area[aria-hidden="true"],
.no-js .accordion__toggler:focus + .accordion__content-area {
  display: block;
}
```

## JS
Add the library into your bundle then you can initiate it by creating a new instance of the module.

```js
(function() {
  'use strict';

  window.Code = window.Code || {};

  window.Code.Accordion = function(component) {
    ...
  }

  const Accordion = new window.Code.Accordion(document.querySelector('[data-accordion]'));
	
}());
```

## Resources 

- [Accordions | Accessible Guidelines](http://web-accessibility.carnegiemuseums.org/code/accordions/)
