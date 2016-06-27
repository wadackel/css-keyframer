import assign from "object-assign";
import makeKeyframes from "./make-keyframes";

const IS_SERVER_SIDE = typeof document === "undefined";
const ATTR_NAME = "data-keyframe-name";


function getStyleElement(name) {
  if (IS_SERVER_SIDE) return null;

  const el = document.querySelector(`style[${ATTR_NAME}="${name}"]`);

  if (el) return el;

  const style = document.createElement("style");
  style.setAttribute(ATTR_NAME, name);

  document.getElementsByTagName("head")[0].appendChild(style);

  return style;
}


export default class CssKeyframer {
  constructor(options) {
    this.keyframes = {};
    // TODO: options
  }

  register(name, keyframe) {
    this.unregister(name);

    const el = getStyleElement(name);
    const keyframeString = makeKeyframes(name, keyframe);

    if (el == null) return;

    el.innerHTML = keyframeString;

    this.keyframes[name] = el;
  }

  unregister(name) {
    if (this.contains(name)) {
      const el = this.keyframes[name];
      el.parentNode.removeChild(el)
      delete this.keyframes[name];
    }
  }

  contains(name) {
    return this.keyframes.hasOwnProperty(name);
  }
}
