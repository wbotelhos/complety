describe('common', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is chainable', function() {
    // given
    var self = $('.complety');

    // when
    var ref = self.complety();

    // then
    expect(ref).toBe(self);
  });

  it ('has the right default options', function() {
    // given
    var options = $.complety;

    // when

    // then
    expect(options.cache).toEqual({});
    expect(options.delay).toEqual(300);
    expect(options.getValue).toEqual(undefined);
    expect(options.keys).toEqual(undefined);
    expect(options.minChars).toEqual(1);
    expect(options.templates).toEqual({ none: undefined, search: undefined });
    expect(options.suggestion).toEqual(undefined);
    expect(options.url).toEqual(undefined);

    expect(options.wrappers).toEqual({
      field:        '.complety__field',
      item:         '.complety__item',
      itemSelected: '.complety__item--selected',
      list:         '.complety__list',
      loading:      '.complety__field--loading',
      none:         '.complety__none',
      target:       '.complety__target',
      wrapper:      '.complety'
    });
  });

  it ('receives the bind indicator', function() {
    // given
    var self = $('.complety');

    // when
    self.complety();

    // then
    expect(self.data('complety')).toBeTruthy();
  });
});
