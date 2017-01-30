import assign from "object-assign";
import makeKeyframes from "./make-keyframes";
import getStyleElement from "./get-style-element";
import getAnimationProp from "./get-animation-prop";
import { each } from "./utils";


export default class CSSKeyframer {
  static defaults = {
    namePrefix: "",
    styleDataName: "data-keyframe",
    pretty: false
  };

  static animationProp = getAnimationProp();

  constructor(options = {}) {
    this.keyframes = {};
    this.options = assign({}, CSSKeyframer.defaults, options);
  }

  getPrefixedName(name) {
    return this.options.namePrefix + name;
  }

  getKeyframeString(name, keyframe) {
    return makeKeyframes(this.getPrefixedName(name), keyframe, this.options.pretty);
  }

  getKeyframeStylesheet(name, keyframe) {
    const { styleDataName } = this.options;
    const keyframeString = this.getKeyframeString(name, keyframe);

    return keyframeString == null ? "" : `<style type="text/css" ${styleDataName}="${name}">${keyframeString}</style>`;
  }

  register(name, keyframe) {
    this.unregister(name);

    const { styleDataName } = this.options;
    const keyframeString = this.getKeyframeString(name, keyframe);
    if (keyframeString == null) return;

    const el = getStyleElement(styleDataName, this.getPrefixedName(name));
    if (el == null) return;

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

  unregisterAll() {
    each(this.keyframes, (el, name) => this.unregister(name));
  }

  contains(name) {
    return this.keyframes.hasOwnProperty(name);
  }
}
