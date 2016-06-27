import paramCase from "param-case";
import cssVendor from "css-vendor/dist/css-vendor";

export default function makeStyles(props) {
  if (!props || typeof props !== "object" || Array.isArray(props)) {
    return null;
  }

  const styles = {};

  for (let key in props) {
    const prop = cssVendor.supportedProperty(paramCase(key));
    const value = props[prop];
    styles[prop] = value;
  }

  return styles;
}
