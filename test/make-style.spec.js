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
      top: 0
    }) === ".hoge{color: #000;border-radius: 50%;top: 0;}");

    assert(makeStyle(".hoge", {
      fuga: "hoge-fuga"
    }) === ".hoge{}");
  });

  it("Should be make pretty style string", () => {
    assert(makeStyle(".fuga", {
      width: "50px",
      height: "50px",
      "border-radius": "20%"
    }, true) === [
      ".fuga {",
      "  width: 50px;",
      "  height: 50px;",
      "  border-radius: 20%;",
      "}"
    ].join("\n"));
  });
});
