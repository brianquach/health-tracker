# Health Tracker
Health web application powered by [Nutritionix](https://developer.nutritionix.com/) API that helps track your daily calorie and fat intake. A demo can be found [here](https://brianquach.github.io/health-tracker/dist/index.html). Features include:

* Food search
* Persistent data
* API Error handling
* Responsive layout
* Jasmine test suit
* JSDoc documentation

## Table of Contents
* [Installation and Run](#installation-and-run)
* [Build Process](#build-process)
* [Documentation and Test Suite](#documentation-and-test-suite)
* [Creator](#creator)
* [Copyright and License](#copyright-and-license)

## Installation and Run
Grab code source:
* Clone repository: `git clone https://github.com/brianquach/health-tracker.git` or download the zip [here](https://github.com/brianquach/health-tracker/archive/master.zip).
* Navigate to the directory where you cloned the repo or unzipped the file to and open folder `dist`.
* Use your favorite browser to open `index.html`.

## Build Process
This project was built with the aid of [Bower](https://bower.io/), [NPM](https://www.npmjs.com/), [Sass](http://sass-lang.com/), and [Gulp](http://gulpjs.com/).

To grab the required 3rd-party frameworks, follow the instructions:
* Install [Bower](https://bower.io/#install-bower).
* Navigate to project's root folder.
* Run `bower install`
* Frameworks should be under `./bower_components`

To run project's build process, follow the following instructions:
* Install [NPM](https://docs.npmjs.com/getting-started/installing-node).
* Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md).
* Navigate to project's root folder.
* Run `npm install` to let NPM install required Gulp plugins.
* Run `gulp optimize`.

####Gulp Task Overview:
* `gulp default`: watches JS, CSS, and SCSS to trigger the build task.
* `gulp build`: compiles SASS, minifies JS and CSS, and moves assets to `dist`.
* `gulp doc`: runs [JSDocs](http://usejsdoc.org/) to generate code documentation (`docs\gen`).
* `gulp test`: runs [Jasmine](https://jasmine.github.io/index.html) test suite.

# Documentation and Test Suite
Code is documented using [JSDocs](http://usejsdoc.org/) and tested using [Jasmine](https://jasmine.github.io/index.html). See `docs\gen\index.html` to learn more about the code base and structure. To execute unit tests, run `gulp test` and navigate to `localhost:8888`.

## Creator
**Brian Quach**
* <https://github.com/brianquach>
* <http://bkquach.com>
* <https://www.linkedin.com/in/13rianquach>

## Copyright and License
Code copyright 2017 Brian Quach. Code released under the [MIT license](https://github.com/brianquach/health-tracker/blob/master/LICENSE).
