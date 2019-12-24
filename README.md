# Complety - An Auto Complete Plugin

[![Build Status](https://img.shields.io/travis/wbotelhos/complety/master.svg)](https://travis-ci.org/wbotelhos/complety)
[![NPM Version](https://badge.fury.io/js/complety.svg)](https://badge.fury.io/js/complety)
[![Dependency](https://david-dm.org/wbotelhos/complety.svg)](https://david-dm.org/wbotelhos/complety)
[![Dev Dependency](https://david-dm.org/wbotelhos/complety/dev-status.svg)](https://david-dm.org/wbotelhos/complety#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/wbotelhos/complety.png)](https://codeclimate.com/github/wbotelhos/complety)
[![Support](https://img.shields.io/badge/donate-%3C3-brightgreen.svg)](https://www.patreon.com/wbotelhos)

Complety is a plugin that generates an autocomplete.

## Options

```js
cache:                 {}                          // keeps json results on keys represented by the request url
delay:                 300                         // time in milliseconds to delay the search after user typing
functions.getValue:    undefined                   // function to choose which attribute of json to use on search
keys:                  undefined                   // keys of json that will be highlighted
minChars:              1                           // minimum of chars typed to trigger the search
params:                {}                          // params sent to query
suggestion:            undefined                   // an initial suggestion to be shown
templates.none:        undefined                   // compiled template used to render suggestion of no results
templates.search:      undefined                   // compiled template used to render suggestion
url:                   undefined                   // search url
wrappers.field:        '.complety__field'          // class used on field
wrappers.item:         '.complety__item'           // class used suggestion items
wrappers.itemSelected: '.complety__item--selected' // class used on selected item of suggestion
wrappers.list:         '.complety__list'           // class used on suggestions list
wrappers.loading:      '.complety__field--loading' // class used on field during search
wrappers.none:         '.complety__none'           // class used on item that show no result message
wrappers.target:       '.complety__target'         // class used on wrapper that keeps the suggestions list
wrappers.wrapper:      '.complety'                 // class used on complety wrapper
```

## Usage

You declare an element with optional data atributes:

```html
<input data-url="/update" type="search">

```

On JS you can declare attributes too, but data attributes has priority:

```js
$('input').complety({ keys: ['name'] });
```

## Functions

```js
complety.abort()              // aborts all pending requests
complety.hide()               // hides the last suggestions
complety.loader('start|stop') // starts or stops the loading animation
complety.readonly(true|false) // enables or disables fields readonly
complety.search('value')      // executes a search
complety.show()               // show the last suggestions
complety.suggest(json)        // suggest a json result
complety.suggestion()         // returns the selected suggestion
complety.suggestions()        // returns suggestions from the last search
complety.url()                // returns the actual builded url
complety.wrappers()           // returns the wrappers name
```

## Events

```js
`complety:always`: when ajax executes `always` callback. arguments: `json, this`
`complety:fail`: when ajax executes `fail` callback. arguments: `json, this`
`complety:done`: when ajax executes `done` callback. arguments: `json, this`
`complety:suggested`: when some suggestion is displayed: `suggestion, this`
`complety:none`: when no suggestion result is displayed: arguments: `value, this`
```
