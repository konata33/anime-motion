<script setup lang="ts">
import { inject, onMounted, onUpdated, provide, ref } from "vue";
import {
  type AnimationOptionsWithOverrides,
  type InViewOptions,
  type VariantDefinition,
  type Variants,
  createMotionState,
  createStyles,
  style,
} from "@motionone/dom";
import { type PresenceState, contextId, presenceId } from "../context";

interface MotionProps {
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

const props = withDefaults(defineProps<MotionProps>(), {
  tag: "div",
});

const root = ref<Element | null>(null);
const parentState = inject(contextId, undefined);
const presenceState = inject(presenceId, undefined) as
  | PresenceState
  | undefined;

const state = createMotionState(
  {
    ...props,
    initial:
      presenceState?.initial === false
        ? presenceState.initial
        : props.initial === true
          ? undefined
          : props.initial,
  },
  parentState,
);

function updateState() {
  state.update({
    ...props,
    initial: props.initial === true ? undefined : props.initial,
  });
}

provide(contextId, state);

onMounted(() => {
  const unmount = state.mount(root.value!);
  updateState();
  return unmount;
});

let manuallyAppliedMotionStyles = false;
onUpdated(() => {
  if (!manuallyAppliedMotionStyles && root.value) {
    manuallyAppliedMotionStyles = true;

    const styles = createStyles(state.getTarget());

    for (const [key, value] of Object.entries(styles)) {
      style.set(root.value, key, value as string);
    }
  }

  updateState();
});

const initialStyles = createStyles(state.getTarget());
</script>

<template>
  <component
    :is="props.tag"
    ref="root"
    :style="state.isMounted() ? style : { ...style, ...initialStyles }"
  >
    <slot />
  </component>
</template>
