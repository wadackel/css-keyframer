import assert from "power-assert";
import CSSKeyframer from "../src/";


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

      const style = document.querySelector("style[data-keyframe='hoge']");
      assert(style.innerHTML === "@-webkit-keyframes hoge{from{color: #fff;}to{color: #000;}}");
    });
  });

  describe("unregister()", () => {
    it("Should be unregister keyframes", () => {
      const keyframer = new CSSKeyframer();
      keyframer.register("fuga", {
        from: { color: "#fff" },
        to: { color: "#000" }
      });

      assert(!!document.querySelector("style[data-keyframe='fuga']") === true);
      keyframer.unregister("fuga");
      assert(document.querySelector("style[data-keyframe='fuga']") == null);
    });
  });
});
