import isPlainObject from "is-plain-object";
import hyphenateStyleName from "hyphenate-style-name";
import { keys, indent } from "./utils";


const makeStyle = (selector, props, pretty = false) => {
  if (!selector || (selector && selector.trim() === "") || !isPlainObject(props)) {
    return null;
  }

  const styles = keys(props).map(key =>
    `${hyphenateStyleName(key)}: ${props[key]};`
  );

  return pretty
    ? `${selector} {\n${indent(styles.join("\n"), 2)}\n}`
    : `${selector}{${styles.join("")}}`;
};


export default makeStyle;
