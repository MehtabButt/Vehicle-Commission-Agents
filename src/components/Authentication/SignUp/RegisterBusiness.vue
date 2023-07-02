<template>
  <div>
    <!-- {{ JSON.parse($route.params.user) }} -->
    <section class="bg-gray-50">
      <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="pl-8 pt-4 text-gray-600 hover:text-gray-700">
            <svg class="w-6 h-6 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" @click="goBack" fill="currentcolor">
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3
                  32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </div>
          <div class="px-8 pb-8 pt-4 space-y-4 md:space-y-6">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Business Details</h1>
            <form class="space-y-4 md:space-y-6">
              <div>
                <label for="businessName" class="block mb-2 text-sm font-medium text-gray-900">Business Name</label>
                <input
                  type="businessName"
                  name="businessName"
                  id="businessName"
                  :class="[
                    error.name ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  placeholder="Bikes Commission Agents"
                  v-model="businessName"
                />
                <div v-if="Array.isArray(error.name)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.name" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="businessAddress" class="block mb-2 text-sm font-medium text-gray-900">Business Address</label>
                <input
                  type="businessAddress"
                  name="businessAddress"
                  id="businessAddress"
                  :class="[
                    error.address ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  placeholder="1st Basement, Khalid Centre, Lahore"
                  v-model="businessAddress"
                />
                <div v-if="Array.isArray(error.address)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.address" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="Contact" class="block mb-2 text-sm font-medium text-gray-900">Contact Number</label>
                <input
                  type="contact"
                  name="contact"
                  id="contact"
                  :class="[
                    error.contact ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  placeholder="+92xxxxxxxxxx"
                  v-model="businessContact"
                />
                <div v-if="Array.isArray(error.contact)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.contact" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="text-sm">
                <p for="terms" class="font-light text-gray-500">
                  By creating an account I accept the
                  <a class="font-medium text-primary-600 hover:underline" href="#">Terms and Conditions</a>
                </p>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click="registerBusiness"
              >
                Create Account
              </button>
              <p class="text-sm font-light text-gray-500">
                Already have an account?
                <router-link to="/sign_in" class="font-medium text-primary-600 hover:underline">Login here</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const businessName = ref('');
const businessAddress = ref('');
const businessContact = ref('');
const error = reactive({});
const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
});

async function registerBusiness(e) {
  e.preventDefault();
  const res = await window.Api.registerBusiness({
    business: {
      name: businessName.value,
      address: businessAddress.value,
      contact: businessContact.value
    },
    user: props.user
  });
  if (res.status == 200) {
    router.push({ path: '/sign_in' });
  } else {
    for (const p in error) {
      delete error[p];
    }
    res.error.forEach(e => {
      Array.isArray(error[e.path]) ? error[e.path].push(e.message) : (error[e.path] = [e.message]);
    });
  }
}

function goBack() {
  router.push({
    name: 'registerUser',
    params: { user: JSON.stringify(props.user) }
  });
}
</script>
