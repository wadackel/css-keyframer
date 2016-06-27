import isPlainObject from "is-plain-object";

export function each(obj, iterate) {
  if (!isPlainObject(obj)) return obj;

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (iterate.call(obj, obj[key], key) === false) break;
  }
}

// http://hg.mozilla.org/mozilla-central/diff/7c3cb4883157/js/src/builtin/String.js
export function strRepeat(str, n){
  let result = "";

  for( ;; ){
    if( n & 1 ) result += str;
    n >>= 1;
    if( n ) str += str;
    else break;
  }

  return result;
}

export function indent(str, size) {
  const eol = "\n";

  return str.split(eol).map(line =>
    new Array(size + 1).join(" ") + line
  ).join(eol);
}
