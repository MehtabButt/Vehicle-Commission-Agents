<template>
  <svg viewBox="0 0 64 64" :class="size">
    <circle cx="32" cy="32" r="28" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="4" />
    <line x1="32" x2="32" y1="18" y2="38" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="4" />
    <line x1="32" x2="32" y1="42" y2="46" fill="none" stroke="currentcolor" stroke-miterlimit="10" stroke-width="4" />
  </svg>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'h-4 w-4'
  }
});
</script>
