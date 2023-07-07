<template>
  <div class="transition duration-150 w-64 ease-in-out shadow-lg bg-gray-800 p-4 rounded">
    <svg
      class="absolute left-0 -ml-2 bottom-0 top-0 h-full"
      width="9px"
      height="16px"
      viewBox="0 0 9 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#2D3748">
          <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
            <g id="Group-2" transform="translate(24.000000, 0.000000)">
              <polygon
                id="Triangle"
                transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                points="4.5 57.5 12.5 66.5 -3.5 66.5"
              ></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <p class="text-sm font-bold text-white pb-1">{{ title }}</p>
    <ul class="list-disc pl-2">
      <li v-for="msg in content" :key="msg" class="text-xs leading-4 text-white pb-1">{{ msg }}</li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  content: String
});
</script>
