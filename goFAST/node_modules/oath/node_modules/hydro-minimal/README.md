[![NPM
version](https://badge.fury.io/js/hydro-minimal.png)](http://badge.fury.io/js/hydro-minimal)
[![Build Status](https://secure.travis-ci.org/hydrojs/hydro-minimal.png)](http://travis-ci.org/hydrojs/hydro-minimal)
[![Coverage Status](https://coveralls.io/repos/hydrojs/hydro-minimal/badge.png?branch=master)](https://coveralls.io/r/hydrojs/hydro-minimal?branch=master)

# hydro-minimal

## Synopsis

Minimal interface for [hydro](https://github.com/hydrojs/hydro)

```js
s('My module', function() {
  t('it really works', function() {

  });
});
```

## Usage

```js
hydro.set({
  plugins: ['hydro-minimal'],
});
```

## Installation

#### npm:

```bash
npm install hydro-minimal
```

#### component:

```bash
component install hydrojs/hydro-minimal
```

#### standalone:

```bash
<script src="hydro-minimal"></script>
```

## Tests

```bash
$ npm test
```

Coverage:

```bash
$ npm run coverage
```

## License

The MIT License (see LICENSE)
