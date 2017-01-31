/* eslint-disable no-underscore-dangle, no-undefined, max-len */
import assert from "power-assert";
import makeKeyframes from "../src/make-keyframes";


describe("makeKeyframes()", () => {
  it("Should not be make keyframes string", () => {
    assert(makeKeyframes("") == null);
    assert(makeKeyframes("hoge", null) == null);
    assert(makeKeyframes("hoge", undefined) == null);
    assert(makeKeyframes("hoge", 0) == null);
    assert(makeKeyframes("hoge", 123) == null);
  });


  it("Should be make keyframes string", () => {
    assert(makeKeyframes("hoge", "keyframes", {
      from: {
        borderRadius: "50%",
        color: "#000"
      },
      to: {
        "border-radius": 0,
        color: "#fff"
      }
    }) === "@keyframes hoge{from{border-radius: 50%;color: #000;}to{border-radius: 0;color: #fff;}}");

    assert(makeKeyframes("fuga", "keyframes", {
      "0%": { backgroundColor: "#f00" },
      "50%": { backgroundColor: "#0f0" },
      "100%": { backgroundColor: "#00f" }
    }) === "@keyframes fuga{0%{background-color: #f00;}50%{background-color: #0f0;}100%{background-color: #00f;}}");

    assert(makeKeyframes("hoge", "keyframes", [
      { color: "#fff" },
      { color: "#0ff" },
      { color: "#0f0" },
      { color: "#ff0" },
      { color: "#fff" }
    ]) === "@keyframes hoge{0%{color: #fff;}25%{color: #0ff;}50%{color: #0f0;}75%{color: #ff0;}100%{color: #fff;}}");
  });


  it("Shoud be make pretty keyframes string", () => {
    assert(makeKeyframes("fuga", "keyframes", {
      from: {
        top: 0,
        left: 0
      },
      to: {
        top: "50%",
        left: "50%"
      }
    }, true) === [
      "@keyframes fuga {",
      "  from {",
      "    top: 0;",
      "    left: 0;",
      "  }",
      "  ",
      "  to {",
      "    top: 50%;",
      "    left: 50%;",
      "  }",
      "}"
    ].join("\n"));
  });
});
