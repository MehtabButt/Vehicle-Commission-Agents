<template>
  <div class="absolute z-10 inline-block px-3 py-2 text-xs text-black rounded-lg shadow-sm bg-red-200 border-red-400 border" v-if="params.value">
    <div class="font-medium flex ml-2 items-center space-x-1">
      <span>{{ params.value.field }}</span>
      <icon-error :size="'h-3 w-3'" class="text-red-600" />
    </div>
    <ul class="list-disc pl-2">
      <li v-for="msg in params.value.msgs" :key="msg" class="">{{ msg }}</li>
    </ul>
  </div>
</template>

<script setup>
import { watch, onMounted } from 'vue';

const props = defineProps({
  params: Object
});

onMounted(() => {
  console.log(props.params.value);
});
</script>
