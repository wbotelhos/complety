/*!
 * Complety - An Auto Complete Plugin
 *
 * The MIT License
 *
 * @author:  Washington Botelho
 * @doc:     wbotelhos.com/complety
 * @version: 0.2.0
 *
 */

;
(function($) {
  'use strict';

  $.complety = {
    cache:      {},
    delay:      300,
    getValue:   undefined,
    keys:       undefined,
    minChars:   1,
    templates:  { none: undefined, search: undefined },
    suggestion: undefined,
    url:        undefined,

    wrappers: {
      field:        '.complety__field',
      item:         '.complety__item',
      itemSelected: '.complety__item--selected',
      list:         '.complety__list',
      loading:      '.complety__field--loading',
      none:         '.complety__none',
      target:       '.complety__target',
      wrapper:      '.complety'
    }
  };

  $.fn.complety = function(options) {
    var settings = $.extend({}, $.complety, options);

    return this.each(function() {
      return (new $.complety.Complety(this, settings))._create();
    });
  }

  $.complety.Complety = (function() {
    var keys = {
      ALT:       18,
      BACKSPACE: 8,
      COMMAND:   91,
      CTRL:      17,
      DOWN:      40,
      ENTER:     13,
      ESC:       27,
      LEFT:      37,
      RIGHT:     39,
      SHIFT:     16,
      TAB:       9,
      UP:        38
    };

    var Complety = function(element, options) {
      this.el      = $(element);
      this.element = element;

      this.opt = $.extend(true, {}, $.fn.complety.defaults, options, this.el.data());
    }

    Complety.prototype = {
      _able: function() {
        return this.currentValue && this.currentValue.length >= this.opt.minChars;
      },

      _ajax: function(url) {
        this.loader('start');

        var ajax = $.ajax(url);

        if (this.xhrs.length) {
          this.abort();
        }

        this.xhrs.push(ajax);

        return ajax;
      },

      _always: function(json) {
        this.loader('stop');

        this.el.trigger('complety:always', [json, this]);
      },

      _assigns: function() {
        this.xhrs = [];
      },

      _binds: function() {
        var that = this;

        this.el.on('keydown.complety', function(evt) {
          var
            key     = evt.which || evt.keyCode,
            stopped = [keys.ENTER, keys.DOWN, keys.UP];

          if (stopped.indexOf(key) >= 0) {
            that._stop(evt);
          }
        });

        this.el.on('keyup.complety', function(evt) {
          that._onKeyUp(evt, this.value);
        });

        this.target.on('click.complety', this.opt.wrappers.item, function() {
          that._select(this);
        });

        this.target.on('mouseenter.complety', this.opt.wrappers.item, function() {
          that._hover(this);
        });
      },

      _cache: function(json) {
        this.opt.cache[this.url()] = json;
      },

      _clearDelay: function() {
        clearTimeout(this.timeout);
      },

      _create: function() {
        this._findWrappers();
        this._assigns();
        this._prepare();
        this._binds();
        this._map();

        this.el.data('complety', this);

        return this;
      },

      _decide: function(key) {
        var action = this.actions[key];

        if (action) {
          action.call(this);
        } else if (!this._isIgnoredKey(key)) {
          this._search();
        }
      },

      _done: function(json) {
        if (json.length) {
          this._cache(json);
          this._render(json);
        } else {
          this._none();
        }

        this.el.trigger('complety:done', [json, this]);
      },

      _fail: function(json) {
        if (json.statusText !== 'abort') {
          this.el.trigger('complety:fail', [json, this]);
        }
      },

      _findWrappers: function() {
        this._setFieldWrapper();
        this._setWrapper();
        this._setNoneWrapper();
        this._setTargetWrapper();
      },

      _getValue: function(suggestion) {
        if ($.isFunction(this.opt.getValue)) {
          return this.opt.getValue.call(this, suggestion);
        }

        return suggestion.id;
      },

      _highlight: function(suggestion) {
        var highlight = $.extend(true, {}, suggestion);

        for (var i = 0; i < this.opt.keys.length; i++) {
          var
            path  = this.opt.keys[i].split('.'),
            regex = new RegExp('(' + this.el.val() + ')', 'i'),
            value = suggestion;

          for (var j = 0; j < path.length; j++) {
            value = value[path[j]];
          }

          if (value) {
            highlight[this.opt.keys[i]] = value.replace(regex, '<b>$1</b>');
          } else {
            $.error('Missing key: ' + this.opt.keys[i]);
          }
        }

        return highlight;
      },

      _highlights: function() {
        var that = this;

        return this.currentSuggestions.map(function(suggestion) {
          return that._highlight(suggestion);
        });
      },

      _highlightItem: function(number) {
        var
          index = number % this.target.data('total'),
          clazz = this.opt.wrappers.itemSelected.replace('.', '');

        this
          .target
          .data('current', index)
          .find(this.opt.wrappers.item)
          .removeClass(clazz)
          .eq(index)
          .addClass(clazz);
      },

      _hover: function(item) {
        var items = this.target.find(this.opt.wrappers.item);

        items.removeClass(this.opt.wrappers.itemSelected.replace('.', ''));

        $(item).addClass(this.opt.wrappers.itemSelected.replace('.', ''));
      },

      _hovered: function() {
        return this.target.find(this.opt.wrappers.itemSelected);
      },

      _isIgnoredKey: function(key) {
        return [
          keys.ALT,
          keys.COMMAND,
          keys.CTRL,
          keys.LEFT,
          keys.RIGHT,
          keys.SHIFT
        ].indexOf(key) >= 0;
      },

      _map: function() {
        if (!this.actions || !Object.keys(this.actions).length) {
          this.actions = {};

          this.actions[keys.ESC]  = this.hide;
          this.actions[keys.TAB]  = this.hide;
          this.actions[keys.UP]   = this._moveUp;
          this.actions[keys.DOWN] = this._moveDown;

          this.actions[keys.ENTER] = function() {
            var item = this._hovered();

            if (item.length) {
              this._select(item);
              this.hide();
            }
          };
        }
      },

      _current: function() {
        var hovered = this._hovered();

        return (hovered && hovered.index()) || this.target.data('current');
      },

      _moveDown: function() {
        var current = this._current();

        this.show();

        this._highlightItem((current === undefined ? -1 : current) + 1);
      },

      _moveUp: function() {
        var current = this._current();

        this.show();

        this._highlightItem((current || this.target.data('total')) - 1);
      },

      _none: function() {
        var value = this.el.val();

        this.hide();
        this.none.html(this.opt.templates.none({ q: value })).show();
        this.el.trigger('complety:none', [value, this]);
      },

      _onKeyUp: function(evt, value) {
        var key = evt.which || evt.keyCode;

        this.currentValue = $.trim(value);

        // if (this.currentValue) { // serch field cleans on esc so the items does not hide
        this._decide(key);
        this._stop(evt);
        // }
      },

      _prepare: function() {
        this.el.prop('autocomplete', 'off');

        if (this.opt.suggestion) {
          this.suggest(this.opt.suggestion);
        }
      },

      _query: function() {
        if (this._able()) {
          var cached = this.opt.cache[this.url()];

          if (cached) {
            this._always(cached);
            this._done(cached);
          } else {
            var
              ajax = this._ajax(this.url()),
              that = this;

            ajax.always(function(json) {
              that._always(json);
            });

            ajax.done(function(json) {
              that._done(json);
            });

            ajax.fail(function(json) {
              that._fail(json);
            });
          }
        }
      },

      _render: function(json) {
        this.currentSuggestions = json;

        var html = this.opt.templates.search({ list: this._highlights() });

        this.none.hide().empty();

        this.target.html(html).data('total', json.length);

        this.show();
      },

      _search: function() {
        if (this.timeout) {
          this.loader('stop');

          this._clearDelay();
        }

        this.timeout = setTimeout(this._query.bind(this), this.opt.delay);
      },

      _setFieldWrapper: function() {
        this.field = this.el.parent(this.opt.wrappers.field);

        if (!this.field.length) {
          var wrapper = this._wrapperFor('field');

          this.field = this.el.wrap(wrapper).parent();
        }
      },

      _select: function(item) {
        var index = this.target.find(this.opt.wrappers.item).index(item);

        this.suggest(this.currentSuggestions[index]);
      },

      _selected: function(suggestion) {
        this.hide();

        this.currentSuggestion = suggestion;

        this.el.trigger('complety:selected', [suggestion, this]);
      },

      _setNoneWrapper: function() {
        this.none = this.wrapper.find(this.opt.wrappers.none);

        if (!this.none.length) {
          this.none = this._wrapperFor('none').appendTo(this.wrapper);
        }
      },

      _setTargetWrapper: function() {
        this.target = this.wrapper.find(this.opt.wrappers.target);

        if (!this.target.length) {
          this.target = this._wrapperFor('target').appendTo(this.wrapper);
        }
      },

      _setWrapper: function() {
        this.wrapper = this.field.closest(this.opt.wrappers.wrapper);

        if (!this.wrapper.length) {
          var wrapper = this._wrapperFor('wrapper');

          this.wrapper = this.field.wrap(wrapper).parent();
        }
      },

      _stop: function(evt) {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        evt.stopPropagation();
      },

      _wrapperFor: function(name) {
        return $('<div />', { 'class': this.opt.wrappers[name].replace('.', '') });
      },

      abort: function() {
        for (var i = 0; i < this.xhrs.length; i++) {
          this.xhrs[i].abort();
        }

        this.xhrs = [];

        return this;
      },

      hide: function() {
        this._clearDelay();
        this.target.hide();
        this.none.hide();

        this.visible = false;

        return this;
      },

      loader: function(action) {
        var clazz = this.opt.wrappers.loading.replace('.', '');
        var fn    = action === 'start' ? 'addClass' : 'removeClass';

        this.field[fn](clazz);

        return this;
      },

      readonly: function(boo) {
        this.el.prop('readonly', boo);

        return this;
      },

      search: function(value) {
        this.currentValue = $.trim(value || this.element.value);

        this._search();
      },

      show: function() {
        if (!this.visible && this._able()) {
          this.target.show();

          this.visible = true;
        }

        this.el.trigger('complety:suggested', [this.currentSuggestions, this]);

        return this;
      },

      suggest: function(suggestion) {
        var value = this._getValue(suggestion);

        this.el.val(value).data('value', value);

        this._selected(suggestion);
      },

      suggestion: function() {
        return this.currentSuggestion;
      },

      suggestions: function() {
        return this.currentSuggestions;
      },

      url: function() {
        return (this.el.data('url') || this.opt.url).replace(':q', this.currentValue);
      },

      wrappers: function() {
        return {
          field:   this.field,
          loading: this.loading,
          none:    this.none,
          target:  this.target,
          wrapper: this.wrapper
        };
      }
    };

    return Complety;
  })();
})(jQuery);
