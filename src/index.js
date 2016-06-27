import assign from "object-assign";
import makeKeyframes from "./make-keyframes";
import getStyleElement from "./get-style-element";


export default class CssKeyframer {
  static defaults = {
    namePrefix: "",
    styleDataName: "data-keyframe",
    pretty: false
  };

  constructor(options = {}) {
    this.keyframes = {};
    this.options = assign({}, CssKeyframer.defaults, options);
  }

  register(name, keyframe) {
    this.unregister(name);

    const { namePrefix, styleDataName, pretty } = this.options;
    const prefixedName = namePrefix + name;
    const el = getStyleElement(styleDataName, prefixedName);
    const keyframeString = makeKeyframes(prefixedName, keyframe, pretty);

    if (el == null || keyframeString == null) return;

    el.innerHTML = keyframeString;

    this.keyframes[name] = el;
  }

  unregister(name) {
    if (this.contains(name)) {
      const el = this.keyframes[name];
      el.parentNode.removeChild(el);
      delete this.keyframes[name];
    }
  }

  contains(name) {
    return this.keyframes.hasOwnProperty(name);
  }
}
