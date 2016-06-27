import isPlainObject from "is-plain-object";
import cssVendor from "css-vendor/dist/css-vendor";
import { each, indent } from "./utils";
import makeStyle from "./make-style";

function getKeyframesPrefix() {
  const animation = cssVendor.supportedProperty("animation");

  return animation === "animation" ? "" : animation.replace("animation");
}

export default function makeKeyframes(name, props, pretty = false) {
  if (!name || !isPlainObject(props)) return null;

  const eol = "\n";
  const prefix = getKeyframesPrefix();
  const styles = [];

  each(props, (values, selector) => {
    const styleString = makeStyle(selector, values, pretty);
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
