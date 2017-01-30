import pascalCase from "pascal-case";
import cssVendor from "css-vendor";

export default function getAnimationProp() {
  const prop = "animation";
  const animation = cssVendor.supportedProperty(prop) || prop;
  const prefix = animation.replace("animation", "");

  return {
    css: animation,
    js: prefix === "" ? animation : pascalCase(animation)
  };
}
