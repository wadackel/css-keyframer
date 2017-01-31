## 1.0.1 (2017-02-01)

* Fix a bug that `keyframer.animationProp.(js | css)` becomes undefined.



## 1.0.0 (2017-01-31)

### New features

* Support Server-Side Redering.
    - Added `userAgent` option to constructor options.
* Added the following utility API.
    - `keyframer.getKeyframesString()`
    - `keyframer.getKeyframesStylesheet()`

### Breaking changes

* `CSSKeyframer.animationProp` has been abolished. Please use `keyframer.animationProp` instead.

### Minor changes

* Changed to output invalid CSS properties as well.
* Changed the default data attribute name from `data - keyframe` to` data - keyframes`.
* Switch from [css-vendor](https://github.com/cssinjs/css-vendor) to [inline-style-prefixer](https://github.com/rofrischmann/inline-style-prefixer).



## 0.0.1 (2016-07-01)

* First release.

