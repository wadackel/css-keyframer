/* eslint-disable no-underscore-dangle, no-undefined */
import assert from "power-assert";
import makeStyle from "../src/make-style";


describe("makeStyle()", () => {
  it("Should not be make style string", () => {
    assert(makeStyle("") == null);
    assert(makeStyle(" ") == null);
    assert(makeStyle(".hoge") == null);
    assert(makeStyle(".hoge", "") == null);
    assert(makeStyle(".hoge", null) == null);
    assert(makeStyle(".hoge", undefined) == null);
    assert(makeStyle(".hoge", 0) == null);
    assert(makeStyle(".hoge", 123) == null);
    assert(makeStyle(".hoge") == null);
  });


  it("Should be make style string", () => {
    assert(makeStyle(".hoge", {
      color: "#000",
      borderRadius: "50%",
      top: 0,
      WebkitUserSelect: "none",
      MozTransition: "200ms ease-out"
    }) === [
      ".hoge{",
      "color: #000;",
      "border-radius: 50%;",
      "top: 0;",
      "-webkit-user-select: none;",
      "-moz-transition: 200ms ease-out;",
      "}"
    ].join(""));

    assert(makeStyle(".hoge", {
      fuga: "hoge-fuga"
    }) === ".hoge{fuga: hoge-fuga;}");
  });


  it("Should be make pretty style string", () => {
    assert(makeStyle(".fuga", {
      width: "50px",
      height: "50px",
      "border-radius": "20%",
      MozTransform: "rotate(0deg)"
    }, true) === [
      ".fuga {",
      "  width: 50px;",
      "  height: 50px;",
      "  border-radius: 20%;",
      "  -moz-transform: rotate(0deg);",
      "}"
    ].join("\n"));
  });
});
