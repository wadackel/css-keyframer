import cssVendor from "css-vendor/dist/css-vendor";
import { isArrayLike, each, indent } from "./utils";
import makeStyle from "./make-style";

function getKeyframesPrefix() {
  const animation = cssVendor.supportedProperty("animation");

  return animation.replace("animation", "");
}

export default function makeKeyframes(name, props, pretty = false) {
  if (!name || (name && name.trim() === "") || !isArrayLike(props)) return null;

  const eol = "\n";
  const prefix = getKeyframesPrefix();
  const styles = [];

  each(props, (values, selector) => {
    let selectorString = selector;

    if (typeof selector === "number") {
      const maxIndex = props.length - 1;

      if (selector === 0) {
        selectorString = "0%";
      } else if (selector === maxIndex) {
        selectorString = "100%";
      } else {
        selectorString = `${selector / maxIndex * 100}%`;
      }
    }

    const styleString = makeStyle(selectorString, values, pretty);
    styles.push(styleString);
  });

  if (pretty) {
    return [
      `@${prefix}keyframes ${name} {`,
      indent(styles.join(eol + eol), 2),
      "}"
    ].join(eol);
  }

  return `@${prefix}keyframes ${name}{${styles.join("")}}`;
}
