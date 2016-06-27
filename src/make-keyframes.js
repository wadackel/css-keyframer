import isPlainObject from "is-plain-object";
import cssVendor from "css-vendor/dist/css-vendor";
import { each, indent } from "./utils";
import makeStyle from "./make-style";

function getKeyframesPrefix() {
  const animation = cssVendor.supportedProperty("animation");

  return animation === "animation" ? "" : animation.replace("animation");
}

export default function makeKeyframes(name, props) {
  if (!name || !isPlainObject(props)) return null;

  const prefix = getKeyframesPrefix();
  const styles = [];

  each(props, (values, selector) => {
    const styleString = makeStyle(selector, values);
    styles.push(styleString);
  });

  return [
    `@${prefix}keyframes ${name} {`,
    indent(styles.join("\n\n"), 2),
    `}`
  ].join("\n");
}
