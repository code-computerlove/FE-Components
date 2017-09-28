# Tabs Component
This component demonstrates a tab widget that follows the format of the [W3 Tabs Example](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html). 
## Keyboard Support
> Note: Tests are located in ./test/tabs/index.js

This component has keyboard support of the following:

- **Tab**
  - When focus moves into the tab list, places focus on the active tab element (html markup)
  - When When the tab list contains the focus, moves focus to the next element in the tab sequence which is the tab panel. (html markup)
- **Right Arrow**
  - Moves focus to the next tab (JS)
  - If the focus is on the last tab, moves focus to the first tab (JS)
  - Activates the newly focus tab (JS)
- **Left Arrow**
  - Moves focus to the previous tab. (JS)
  - If focus to the previous tab, move focus to the first tab (JS)
  - Activates the newly focused tab
- **Home**
  - Moves focus to the first tab (JS)
- **End** 
  - Moves focus to the last tab (JS)


## Role, Property, State and TabIndex Attributes

### Tab List
The parent element of the tab buttons should have an `role="tablist"`.

```html
<div class="tabs__header" role="tablist">

</div>
```

The parent element should have an `aria-label` to decribe the purpose of the set of tabs.

```html
<div class="tabs__header" role="tablist" aria-label="Tab Panel">

</div>
```
### Tab Button
The button that represents the tab should have a `role="tab"`.This not only serves as a `tab control` but it will provide a title for its associated `tabpanel`.

When the button is active is needs the attribute of `aria-selected="true"`.If it is not active then `aria-selected="false"`.

If the button is not active it should have a `tabindex="-1"`.This is for when the focus is moved from the active tab button, it will go to the tab panel instead of going along the tab panel. 

Finally the button should have a `aria-controls="ID-of-tab-panel"` so it can be associated with the tab element. 

```html
<div class="tabs__header" role="tablist" aria-label="Tab Panel">
  <button class="tabs__button" role="tab" type="button" id="button-one" aria-selected="true" aria-controls="button-one-tab">
    Hello
  </button>
</div>
```

### Tab Panel
Each tab panel needs to have the `role` of `tabpanel`. It needs to have the `aria-labelledby="id-of-tab-button"` so when the focus is active on the tab panel the button text will act as a title for that section. 

Setting `tabindex="0"` on the tab panel will automatically give the div the ability to be focused on. This ticks off the `When When the tab list contains the focus, moves focus to the next element in the tab sequence which is the tab panel.` criteria. 

In our example we use a css class to set the display of `tabs__panel` to `block` when it has the `tabs__panel--active`. The other tabpanels will not have focus as they are set to `display: none;` by default. `no-js` class on the html parent will display all tabpanels.

```html

<div class="tabs__panel" role="tabpanel" aria-labelledby="button-one" id="button-one-tab" tabindex="0" data-tabs-panel="0">
</div>

```

### JS requirements

In the markup we need to add an attribute on the button call `data-tabs-button="id"`. The value has to match the attribute that will need to be added on the tabpanel component. This is so the JS can match which button pairs with which tabpanel. 

```html
<div class="tabs__header" role="tablist" aria-label="Tab Panel">
  <button class="tabs__button" role="tab" type="button" id="button-one" aria-selected="true" aria-controls="button-one-tab" data-tabs-button="0">
    Hello
  </button>
</div>
<div class="tabs__panel" role="tabpanel" aria-labelledby="button-one" id="button-one-tab" tabindex="0" data-tabs-panel="0">
</div>
```

## Reference 
- [Demo Example](http://code-computerlove-fe-components.surge.sh/tabs/)
- [Example of Tabs with Automation Activation](https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html)
