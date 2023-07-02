<template>
  <div class="fixed top-0 right-0 left-0 z-[9999] p-4 overflow-x-hidden overflow-y-auto h-full flex justify-center items-center backdrop-blur-md">
    <div class="bg-white max-w-md mx-auto drop-shadow-md rounded-lg p-3">
      <icon-cross class="text-gray-400 hover:text-gray-900 hover:bg-gray-300 cursor-pointer ml-auto mr-2 my-2 rounded-lg text-sm" />
      <div class="p-2">
        <p class="mb-5 text-lg font-normal text-gray-700 text-left">Are you sure you want to delete this product?</p>
        <div class="flex justify-end">
          <button
            class="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          >
            Yes, I'm sure
          </button>
          <button
            class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
