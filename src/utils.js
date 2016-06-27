import isPlainObject from "is-plain-object";

export function isArrayLike(obj) {
  return isPlainObject(obj) || Array.isArray(obj);
}

export function each(obj, iterate) {
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (iterate.call(obj, obj[i], i) === false) break;
    }

  } else if (isPlainObject(obj)) {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if (iterate.call(obj, obj[key], key) === false) break;
    }
  }
}

// http://hg.mozilla.org/mozilla-central/diff/7c3cb4883157/js/src/builtin/String.js
export function strRepeat(str, repeatCount) {
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
}

export function indent(str, size) {
  const eol = "\n";

  return str.split(eol).map(line =>
    strRepeat(" ", size) + line
  ).join(eol);
}
