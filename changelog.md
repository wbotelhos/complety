### Master

- &nbsp;

### v0.4.1

#### Fix

- `cacheData` option must be `{}` as default;
- Fix cache conditional.

### v0.4.0

#### News

- Adds `cacheData` to keep the cache data. The URL is the key and the JSON content is the value. You can preload it.

#### Update

- Option `cache` now enables `true` or disables `false` the cache having `true` as default;

### v0.3.0

#### News

- Adds `params` options to be possible pass params to URL query.

### v0.2.1

#### Updates

- Removes node lock from `package.json`.

### v0.2.0

#### Changes

- `none` and `selected` event now is prefixed with `complety`: `complety:none` and `complety:selected`;
- Ajax callbacks now is `complety:always`, `complety:done` and `complety:fail` events;
- Drops jQuery name of the files name;
- Loading style now is `.complety__field--loading` by default;
- Moves `functions.getValue` to the root options, now is just `getValue`.

#### Updates

- The `this` element was added on `complety:suggested` parameters.

#### News

- Adds `search` function;
- Adds event `complety:suggested`;
- Support to data attributes;
- The field value now is saved on data for a better background manipulation.

### v0.1.1

#### Fixes

- Fix NPM published version.

### v0.1.0

- First release.
