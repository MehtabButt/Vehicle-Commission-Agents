<template>
  <div class="relative w-full">
    <nav class="bg-gray-700 px-2 sm:px-4 fixed w-full z-[100] top-0 left-0 border-gray-200">
      <div class="flex items-center justify-between">
        <div class="uppercase text-gray-300 text-4xl font-semibold antialiased font-serif">Commission Agents</div>
        <div class="flex flex-row space-x-3 h-10 items-center">
          <div>
            <button
              type="button"
              class="text-black bg-gray-300 px-2 hover:bg-gray-200 focus:outline-none font-medium rounded-full text-sm text-center"
              @click="$router.push({ name: 'createDeal' })"
            >
              + Deal
            </button>
          </div>
          <div>
            <button
              type="button"
              class="text-black bg-gray-300 px-2 hover:bg-gray-200 focus:outline-none font-medium rounded-full text-sm text-center"
            >
              <div class="flex items-center space-x-1">
                <icon-info class="text-gray-700 h-3 w-3"></icon-info>
                <span>About</span>
              </div>
            </button>
          </div>
          <div class="flex h-full items-center text-gray-300 hover:text-gray-200 cursor-pointer" @mouseover="flip = true" @mouseleave="flip = false">
            <icon-admin class="h-6 w-6"></icon-admin>
            <icon-down class="h-3 w-3" :class="{ 'rotate-180': flip }"></icon-down>
          </div>
        </div>
      </div>
    </nav>
    <div
      id="dropdown"
      class="z-[50] w-36 absolute top-0 right-0 rounded-b-lg mr-3 mt-10 divide-y divide-gray-100 shadow bg-gray-300"
      :class="{ hidden: !flip }"
      @mouseover="flip = true"
      @mouseleave="flip = false"
    >
      <ul class="text-sm" aria-labelledby="dropdownDefault">
        <li>
          <button type="button" class="block w-full text-left py-1 pl-2 font-medium hover:bg-gray-200" @click="$router.push({ name: 'profile' })">
            Profile
          </button>
        </li>
        <li>
          <button type="button" class="block w-full text-left font-medium py-1 pl-2 hover:bg-gray-200" @click="$router.push({ name: 'showRecords' })">
            Records
          </button>
        </li>
        <li>
          <button type="button" class="block w-full float-left text-left py-1 pl-2 font-medium hover:bg-gray-200 rounded-b-lg" @click="signOut">
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  </div>
  <ModalConfirmation />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ModalConfirmation from '@/components/Modal/ModalConfirmation.vue';

const flip = ref(false);
const router = useRouter();

function signOut() {
  window.sessionStorage.removeItem('currentUser');
  router.replace('/sign_in');
}
</script>
