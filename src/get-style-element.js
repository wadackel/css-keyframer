const IS_SERVER_SIDE = typeof document === "undefined";


function findStyleElement(dataName, name) {
  const el = document.querySelector(`style[${dataName}="${name}"]`);

  return el;
}

function createStyleElement(dataName, name) {
  const el = document.createElement("style");
  el.type = "text/css";
  el.setAttribute(dataName, name);
  document.head.appendChild(el);

  return el;
}

export default function getStyleElement(dataName, name) {
  if (IS_SERVER_SIDE) return null;

  const el = findStyleElement(dataName, name);

  if (el) {
    return el;
  }

  return createStyleElement(dataName, name);
}
