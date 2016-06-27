import isPlainObject from "is-plain-object";

export default function each(obj, iterate) {
  if (!isPlainObject(obj)) return obj;

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    if (iterate.call(obj, obj[key], key) === false) break;
  }
}
