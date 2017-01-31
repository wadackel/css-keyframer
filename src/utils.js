import isPlainObject from "is-plain-object";


export const keys = obj => Object.keys(obj);

export const isArray = obj => obj && Array.isArray(obj);

export const isArrayLike = obj => (
  isPlainObject(obj) || isArray(obj)
);

// http://hg.mozilla.org/mozilla-central/diff/7c3cb4883157/js/src/builtin/String.js
export const strRepeat = (str, repeatCount) => {
  let s = str;
  let n = repeatCount;
  let result = "";

  for (;;) {
    if (n & 1) result += s;
    n >>= 1;
    if (n) s += s;
    else break;
  }

  return result;
};

export const indent = (str, size) => {
  const eol = "\n";

  return str.split(eol).map(line =>
    strRepeat(" ", size) + line
  ).join(eol);
};
