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


// // =======================
// const keyframer = new CssKeyframer({
//   pretty: true
// });
//
// keyframer.register("spin", [
//   {
//     transform: "translate(0, 0)",
//     borderRadius: 0
//   },
//   {
//     transform: "translate(1px, 1px)",
//     borderRadius: "50%"
//   },
//   {
//     transform: "translate(2px, 5px)",
//     borderRadius: "50%"
//   },
//   {
//     transform: "translate(0, 0)",
//     "border-radius": 0
//   }
// ]);
//
//
//
// import makeStyle from "./make-style";
// const s = makeStyle(".fuga", {
//   width: "50px",
//   height: "50px",
//   "border-radius": "20%"
// }, true);
// console.log(s);
