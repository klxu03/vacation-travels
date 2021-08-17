<template>
  <div :style="wrapperStyle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class="marker-svg"
      @click="toggleDialog()"
    >
      <path
        d="M12,11.5C10.62,11.5 9.5,10.38 9.5,9C9.5,7.62 10.62,6.5 12,6.5C13.38,6.5 14.5,7.62 14.5,9C14.5,10.38 13.38,11.5 12,11.5M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9C19,5.13 15.87,2 12,2Z"
      />
    </svg>

    <div
      style="
        position: absolute;
        display: none;
        bottom: 100%;
        margin-bottom: 50px;
        background: lightblue;
      "
      ref="markerDialog"
    >
      <!-- <p>{{ dialogHtml }}</p> -->
      <div v-html="dialogHtml"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    dialogHtml: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const markerDialog = ref(null);

    const toggleDialog = () => {
      if (markerDialog.value.style.display == 'none') {
        markerDialog.value.style.display = 'block';
      } else {
        markerDialog.value.style.display = 'none';
      }
    };

    const wrapperStyle = computed(() => {
      return {
        position: 'fixed',
        left: `${props.x - 22}px`,
        top: `${props.y - 41}px`,
      };
    });

    return {
      markerDialog,
      toggleDialog,
      wrapperStyle,
    };
  },
};
</script>

<style scoped></style>
