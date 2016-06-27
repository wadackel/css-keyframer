import isPlainObject from "is-plain-object";
import paramCase from "param-case";
import cssVendor from "css-vendor/dist/css-vendor";
import { each, indent } from "./utils";

export default function makeStyle(selector, props, pretty = false) {
  if (!selector || (selector && selector.trim() === "") || !isPlainObject(props)) {
    return null;
  }

  const styles = [];

  each(props, (value, key) => {
    const prop = cssVendor.supportedProperty(paramCase(key));
    if (prop === false) return false;
    styles.push(`${prop}: ${value};`);
  });

  if (pretty) {
    return `${selector} {\n${indent(styles.join("\n"), 2)}\n}`;
  }

  return `${selector}{${styles.join("")}}`;
}
