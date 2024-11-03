describe('#_highlight', function () {
  beforeEach(function () {
    fixture.load('default.html');
  });

  context('when the key has one path', function () {
    it('highlights', function () {
      // given

      document.querySelector('[data-field]').value = 'joh';

      var complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      var suggestion = { name: 'John Doe' };

      // when
      var result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: '<b>Joh</b>n Doe' });
    });
  });

  context('when the key has two paths', function () {
    it('highlights', function () {
      // given

      document.querySelector('[data-field]').value = 'joh';

      var complety = new $.complety.Complety('[data-field]', {
        keys: ['user.name'],
      });

      var suggestion = { user: { name: 'John Doe' } };

      // when
      var result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ user: { name: '<b>Joh</b>n Doe' } });
    });
  });

  context('when the key has more than two paths', function () {
    it('highlights', function () {
      // given

      document.querySelector('[data-field]').value = 'joh';

      var complety = new $.complety.Complety('[data-field]', {
        keys: ['admin.user.first.name'],
      });

      var suggestion = { admin: { user: { first: { name: 'John Doe' } } } };

      // when
      var result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({
        admin: { user: { first: { name: '<b>Joh</b>n Doe' } } },
      });
    });
  });

  context('when the key is a valid regex char', function () {
    it('is removed from the match keeping the previous match', function () {
      // given

      document.querySelector('[data-field]').value = '[';

      var complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      var suggestion = { name: 'John Doe' };

      // when
      var result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: '<b></b>John Doe' });
    });
  });
});
