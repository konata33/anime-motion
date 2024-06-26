import type {
  AnimationOptionsWithOverrides,
  InViewOptions,
  VariantDefinition,
  Variants,
} from "@motionone/dom";
import type { PropType } from "vue";

export interface MotionProps {
  tag?: string;
  initial?: VariantDefinition | boolean;
  animate?: VariantDefinition;
  inView?: VariantDefinition;
  hover?: VariantDefinition;
  press?: VariantDefinition;
  exit?: VariantDefinition;
  variants?: Variants;
  inViewOptions?: InViewOptions;
  transition?: AnimationOptionsWithOverrides;
}

export const motionProps = {
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "div",
  },
  initial: {
    type: [Object, Boolean] as PropType<VariantDefinition | boolean>,
    default: false,
  },
  animate: {
    type: Object as PropType<VariantDefinition>,
  },
  inView: {
    type: Object as PropType<VariantDefinition>,
  },
  hover: {
    type: Object as PropType<VariantDefinition>,
  },
  press: {
    type: Object as PropType<VariantDefinition>,
  },
  exit: {
    type: Object as PropType<VariantDefinition>,
  },
  variants: {
    type: Object as PropType<Variants>,
  },
  inViewOptions: {
    type: Object as PropType<InViewOptions>,
  },
  transition: {
    type: Object as PropType<AnimationOptionsWithOverrides>,
  },
};
