# FE Components
[![Build Status](https://travis-ci.org/code-computerlove/FE-Components.svg?branch=master)](https://travis-ci.org/code-computerlove/FE-Components)
> FE Components built for re-use.

## Installation

- `npm i`

## Tasks

- `npm run serve` - Spins up a `localhost:8080`
- `npm run test` - Runs the mocha tests & runs a Pa11y audit on `code-computerlove-fe-components.surge.sh`
- `gulp build` - used on the travis ci to push code to the surge domain.

## Creating new components

Located in the components folder is a predefined base. A sample test can be found in the test folder. Any additional tests can also be run from here.

```
- Components
  - New Component Folder
    - index.html
    - component.js
    - readme.md
    - style.css
- test
  - Component Name
    - index.js
```

### Index.html file

This will get pushed up to the surge domain and then Pa11y will run tests on it. It is also needed to be include into the Mocha & JSDOM tests. The HTML is added into the JSDOM enviroment.

### component.js
You can write ES6 in this file. When gulp build is ran it will run the code through babel and output ES5 code in the `./build` folder. 

### readme.md
Please make sure you provide evidence to the decisions that were made in building the component so other developers will understand why something is built in the way it has. For example:

```
The W3C states that this component should have keyboard functionality:
- Arrow right to move to the next control
- Arrow left to move to the previous control
```

## Testing Enviroment

This project uses Mocha to write the tests & it creates the enviroment using JSDOM.

### Mocha/JSDOM tests

The project has one main file where all of the tests run. In the `test` folder, there is a `index.js` file in the root. This spins up a localhost and runs the tests that get required into this file.

Example:

```js
require('localhost')('./components').listen(8080);
const component = require('./component/index')();
```

The localhost module is needed so the assets from the HTML files can be accessed by JSDOM.

Example of a `test/component/index.js` file:

Firstly we need to require all of our dependencies and get our HTML file.

```js
const should = require('should');
const path = require('path');
const fs = require('fs');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const HTML = fs.readFileSync(path.resolve('components', 'base', 'index.html')).toString();

let dom;
```
In each describe function, a new JSDOM enviroment is created. Once created, hook a load event to the window before the tests start running. JSDOM does not wait for render blocking scripts before it runs tests. All JS files are treated as `async` files so the best approach was to just run the tests on the load event. 

```js
module.exports = function() {
  describe('The Base Component ', () => {
    beforeEach(function(done) {
        dom = new JSDOM(HTML, {
        runScripts: "dangerously",
        resources: "usable"
      });

      // JS files get loaded in JSDOM Async no matter what.
      dom.window.addEventListener('load', function() {
        done();
      });
    });

    it('should be true', () => {
      const truthy = true;
      truthy.should.equal(true);
    });
  });

```

### Adding Pa11y Tests
When the build has done all files get pushed up to the `code-computerlove-fe-components.surge.sh` domain. Once pushed, add the url to `urls` array in the `./pa11y.js` file.

```js
const urls = [
  'http://code-computerlove-fe-components.surge.sh/base/index.html'
];
```
