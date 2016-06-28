import pascalCase from "pascal-case";
import cssVendor from "css-vendor/dist/css-vendor";

export default function getAnimationProp() {
  const animation = cssVendor.supportedProperty("animation");
  const prefix = animation.replace("animation", "");

  return {
    css: animation,
    js: prefix === "" ? animation : pascalCase(animation)
  };
}
