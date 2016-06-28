import assert from "power-assert";
import CSSKeyframer from "../src/";

function $(selector) {
  return document.querySelector(selector);
}


describe("CSSKeyframer", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  afterEach(() => {
    document.head.innerHTML = "";
  });

  describe("register()", () => {
    it("Should be regsiter keyframes", () => {
      const keyframer = new CSSKeyframer();
      keyframer.register("hoge", {
        from: { color: "#fff" },
        to: { color: "#000" }
      });

      const style = $("style[data-keyframe='hoge']");
      assert(style.innerHTML === "@-webkit-keyframes hoge{from{color: #fff;}to{color: #000;}}");
    });

    it("Should not be regsiter keyframes", () => {
      const keyframer = new CSSKeyframer({ pretty: true });
      keyframer.register("", null);

      const style = $("style");
      assert(style == null);
    });

    it("Should be register pretty string keyframes", () => {
      const keyframer = new CSSKeyframer({ pretty: true });
      keyframer.register("fuga", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-keyframe='fuga']");
      assert(style.innerHTML === [
        "@-webkit-keyframes fuga {",
        "  0% {",
        "    background-color: #000;",
        "  }",
        "}"
      ].join("\n"));
    });

    it("Should be register namePrefix keyframes", () => {
      const keyframer = new CSSKeyframer({ namePrefix: "sample-" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-keyframe='sample-hoge']");
      assert(style.innerHTML === "@-webkit-keyframes sample-hoge{0%{background-color: #000;}}");
    });

    it("Should be register custom data-name keyframes", () => {
      const keyframer = new CSSKeyframer({ styleDataName: "data-test-name" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-test-name='hoge']");
      assert(style.innerHTML === "@-webkit-keyframes hoge{0%{background-color: #000;}}");
    });
  });

  describe("unregister()", () => {
    it("Should be unregister keyframes", () => {
      const keyframer = new CSSKeyframer();
      keyframer.register("fuga", {
        from: { color: "#fff" },
        to: { color: "#000" }
      });

      assert(!!$("style[data-keyframe='fuga']") === true);
      keyframer.unregister("fuga");
      assert($("style[data-keyframe='fuga']") == null);
    });

    it("Should be unregister namePrefix keyframes", () => {
      const keyframer = new CSSKeyframer({ namePrefix: "sample-" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      assert(!!$("style[data-keyframe='sample-hoge']") === true);
      keyframer.unregister("hoge");
      assert($("style[data-keyframe='sample-hoge']") == null);
    });

    it("Should be unregister custom data-name keyframes", () => {
      const keyframer = new CSSKeyframer({ styleDataName: "data-test-name" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      assert(!!$("style[data-test-name='hoge']") === true);
      keyframer.unregister("hoge");
      assert($("style[data-test-name='hoge']") == null);
    });
  });
});
