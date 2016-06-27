import isPlainObject from "is-plain-object";
import paramCase from "param-case";
import cssVendor from "css-vendor/dist/css-vendor";
import each from "./each";

export default function makeStyle(selector, props) {
  if (!selector || !isPlainObject(props)) {
    return null;
  }

  const styles = [];

  each(props, (value, key) => {
    const prop = cssVendor.supportedProperty(paramCase(key));
    styles.push(`  ${prop}: ${value};`);
  });

  return `${selector} {\n${styles.join("\n")}\n}`;
}
