<template>
  <svg viewBox="0 0 30.000000 30.000000" :class="size">
    <g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none">
      <path
        d="M47 254 c-4 -4 -7 -18 -7 -31 0 -23 1 -23 111 -23 l110 0 -3 28 -3
          27 -101 3 c-55 1 -103 0 -107 -4z"
      />
      <path
        d="M40 150 c0 -30 0 -30 56 -30 41 0 63 5 81 20 14 11 39 20 54 20 16 0
          29 5 29 10 0 6 -43 10 -110 10 l-110 0 0 -30z"
      />
      <path
        d="M182 117 c-28 -30 -28 -68 1 -95 30 -28 68 -28 95 1 28 30 28 68 -1
          95 -30 28 -68 28 -95 -1z m58 -22 c0 -8 7 -15 15 -15 8 0 15 -4 15 -10 0 -5
          -7 -10 -15 -10 -8 0 -15 -7 -15 -15 0 -8 -4 -15 -10 -15 -5 0 -10 7 -10 15 0
          8 -7 15 -15 15 -8 0 -15 5 -15 10 0 6 7 10 15 10 8 0 15 7 15 15 0 8 5 15 10
          15 6 0 10 -7 10 -15z"
      />
      <path
        d="M42 73 c3 -26 7 -28 51 -31 46 -3 47 -3 47 27 0 30 -1 31 -51 31 -49
          0 -50 -1 -47 -27z"
      />
    </g>
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
