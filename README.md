<img src="https://raw.githubusercontent.com/tsuyoshiwada/css-keyframer/images/logo%402x.png" width="260" height="44" alt="css-keyframer.js">
================

[![Build Status](http://img.shields.io/travis/tsuyoshiwada/css-keyframer.svg?style=flat-square)](https://travis-ci.org/tsuyoshiwada/css-keyframer)
[![npm version](https://img.shields.io/npm/v/css-keyframer.svg?style=flat-square)](http://badge.fury.io/js/css-keyframer)
[![David](https://img.shields.io/david/tsuyoshiwada/css-keyframer.svg?style=flat-square)](https://david-dm.org/tsuyoshiwada/css-keyframer/)

Dynamic css animation keyframes Manipulation library.

See demo page: https://tsuyoshiwada.github.io/css-keyframer/



## Description

css-keyframer.js provides a Low-level API that add to the head element dynamically generates a style element.  
Therefore, linking to the DOM element must be handled by the user side.



### WHY?

When you want to apply the same animation to multiple elements, it is inefficient to update the in-line style of all the elements.  
If you reuse one of `@keyframes` it can be realized efficient animation.



## Install

You can install the [css-keyframer.js](https://www.npmjs.com/package/css-keyframer) from [npm](https://www.npmjs.com/).

```bash
$ npm install css-keyframer --save
```

or Download the [css-keyframer.min.js](https://raw.githubusercontent.com/tsuyoshiwada/css-keyframer/master/css-keyframer.min.js)



## Getting started

In the following example, to apply the spin animation to `div.element`.

```html
<div class="element"></div>
```

```javascript
import CSSKeyframer from "css-keyframer";

const keyframer = new CSSKeyframer({ /* options */ });

// CSS property will be added vendor-prefix is automatically!
keyframer.register("spin", [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
]);

document.querySelector(".element").style[keyframer.animationProp.js] = "spin 1500ms linear infinite";
```


### Options

To the constructor of `CSSKeyframer` You can specify the following options.

| Key             | Default            | Description                                                                                                                   |
|:----------------|:-------------------|:------------------------------------------------------------------------------------------------------------------------------|
| `namePrefix`    | `""`               | Grant prefix to `@keyframes`.                                                                                                 |
| `styleDataName` | `"data-keyframes"` | To specify the attributes to be used in the style element.                                                                    |
| `pretty`        | `false`            | Output pretty code `@keyframes`. Primarily used for debugging applications.                                                   |
| `useAgent`      | `null`             | Specify the UserAgent to be used for inline-style-prefixer. When set to `null`, it is judged automatically. **since: v1.0.0** |



## API

### getKeyframesString(name: string, keyframe: Object | Array): string

**since: v1.0.0**

Get CSS string containing the keyframes.

```javascript
keyframer.getKeyframesString("spin", {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
});

// or Array style
keyframer.getKeyframesString("spin", [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
]);

// Result (pretty: true)
// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
```


### getKeyframeStylesheet(name: string, keyframe: Object | Array): string

**since: v1.0.0**

Get a style element containing a keyframe as a string.  
It is an API that you do not normally use. But, this is a useful API for Server-side Rendering.

```javascript
keyframer.getKeyframeStylesheet("spin", {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
});

// or Array style
keyframer.getKeyframeStylesheet("spin", [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
]);

// Result (pretty: true)
// <style type="text/css" data-keyframe="spin">@keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }</style>
```



### register(name: string, keyframe: Object | Array): void

Register the `@keyframes`.  
If `@keyframes` of the same name exists overwrites it.

**Example:**

```javascript
// Object style
keyframer.register("spin", {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
});

// or Array style
keyframer.register("spin", [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
]);

// Result (pretty: true)
// <style type="text/css" data-keyframe="spin">
// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
// </style>
```

### unregister(name: string): void

Unregister the `@keyframes`.

**Example:**

```javascript
keyframer.unregister("spin");
```

### unregisterAll(): void

Unregister all `@keyframes`.

**Example:**

```javascript
keyframer.unregisterAll();
```

### contains(name: string): boolean

Check whether the specified @keyframes exists.

**Example:**

```javascript
keyframer.contains("spin"); // true or false
```

### animationProp: { js: string, css: string }

**since: v1.0.0**

It provides the name of the property required for the animation of the set with a vendor prefix. (CSS and JS)

**Example:**

```javascript
import CSSKeyframer from "css-keyframer";

const keyframer = new CSSKeyframer();
keyframer.register("spin", [
  { transform: "rotate(0deg)" },
  { transform: "rotate(360deg)" }
]);

document.querySelector(".target").style[keyframer.animationProp.js] = "spin 1500ms linear infinite";
```



## License

Released under the [MIT Licence](./LICENSE)



## ChangeLog

See [CHANGELOG.md](./CHANGELOG.md).



## Author

[tsuyoshiwada](https://github.com/tsuyoshiwada)



## Development

Initialization of the project.

```bash
$ cd /your/project/dir
$ git clone https://github.com/tsuyoshiwada/css-keyframer.git
```

Install some dependencies.

```bash
$ npm install
```

Start the development and can you see demo page (access to the `http://localhost:3000/`).

```bash
$ npm start
```

Run lint and testing.

```bash
$ npm test
```

Generates build file.

```bash
$ npm run build
```


## Contribution

Thank you for your interest in css-keyframer.js.  
Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/tsuyoshiwada/css-keyframer/issues).

**Before you open a PR:**

Be careful to follow the code style of the project. Run `npm test` after your changes and ensure you do not introduce any new errors or warnings.
All new features and changes need documentation.

Thanks!

