# Complety - An Auto Complete Plugin

[![Tests](https://github.com/wbotelhos/complety/workflows/Tests/badge.svg)](https://github.com/wbotelhos/complety/actions)
[![NPM Version](https://badge.fury.io/js/complety.svg)](https://badge.fury.io/js/complety)
[![Maintainability](https://api.codeclimate.com/v1/badges/7aba78eff57e5d5049ff/maintainability)](https://codeclimate.com/github/wbotelhos/complety/maintainability)
[![Sponsor](https://img.shields.io/badge/sponsor-%3C3-green)](https://github.com/sponsors/wbotelhos)

Complety is a plugin that generates an autocomplete.

## Options

|Attribute            |Default                    |Description                                                |
|---------------------|---------------------------|-----------------------------------------------------------|
|cache                |true                       |enables cache                                              |
|cacheData            |{}                         |keeps json results on keys represented by the request url  |
|delay                |300                        |time in milliseconds to delay the search after user typing |
|functions.getValue   |undefined                  |function to choose which attribute of json to use on search|
|keys                 |undefined                  |keys of json that will be highlighted                      |
|minChars             |1                          |minimum of chars typed to trigger the search               |
|params               |{}                         |literal or function params sent to query                   |
|suggestion           |undefined                  |an initial suggestion to be shown                          |
|templates.none       |undefined                  |compiled template used to render suggestion of no results  |
|templates.search     |undefined                  |compiled template used to render suggestion                |
|url                  |undefined                  |search url                                                 |
|wrappers.field       |'.complety__field'         |class used on field                                        |
|wrappers.item        |'.complety__item'          |class used suggestion items                                |
|wrappers.itemSelected|'.complety__item--selected'|class used on selected item of suggestion                  |
|wrappers.list        |'.complety__list'          |class used on suggestions list                             |
|wrappers.loading     |'.complety__field--loading'|class used on field during search                          |
|wrappers.none        |'.complety__none'          |class used on item that show no result message             |
|wrappers.wrapper     |'.complety'                |class used on complety wrapper                             |

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

|Methods                 |Description                             |
|------------------------|----------------------------------------|
|complety.abort()        |aborts all pending requests             |
|complety.hide()         |hides the last suggestions              |
|complety.loader('start')|starts the loading animation            |
|complety.loader('stop') |starts or stops the loading animation   |
|complety.readonly(true) |enables fields readonly                 |
|complety.readonly(false)|disables fields readonly                |
|complety.search('value')|executes a search                       |
|complety.show()         |show the last suggestions               |
|complety.suggest(json)  |suggest a json result                   |
|complety.suggestion()   |returns the selected suggestion         |
|complety.suggestions()  |returns suggestions from the last search|
|complety.url()          |returns the actual builded url          |
|complety.wrappers()     |returns the wrappers name               |

## Events

|Events                       |Description                                                     |
|-----------------------------|----------------------------------------------------------------|
|complety:always              |when ajax executes `always` callback. arguments: `json, this`   |
|complety:fail                |when ajax executes `fail` callback. arguments: `json, this`     |
|complety:done                |when ajax executes `done` callback. arguments: `json, this`     |
|complety:suggested           |when some suggestion is displayed: `suggestion, this`           |
|complety:none                |when no suggestion result is displayed: arguments: `value, this`|
