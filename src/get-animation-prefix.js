import pascalCase from "pascal-case";
import cssVendor from "css-vendor/dist/css-vendor";

export default function getAnimationPrefix() {
  const animation = cssVendor.supportedProperty("animation");
  const prefix = animation.replace("animation", "");

  return {
    css: prefix,
    js: pascalCase(prefix)
  };
}
