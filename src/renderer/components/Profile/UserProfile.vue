<template>
  <Navbar class="z-[60]"></Navbar>
  <div class="flex h-[100vh] overflow-y-hidden bg-gray-100 justify-center pt-14 pb-10">
    <div class="mt-5 relative bg-white rounded-lg shadow w-1/2">
      <div class="flex">
        <div class="flex text-gray-700 py-5 pl-5 overflow-hidden space-x-1 items-center">
          <icon-personal :size="'h-5 w-5'" />
          <h1 class="inline text-2xl font-semibold leading-none">Personal Info</h1>
        </div>
      </div>
      <div class="px-5 pb-5 space-y-5">
        <div>
          <label>Name</label>
          <div class="flex space-x-2">
            <div class="relative w-full flex items-center">
              <icon-info-outlined
                v-if="errors.firstName"
                :size="'h-5 w-5'"
                class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
              />
              <BaseTooltip title="First Name" :content="errors.firstName" class="absolute z-10 left-[28rem] tooltip" />
              <input
                placeholder="First Name"
                v-model="user.firstName"
                class="text-gray-700 placeholder-gray-600 w-full pl-4 pr-10 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
              />
            </div>
            <div class="relative w-full flex items-center">
              <icon-info-outlined
                v-if="errors.lastName"
                :size="'h-5 w-5'"
                class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
              />
              <BaseTooltip title="Last Name" :content="errors.lastName" class="absolute z-10 left-[28rem] tooltip" />
              <input
                placeholder="Last Name"
                v-model="user.lastName"
                class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
              />
            </div>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div class="relative w-full flex items-center">
            <icon-info-outlined v-if="errors.email" :size="'h-5 w-5'" class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info" />
            <BaseTooltip title="Email" :content="errors.email" class="absolute z-10 right-[-17rem] tooltip" />
            <input
              placeholder="Email"
              v-model="user.email"
              class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
            />
          </div>
        </div>
        <div>
          <label>New Password</label>
          <div class="space-y-2">
            <div class="relative w-full flex items-center">
              <icon-info-outlined
                v-if="errors.password"
                :size="'h-5 w-5'"
                class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
              />
              <BaseTooltip title="Password" :content="errors.password" class="absolute z-10 right-[-17rem] tooltip" />
              <input
                type="password"
                placeholder="Password"
                v-model="user.password"
                class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
              />
            </div>
            <div class="relative w-full flex items-center">
              <icon-info-outlined
                v-if="errors.confirmPassword"
                :size="'h-5 w-5'"
                class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
              />
              <BaseTooltip title="Confirm Password" :content="errors.confirmPassword" class="absolute z-10 right-[-17rem] tooltip" />
              <input
                type="password"
                placeholder="Confirm Password"
                v-model="user.confirmPassword"
                class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
              />
            </div>
          </div>
        </div>
        <div>
          <label>Current Password</label>
          <div class="relative w-full flex items-center">
            <icon-info-outlined
              v-if="errors.currentPassword"
              :size="'h-5 w-5'"
              class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
            />
            <BaseTooltip title="Current Password" :content="errors.currentPassword" class="absolute z-10 right-[-17rem] tooltip" />
            <input
              type="password"
              placeholder="Password"
              v-model="user.currentPassword"
              class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
            />
          </div>
        </div>
      </div>
      <div class="flex">
        <div class="flex text-gray-700 py-5 pl-5 overflow-hidden space-x-1 items-center">
          <icon-business :size="'h-5 w-5'" />
          <h1 class="inline text-2xl font-semibold leading-none">Business Info</h1>
        </div>
      </div>
      <div class="px-5 pb-5 space-y-5">
        <div>
          <label>Business Name</label>
          <div class="relative w-full flex items-center">
            <icon-info-outlined
              v-if="errors.companyName"
              :size="'h-5 w-5'"
              class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
            />
            <BaseTooltip title="Company Name" :content="errors.companyName" class="absolute z-10 right-[-17rem] tooltip" />
            <input
              placeholder="Business Name"
              v-model="business.companyName"
              class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
            />
          </div>
        </div>
        <div>
          <label>Business Address</label>
          <div class="relative w-full flex items-center">
            <icon-info-outlined
              v-if="errors.address"
              :size="'h-5 w-5'"
              class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
            />
            <BaseTooltip title="Business Address" :content="errors.address" class="absolute z-10 right-[-17rem] tooltip" />
            <input
              placeholder="Business Address"
              v-model="business.address"
              class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
            />
          </div>
        </div>
        <div>
          <label>Contact Number</label>
          <div class="relative w-full flex items-center">
            <icon-info-outlined
              v-if="errors.contact"
              :size="'h-5 w-5'"
              class="absolute z-10 right-0 text-red-400 mr-2 hover:text-red-500 icon-info"
            />
            <BaseTooltip title="Contact" :content="errors.contact" class="absolute z-10 right-[-17rem] tooltip" />
            <input
              placeholder="Contact Number(+923xxxxxxxxx)"
              v-model="business.contact"
              class="text-gray-700 placeholder-gray-600 w-full px-4 py-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:bg-white focus:outline-none focus:ring-1 ring-gray-400"
            />
          </div>
        </div>
      </div>
      <hr class="mt-4" />
      <div class="absolute flex p-3 bottom-0 right-0">
        <div class="flex-initial pl-3">
          <button type="button" class="custom-btn btn-1" @click="handleSave">
            <div class="flex items-center justify-center space-x-2">
              <icon-save :size="'h-5 w-5'" />
              <span>Save</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { groupBy } from 'lodash';
import { notify } from '@kyvg/vue3-notification';
import BaseTooltip from '@/renderer/components/Tooltips/BaseTooltip.vue';

const store = useStore();

// DATA FETCHING
const user = computed({
  get: () => store.state.user,
  set: value => store.commit('setUser', value)
});
const business = computed({
  get: () => store.state.business,
  set: value => store.commit('setBusiness', value)
});
async function fetchInfo() {
  try {
    const response = await window.Api.fetchPersonalData({ userId: store.getters.currentUser });
    if (response.status == 200) {
      const data = JSON.parse(response.data);
      user.value = data.user;
      business.value = data.business;
    }
  } catch {
    notify({ type: 'error', title: 'Error', text: 'Error fetching user details' });
  }
}
onMounted(() => {
  fetchInfo();
});

//SAVING
const errors = ref({});
async function handleSave() {
  try {
    errors.value = {};
    const res = await window.Api.updatePersonalData(JSON.stringify({ user: user.value, business: business.value }));
    if (res.status == 500 && res.error == 'update failed') {
      notify({ type: 'error', title: 'Error', text: 'Error updating user details' });
    } else if (res.status == 500) {
      const error = groupBy(res.error, e => e.path);
      Object.keys(error).forEach(key => {
        error[key] = error[key].map(e => e.message);
      });
      errors.value = error;
    } else {
      notify({ type: 'success', title: 'Success', text: 'User details updated successfully' });
    }
  } catch (e) {
    notify({ type: 'error', title: 'Error', text: 'Something went wrong' });
  }
}
</script>

<style scoped>
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn-1 {
  background: rgb(31, 41, 55);
  background: linear-gradient(0deg, rgba(51, 65, 85, 1) 0%, rgba(31, 41, 55, 1) 100%);
  border: none;
}

.btn-1:before {
  height: 0%;
  width: 2px;
}

.btn-1:hover {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5), -4px -4px 6px 0 rgba(116, 125, 136, 0.5), inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
}

.tooltip {
  display: none;
}
.icon-info:hover + .tooltip {
  display: block;
}
</style>
