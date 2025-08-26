<template>
  <div>{{ message }}</div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  setup() {
    const message = 'Bienvenidos al proyecto para administrar contadores';
    return {
      message,
    };
  },
});
</script>
