import { keys, isArrayLike, indent } from "./utils";
import makeStyle from "./make-style";


const makeKeyframes = (name, prefixedKeyframes, props, pretty = false) => {
  if (!name || (name && name.trim() === "") || !isArrayLike(props)) {
    return null;
  }

  const eol = "\n";
  const styles = keys(props).map(selector => {
    const values = props[selector];
    let selectorString = selector;

    if (typeof selector === "number" || /^\d+$/.test(selector)) {
      const maxIndex = props.length - 1;

      if (selector === 0) {
        selectorString = "0%";
      } else if (selector === maxIndex) {
        selectorString = "100%";
      } else {
        selectorString = `${parseInt(selector, 10) / maxIndex * 100}%`;
      }
    }

    return makeStyle(selectorString, values, pretty);
  });

  return pretty
    ? [
      `@${prefixedKeyframes} ${name} {`,
      indent(styles.join(eol + eol), 2),
      "}"
    ].join(eol)
    : `@${prefixedKeyframes} ${name}{${styles.join("")}}`;
};


export default makeKeyframes;
