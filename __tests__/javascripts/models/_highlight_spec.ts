describe('#_highlight', () => {
  beforeEach(() => {
    loadHtml('default.html');
  });

  context('when the key has one path', () => {
    it('highlights', () => {
      // given

      document.querySelector('[data-field]').value = 'joh';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      const suggestion = { name: 'John Doe' };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: '<b>Joh</b>n Doe' });
    });
  });

  context('when the key has two paths', () => {
    it('highlights', () => {
      // given

      document.querySelector('[data-field]').value = 'joh';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['user.name'],
      });

      const suggestion = { user: { name: 'John Doe' } };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ user: { name: '<b>Joh</b>n Doe' } });
    });
  });

  context('when the key has more than two paths', () => {
    it('highlights', () => {
      // given

      document.querySelector('[data-field]').value = 'joh';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['admin.user.first.name'],
      });

      const suggestion = { admin: { user: { first: { name: 'John Doe' } } } };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({
        admin: { user: { first: { name: '<b>Joh</b>n Doe' } } },
      });
    });
  });

  context('when the key has valid regex chars', () => {
    it('removes some chars that does not make sense for search', () => {
      // given

      document.querySelector('[data-field]').value = '?.()[]*^+$';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      const suggestion = { name: 'John Doe' };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: 'John Doe' });
    });

    it('matches .', () => {
      // given

      document.querySelector('[data-field]').value = 'john.d';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      const suggestion = { name: 'John.Doe' };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: '<b>John.D</b>oe' });
    });

    it('matches $', () => {
      // given

      document.querySelector('[data-field]').value = 'john$d';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['name'],
      });

      const suggestion = { name: 'John$Doe' };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ name: '<b>John$D</b>oe' });
    });

    it('matches @', () => {
      // given

      document.querySelector('[data-field]').value = 'johndoe@gmail';

      const complety = new $.complety.Complety('[data-field]', {
        keys: ['email'],
      });

      const suggestion = { email: 'johndoe@gmail.com' };

      // when
      const result = complety._highlight(suggestion);

      // then
      expect(result).toEqual({ email: '<b>johndoe@gmail</b>.com' });
    });
  });
});
