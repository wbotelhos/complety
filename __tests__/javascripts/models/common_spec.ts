describe('common', () => {
  'use strict';

  beforeEach(() => {
    loadHtml('default.html');
  });

  it ('is chainable', () => {
    // given
    const self = $('.complety');

    // when
    const ref = self.complety();

    // then
    expect(ref).toBe(self);
  });

  it ('has the right default options', () => {
    // given
    const options = $.complety;

    // when

    // then
    expect(options.cache).toEqual(true);
    expect(options.cacheData).toEqual({});
    expect(options.delay).toEqual(300);
    expect(options.getValue).toEqual(undefined);
    expect(options.keys).toEqual(undefined);
    expect(options.minChars).toEqual(1);
    expect(options.suggestion).toEqual(undefined);
    expect(options.templates).toEqual({ none: undefined, search: undefined });
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

  it ('receives the bind indicator', () => {
    // given
    const self = $('.complety');

    // when
    self.complety();

    // then
    expect(self.data('complety')).toBeTruthy();
  });
});
