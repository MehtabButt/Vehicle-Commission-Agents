<template>
  <Navbar class="z-[60]"></Navbar>
  <div class="flex h-[100vh] overflow-hidden">
    <div class="w-1/3 flex justify-center items-center z-50 bg-gray-50">
      <ul class="stepper" data-mdb-stepper="stepper" data-mdb-stepper-type="vertical">
        <li>
          <div class="flex items-center space-x-1">
            <span>
              <icon-step-done class="w-7 h-7 inline mx-[14px] text-gray-700" v-if="currentIndex > 0" />
              <icon-step-pending :class="[currentIndex == 0 ? 'text-gray-700' : 'text-gray-400', 'w-14 h-14 inline ']" v-else />
            </span>
            <div class="flex flex-col justify-end mt-2">
              <span class="mb-[-4px] font-medium">Buyer Details</span>
              <span class="text-gray-700">Add buyer details here</span>
            </div>
          </div>
          <div :class="[currentIndex > 0 ? 'border-gray-700' : 'border-gray-400', 'h-14 border-l-2  ml-[27px] mt-[-14px]']"></div>
        </li>
        <li class="mt-[-14px]">
          <div class="flex items-center space-x-1">
            <span>
              <icon-step-done class="w-7 h-7 inline mx-[14px] text-gray-700" v-if="currentIndex > 1" />
              <icon-step-pending :class="[currentIndex == 1 ? 'text-gray-700' : 'text-gray-400', 'w-14 h-14 inline ']" v-else />
            </span>
            <div class="flex flex-col justify-end mt-2">
              <span class="mb-[-4px] font-medium">Vehicle Details</span>
              <span class="text-gray-700">Add vehicle details here</span>
            </div>
          </div>
          <div :class="[currentIndex > 1 ? 'border-gray-700' : 'border-gray-400', 'h-14 border-l-2  ml-[27px] mt-[-14px]']"></div>
        </li>
        <li class="mt-[-14px]">
          <div class="flex items-center space-x-1">
            <span>
              <icon-step-done class="w-7 h-7 inline mx-[14px] text-gray-700" v-if="currentIndex > 2" />
              <icon-step-pending :class="[currentIndex == 2 ? 'text-gray-700' : 'text-gray-400', 'w-14 h-14 inline ']" v-else />
            </span>
            <div class="flex flex-col justify-end mt-2">
              <span class="mb-[-4px] font-medium">Seller Details</span>
              <span class="text-gray-700">Add seller details here</span>
            </div>
          </div>
          <div :class="[currentIndex > 2 ? 'border-gray-700' : 'border-gray-400', 'h-14 border-l-2  ml-[27px] mt-[-14px]']"></div>
        </li>
        <li class="mt-[-14px]">
          <div class="flex items-center space-x-1">
            <span>
              <icon-step-done class="w-7 h-7 inline mx-[14px] text-gray-700" v-if="currentIndex > 3" />
              <icon-step-pending :class="[currentIndex == 3 ? 'text-gray-700' : 'text-gray-400', 'w-14 h-14 inline ']" v-else />
            </span>
            <div class="flex flex-col justify-end mt-2">
              <span class="mb-[-4px] font-medium">Witness Details</span>
              <span class="text-gray-700">Add witness details here</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-2/3 mt-10">
      <div class="h-4/6 mt-16 flex flex-col justify-end relative">
        <div class="flex justify-center w-4/5 text-4xl font-bold leading-none tracking-tight text-gray-900">Deal Making...</div>
        <div class="relative h-[27rem] max-w-screen-lg">
          <Member class="absolute top-10 shadow-lg animate__animated z-40" data-index="0" role="buyer" :errors="errors"></Member>
          <Vehicle class="absolute shadow-lg top-10 animate__animated hidden z-40" data-index="1" :errors="errors"></Vehicle>
          <Member class="absolute shadow-lg top-10 animate__animated hidden z-40" data-index="2" role="seller" :errors="errors"></Member>
          <Member class="absolute shadow-lg top-10 animate__animated hidden z-40" data-index="3" role="witness" :errors="errors"></Member>
        </div>
        <div class="flex justify-end mr-48 mt-14 pr-4">
          <button
            type="button"
            class="text-white rounded-l-md border-r py-2 px-3"
            :class="[currentIndex == 0 ? 'bg-gray-500' : 'bg-gray-700 hover:bg-gray-800']"
            :disabled="currentIndex == 0"
            @click="goPre(1)"
          >
            <div class="flex flex-row align-middle">
              <icon-left-arrow class="w-5 mr-2" />
              <p class="ml-2">Prev</p>
            </div>
          </button>
          <button type="button" class="text-white rounded-r-md py-2 border-l bg-gray-700 hover:bg-gray-800 px-3" @click="goNext">
            <div class="flex flex-row align-middle">
              <span class="mr-2" v-if="currentIndex == 3">Save</span>
              <span v-else>Next{{ skip || currentIndex == 1 || currentIndex == 3 ? '' : ' / Skip' }}</span>
              <icon-right-arrow class="w-5 ml-2" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Member from '@/components/Deal/Member.vue';
import Vehicle from '@/components/Deal/Vehicle.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { isEmpty } from '@/composables/utility.js';
import { notify } from '@kyvg/vue3-notification';

const store = useStore();

//VALIDATION
const deal = computed(() => store.state.deal);
const skip = ref(null);
async function validate() {
  var res = null;
  switch (currentIndex.value) {
    case 0:
      if (!skip.value && isEmpty(deal.value.buyer)) {
        skip.value = 'buyer';
        return true;
      }
      res = await window.Api.validateBuyer(JSON.stringify(deal.value.buyer));
      if (res.status == 200) return true;
      else {
        errorRes.value = res.error;
        return false;
      }
    case 1:
      res = await window.Api.validateVehicle(JSON.stringify(deal.value.vehicle));
      if (res.status == 200) return true;
      else {
        errorRes.value = res.error;
        return false;
      }
    case 2:
      if (!skip.value && isEmpty(deal.value.seller)) {
        skip.value = 'seller';
        return true;
      }
      res = await window.Api.validateSeller(JSON.stringify(deal.value.seller));
      if (res.status == 200) return true;
      else {
        errorRes.value = res.error;
        return false;
      }
    case 3:
      res = await window.Api.validateWitness(JSON.stringify(deal.value.witness));
      if (res.status == 200) {
        store.dispatch('confirm', { message: 'Please confirm if you want to save.', confirmText: 'Save' }).then(async () => {
          const res = await window.Api.createDeal(JSON.stringify({ ...deal.value, userId: store.getters.currentUser }));
          if (res.status == 200) {
            notify({ type: 'success', title: 'Success', text: 'Deal saved successfully.' });
            store.commit('resetDeal');
            goPre(3);
          } else notify({ type: 'error', title: 'Error', text: 'Error saving deal.' });
        });
        return true;
      } else {
        errorRes.value = res.error;
        return false;
      }
  }
}

//ANIMATION HANDLING
function animate(element, animation) {
  element.className.split(' ').forEach(className => {
    if (className.includes('animate') && className != 'animate__animated') {
      element.classList.remove(className);
    }
  });
  element.classList.add(animation);
}

//CONTROLS
const currentIndex = ref(0);
async function goNext() {
  if (await validate()) {
    errorRes.value = [];
    if (currentIndex.value < 3) {
      const currEl = document.querySelector(`[data-index="${currentIndex.value}"`);
      const nextEl = document.querySelector(`[data-index="${currentIndex.value + 1}"`);
      animate(currEl, 'animate__fadeOutRight');
      setTimeout(() => {
        currEl.classList.add('hidden');
        nextEl.classList.remove('hidden');
        animate(nextEl, 'animate__fadeInLeft');
      }, 500);
      currentIndex.value += 1;
    }
  }
}
function goPre(step) {
  errorRes.value = [];
  const currEl = document.querySelector(`[data-index="${currentIndex.value}"`);
  const preEl = document.querySelector(`[data-index="${currentIndex.value - step}"`);
  animate(currEl, 'animate__fadeOutLeft');
  setTimeout(() => {
    preEl.classList.remove('hidden');
    currEl.classList.add('hidden');
    animate(preEl, 'animate__fadeInRightBig');
  }, 500);
  currentIndex.value -= step;
  if (currentIndex.value == 0 && skip.value) skip.value = null;
  if (currentIndex.value == 2 && skip.value == 'seller') skip.value = null;
}

//ERROR HANDLING
const errorRes = ref([]);
const errors = computed(() => {
  let error = [];
  errorRes.value.forEach(e => (Array.isArray(error[e.path]) ? error[e.path].push(e.message) : (error[e.path] = [e.message])));
  return error;
});
</script>
