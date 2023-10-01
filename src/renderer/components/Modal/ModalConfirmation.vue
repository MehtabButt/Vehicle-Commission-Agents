<template>
  <div
    v-if="options.show"
    class="fixed top-0 right-0 left-0 z-[9999] p-4 overflow-x-hidden overflow-y-auto h-full flex justify-center items-center backdrop-blur-md"
  >
    <div class="bg-white w-1/4 mx-auto drop-shadow-md rounded-lg p-5">
      <icon-cross
        class="text-gray-400 hover:text-gray-900 hover:bg-gray-300 cursor-pointer ml-auto mr-2 mt-2 rounded-lg text-sm"
        @click="handleReject"
      />
      <div class="">
        <div class="flex items-center space-x-2">
          <icon-alert :size="'h-5 w-5'" />
          <h2 class="text-lg font-medium text-gray-900 text-left">Action Required</h2>
        </div>
        <p class="text-md font-normal text-gray-700 mt-2 text-left">{{ options.message }}</p>
        <div class="flex justify-end mt-5">
          <button
            class="text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            @click="handleConfirm"
          >
            {{ options.confirmText }}
          </button>
          <button
            class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
            @click="handleReject"
          >
            {{ options.rejectText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const options = computed(() => store.state.confirmationDialogOptions);

function handleConfirm() {
  setTimeout(() => {
    store.commit('resolveConfirmation', true);
  }, 100);
}
function handleReject() {
  setTimeout(() => {
    store.commit('resolveConfirmation', false);
  }, 100);
}
</script>
