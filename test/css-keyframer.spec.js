/* eslint-disable max-len, no-underscore-dangle, no-undefined */
import assert from "power-assert";
import CSSKeyframer from "../src/";


const $ = selector => document.querySelector(selector);
const factory = (options = {}) => new CSSKeyframer(options);
const ios6 = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25";


describe("CSSKeyframer", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  afterEach(() => {
    document.head.innerHTML = "";
  });


  describe("getKeyframesString()", () => {
    it("Should be get keyframe stylesheet strings", () => {
      const keyframer = factory();

      assert(keyframer.getKeyframesStylesheet("fuga", {
        from: { backgroundColor: "#000" },
        to: { backgroundColor: "#fff" }
      }) === [
        "<style type=\"text/css\" data-keyframes=\"fuga\">",
        "@keyframes fuga{",
        "from{",
        "background-color: #000;",
        "}",
        "to{",
        "background-color: #fff;",
        "}",
        "}",
        "</style>"
      ].join(""));
    });


    it("Should be get keyframes string with vendor prefix", () => {
      const keyframer = factory({ userAgent: ios6 });
      const str = keyframer.getKeyframesStylesheet("fuga", {
        from: {
          boxSizing: "border-box",
          userSelect: "none",
          transform: "rotate(0deg)"
        },
        to: {
          userSelect: "auto",
          transform: "rotate(180deg)"
        }
      });

      assert(/@-webkit-keyframes fuga\{/.test(str));
      assert(/box-sizing: border-box;/.test(str));
      assert(/-webkit-user-select: none;/.test(str));
      assert(/-webkit-transform: rotate\(0deg\);/.test(str));

      assert(/-webkit-user-select: auto;/.test(str));
      assert(/-webkit-transform: rotate\(180deg\);/.test(str));
    });


    it("Should be return empty string when passed invalid arguments", () => {
      const keyframer = factory();
      assert(keyframer.getKeyframesString() === "");
      assert(keyframer.getKeyframesString(null, {}) === "");
      assert(keyframer.getKeyframesString(null, []) === "");
      assert(keyframer.getKeyframesString("foo", null) === "");
      assert(keyframer.getKeyframesString("foo", undefined) === "");
      assert(keyframer.getKeyframesString("foo", 10) === "");
    });
  });


  describe("getKeyframesStylesheet()", () => {
    it("Should be get keyframe stylesheet strings", () => {
      const keyframer = factory();

      assert(keyframer.getKeyframesStylesheet("fuga", {
        from: { backgroundColor: "#000" },
        to: { backgroundColor: "#fff" }
      }) === [
        "<style type=\"text/css\" data-keyframes=\"fuga\">",
        "@keyframes fuga{",
        "from{",
        "background-color: #000;",
        "}",
        "to{",
        "background-color: #fff;",
        "}",
        "}",
        "</style>"
      ].join(""));
    });


    it("Should be return empty string when passed invalid arguments", () => {
      const keyframer = factory();
      assert(keyframer.getKeyframesStylesheet("fuga", null) === "");
    });
  });


  describe("register()", () => {
    it("Should be regsiter keyframes", () => {
      const keyframer = factory();
      keyframer.register("hoge", {
        from: { color: "#fff" },
        to: { color: "#000" }
      });

      const style = $("style[data-keyframes='hoge']");
      assert(style.innerHTML === "@keyframes hoge{from{color: #fff;}to{color: #000;}}");
    });


    it("Should be update already registered keyframes", () => {
      const keyframer = factory();

      keyframer.register("hoge", { from: { color: "#000" } });
      assert($("style[data-keyframes='hoge']").innerHTML === "@keyframes hoge{from{color: #000;}}");

      keyframer.register("hoge", { from: { color: "#fff" } });
      assert($("style[data-keyframes='hoge']").innerHTML === "@keyframes hoge{from{color: #fff;}}");
    });


    it("Should not be regsiter keyframes", () => {
      const keyframer = factory({ pretty: true });
      keyframer.register("", null);

      const style = $("style");
      assert(style == null);
    });


    it("Should be register pretty string keyframes", () => {
      const keyframer = factory({ pretty: true });
      keyframer.register("fuga", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-keyframes='fuga']");
      assert(style.innerHTML === [
        "@keyframes fuga {",
        "  0% {",
        "    background-color: #000;",
        "  }",
        "}"
      ].join("\n"));
    });


    it("Should be register namePrefix keyframes", () => {
      const keyframer = factory({ namePrefix: "sample-" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-keyframes='sample-hoge']");
      assert(style.innerHTML === "@keyframes sample-hoge{0%{background-color: #000;}}");
    });


    it("Should be register custom data-name keyframes", () => {
      const keyframer = factory({ styleDataName: "data-test-name" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      const style = $("style[data-test-name='hoge']");
      assert(style.innerHTML === "@keyframes hoge{0%{background-color: #000;}}");
    });
  });


  describe("unregister()", () => {
    it("Should be unregister keyframes", () => {
      const keyframer = factory();
      keyframer.register("fuga", {
        from: { color: "#fff" },
        to: { color: "#000" }
      });

      assert(!!$("style[data-keyframes='fuga']") === true);
      keyframer.unregister("fuga");
      assert($("style[data-keyframes='fuga']") == null);
    });


    it("Should be unregister namePrefix keyframes", () => {
      const keyframer = factory({ namePrefix: "sample-" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      assert(!!$("style[data-keyframes='sample-hoge']") === true);
      keyframer.unregister("hoge");
      assert($("style[data-keyframes='sample-hoge']") == null);
    });


    it("Should be unregister custom data-name keyframes", () => {
      const keyframer = factory({ styleDataName: "data-test-name" });
      keyframer.register("hoge", { "0%": { backgroundColor: "#000" } });

      assert(!!$("style[data-test-name='hoge']") === true);
      keyframer.unregister("hoge");
      assert($("style[data-test-name='hoge']") == null);
    });
  });


  describe("unregisterAll()", () => {
    it("Should be unregister all keyframes", () => {
      const keyframer = factory();
      keyframer.register("hoge", { to: { color: "#fff" } });
      keyframer.register("fuga", { to: { color: "#ff0" } });
      keyframer.register("piyo", { to: { color: "#f00" } });
      keyframer.register("hogera", { to: { color: "#000" } });

      assert(!!$("style[data-keyframes='hoge']") === true);
      assert(!!$("style[data-keyframes='fuga']") === true);
      assert(!!$("style[data-keyframes='piyo']") === true);
      assert(!!$("style[data-keyframes='hogera']") === true);

      keyframer.unregisterAll();

      assert($("style[data-keyframes='hoge']") == null);
      assert($("style[data-keyframes='fuga']") == null);
      assert($("style[data-keyframes='piyo']") == null);
      assert($("style[data-keyframes='hogera']") == null);
    });
  });
});
