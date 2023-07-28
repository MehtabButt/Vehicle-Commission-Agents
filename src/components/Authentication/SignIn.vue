<template>
  <div>
    <section class="bg-gray-50">
      <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign in to your account</h1>
            <div class="space-y-4 md:space-y-6" action="#">
              <div class="flex flex-col">
                <div>
                  <div for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</div>
                  <input
                    name="email"
                    id="email"
                    :class="[
                      error.email ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                      'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                    ]"
                    placeholder="name@company.com"
                    v-model="email"
                  />
                </div>
                <div v-if="Array.isArray(error.email)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.email" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex flex-col">
                <div>
                  <div for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</div>
                  <input
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    :class="[
                      error.password ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                      'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                    ]"
                    v-model="password"
                  />
                </div>
                <div v-if="Array.isArray(error.password)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.password" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="float-right">
                <a href="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
              </div>
              <button
                class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click="authenticate"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500">
                Don’t have an account yet?
                <router-link :to="{ name: 'registerUser' }" class="font-medium text-primary-600 hover:underline">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';

const email = ref('');
const password = ref('');
const router = useRouter();
const errorRes = ref([]);

//ERROR HANDING
const error = computed(() => {
  let errors = [];
  if (errorRes.value.length) {
    errorRes.value.forEach(e => (Array.isArray(errors[e.path]) ? errors[e.path].push(e.message) : (errors[e.path] = [e.message])));
  }
  return errors;
});

//AUTHENTICATION
async function authenticate(e) {
  // e.preventDefault();
  // for (const e in error) {
  //   delete error[e];
  // }
  const res = await window.Api.authenticate({ email: email.value, password: password.value });
  if (res.status == 200) {
    window.sessionStorage.clear();
    window.sessionStorage.setItem('currentUser', res.userId);
    errorRes.value = [];
    router.push({ name: 'createDeal' });
    notify({
      type: 'info',
      title: 'Info',
      text: 'You have successfully logged in'
    });
  } else if (res.status == 500) {
    errorRes.value = res.error;
  }
}
</script>
