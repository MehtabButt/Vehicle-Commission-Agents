<template>
  <div>
    <section class="bg-gray-50">
      <div class="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">User Details</h1>
            <form class="space-y-4 md:space-y-6">
              <div class="flex flex-row space-x-4">
                <div class="flex flex-col">
                  <div>
                    <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                    <input
                      type="firstName"
                      name="firstName"
                      id="firstName"
                      :class="[
                        error.firstName ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                        'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                      ]"
                      placeholder="Mehtab"
                      v-model="firstName"
                    />
                  </div>
                  <div v-if="Array.isArray(error.firstName)">
                    <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                      <li v-for="e in error.firstName" :key="e">
                        {{ e }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                  <input
                    type="lastName"
                    name="lastName"
                    id="lastName"
                    :class="[
                      error.lastName ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                      'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                    ]"
                    placeholder="Butt"
                    v-model="lastName"
                  />
                  <div v-if="Array.isArray(error.lastName)">
                    <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                      <li v-for="e in error.lastName" :key="e">
                        {{ e }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  :class="[
                    error.email ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  placeholder="name@company.com"
                  v-model="email"
                />
                <div v-if="Array.isArray(error.email)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.email" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  :class="[
                    error.password ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  v-model="password"
                />
                <div v-if="Array.isArray(error.password)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.password" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  :class="[
                    error.confirmPassword ? 'ring-1 ring-red-500 focus:outline-none' : 'ring-1 ring-gray-300',
                    'bg-gray-50 border text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  ]"
                  v-model="confirmPassword"
                />
                <div v-if="Array.isArray(error.confirmPassword)">
                  <ul class="list-disc text-red-500 text-xs mt-1 ml-4">
                    <li v-for="e in error.confirmPassword" :key="e">
                      {{ e }}
                    </li>
                  </ul>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click="registerUser"
              >
                Next
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = reactive({});
const router = useRouter();

const props = defineProps({
  user: {
    type: Object,
    default: () => {}
  }
});

onMounted(() => {
  if (props.user) {
    firstName.value = props.user?.firstName;
    lastName.value = props.user?.lastName;
    email.value = props.user?.email;
    password.value = props.user?.password;
    confirmPassword.value = props.user?.confirmPassword;
  }
});

async function registerUser(e) {
  e.preventDefault();
  for (const e in error) {
    delete error[e];
  }
  const params = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  };
  const res = await window.Api.registerUser(params);
  if (res.status == 200) {
    router.push({
      name: 'registerBusiness',
      params: { user: JSON.stringify(params) }
    });
  } else {
    res.error.forEach(e => {
      Array.isArray(error[e.path]) ? error[e.path].push(e.message) : (error[e.path] = [e.message]);
    });
  }
}
</script>
