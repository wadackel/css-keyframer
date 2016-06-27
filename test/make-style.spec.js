/* eslint-disable no-underscore-dangle, no-undefined */
import assert from "power-assert";
import makeStyles from "../src/make-style";


describe("makeStyles()", () => {
  it("Should not be make style string", () => {
    assert(makeStyles() == null);
    assert(makeStyles("") == null);
    assert(makeStyles(null) == null);
    assert(makeStyles(undefined) == null);
    assert(makeStyles(0) == null);
    assert(makeStyles(123) == null);
    assert(makeStyles([]) == null);
  });

  it("Should be make style string", () => {
    assert(makeStyles(".hoge", {
      color: "#000",
      borderRadius: "50%",
      top: 0
    }) === ".hoge{color: #000;border-radius: 50%;top: 0;}");

    assert(makeStyles(".hoge", {
      fuga: "hoge-fuga"
    }) === ".hoge{}");
  });
});
