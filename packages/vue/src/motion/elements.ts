import { defineComponent, h } from "vue";
import { type MotionProps, motionProps } from "../types/types";
import Motion from "../components/Motion.vue";
const createMotionElement = (tag: string) => {
  const Component = defineComponent({
    props: motionProps,
    setup(props, { slots }) {
      const typedProps = props as MotionProps;

      return () => h(Motion, { ...typedProps, tag }, slots.default?.());
    },
  });

  return Component;
};
export const div = createMotionElement("div");
export const span = createMotionElement("span");

export const section = createMotionElement("section");
