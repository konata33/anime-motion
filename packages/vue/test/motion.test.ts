import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { motion } from "../src/index";
import { pointerEnter } from "./config";

describe("motion", () => {
  it("renders element", () => {
    const wrapper = mount(motion, {
      props: { "data-testid": "box" },
    });
    expect(wrapper.get("[data-testid='box']").element).toBeTruthy();
  });

  it("renders element as " as " prop to HTML", () => {
    const wrapper = mount(motion, {
      props: { "data-testid": "box", tag: "li" },
    });
    expect(wrapper.html()).toEqual('<li data-testid="box"></li>');
  });

  it("renders element as " as " prop to DOM node", () => {
    const wrapper = mount(motion, {
      props: { "data-testid": "box", tag: "li" },
    });
    expect(wrapper.get("[data-testid='box']").element.tagName).toEqual("LI");
  });

  it("applies initial as style to HTML", () => {
    const wrapper = mount(motion, {
      props: { "data-testid": "box", initial: { opacity: 0.5, x: 100 } },
    });

    expect(wrapper.html()).toEqual(
      '<div style="opacity: 0.5; --motion-translateX: 100px; transform: translateX(var(--motion-translateX));" data-testid="box"></div>',
    );
  });

  it("applies initial as style to DOM node", () => {
    const wrapper = mount(motion, {
      props: { "data-testid": "box", initial: { opacity: 0.5, x: 100 } },
    });

    expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
      "opacity: 0.5; --motion-translateX: 100px; transform: translateX(var(--motion-translateX));",
    );
  });

  it("animates on mount", () => {
    const wrapper = mount(motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9 },
      },
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
          "opacity: 0.9;",
        );
      }, 500);
    });
  });

  it("accepts default transition", () => {
    const wrapper = mount(motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9 },
        transition: { duration: 10 },
      },
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
          "opacity: 0.9;",
        );
      }, 500);
    });
  });

  it("animate accepts transition", () => {
    const wrapper = mount(motion, {
      props: {
        "data-testid": "box",
        initial: { opacity: 0.5 },
        animate: { opacity: 0.9, transition: { duration: 10 } },
      },
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        expect(wrapper.get("[data-testid='box']").attributes("style")).toEqual(
          "opacity: 0.9;",
        );
      }, 500);
    });
  });

  it("passes event handlers", async () => {
    const didHover = await new Promise<boolean>((resolve) => {
      const wrapper = mount(motion, {
        props: {
          "data-testid": "box",
          hover: { scale: 2 },
          onHoverstart: () => {
            resolve(true);
          },
        },
      });

      pointerEnter(wrapper.get("[data-testid='box']").element);
    });

    expect(didHover).toBe(true);
  });
});
