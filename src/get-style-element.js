import exenv from "exenv";


const findStyleElement = (dataName, name) => (
  document.querySelector(`style[${dataName}="${name}"]`)
);

const createStyleElement = (dataName, name) => {
  const el = document.createElement("style");
  el.type = "text/css";
  el.setAttribute(dataName, name);
  document.head.appendChild(el);

  return el;
};

const getStyleElement = (dataName, name) => {
  if (!exenv.canUseDOM) return null;

  const el = findStyleElement(dataName, name);

  return el ? el : createStyleElement(dataName, name);
};


export default getStyleElement;
