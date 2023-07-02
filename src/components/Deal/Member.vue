<template>
  <div class="container h-full">
    <div class="text-2xl font-medium ml-8">{{ role.charAt(0).toUpperCase() + role.slice(1) }} Details</div>
    <div class="p-10">
      <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 relative">
        <div class="md:col-span-5 flex justify-between space-x-6 absolute w-full">
          <div class="w-2/4">
            <label for="first_name">First Name</label>
            <input
              v-model="member.firstName"
              type="text"
              name="first_name"
              id="first_name"
              placeholder="first name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.firstName) && errors.firstName.length > 0" class="text-red-500 text-xs">
              {{ errors.firstName[0] }}
            </div>
          </div>
          <div class="w-2/4">
            <label for="last_name">Last Name</label>
            <input
              v-model="member.lastName"
              type="text"
              name="last_name"
              id="last_name"
              placeholder="last name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.lastName) && errors.lastName.length > 0" class="text-red-500 text-xs">
              {{ errors.lastName[0] }}
            </div>
          </div>
        </div>

        <div class="md:col-span-5 absolute top-[88px] w-full">
          <label for="father_full_name">Father's Full Name</label>
          <input
            v-model="member.fatherName"
            type="text"
            name="father_full_name"
            id="father_full_name"
            placeholder="father's first name and last name"
            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
          <div v-if="Array.isArray(errors.fatherName) && errors.fatherName.length > 0" class="text-red-500 text-xs">
            {{ errors.fatherName[0] }}
          </div>
        </div>

        <div class="md:col-span-5 absolute top-44 w-full">
          <label for="address">Address</label>
          <input
            v-model="member.address"
            type="text"
            name="address"
            id="address"
            placeholder="complete street address"
            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
          <div v-if="Array.isArray(errors.address) && errors.address.length > 0" class="text-red-500 text-xs">
            {{ errors.address[0] }}
          </div>
        </div>

        <div class="md:col-span-5 flex justify-between space-x-6 absolute w-full top-[16.5rem]">
          <div class="w-2/4">
            <label for="contact_no">
              <span>Contact Number </span>
              <span v-show="role.toLowerCase() == 'witness'" class="text-gray-500">(optional)</span>
            </label>
            <input
              v-model="member.contact"
              type="text"
              name="contact_no"
              id="contact_no"
              placeholder="03xx-xxxxxxx"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.contact) && errors.contact.length > 0" class="text-red-500 text-xs mt-1">
              {{ errors.contact[0] }}
            </div>
          </div>
          <div class="w-2/4">
            <label for="cnic">
              <span>CNIC </span>
              <span v-if="role.toLowerCase() == 'witness'" class="text-gray-500">(optional)</span>
            </label>
            <input
              v-model="member.cnic"
              type="text"
              name="cnic"
              id="cnic"
              placeholder="xxxxx-xxxxxxx-x"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.cnic) && errors.cnic.length > 0" class="text-red-500 text-xs mt-1">
              {{ errors.cnic[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const props = defineProps({
  role: {
    type: String,
    required: true
  },
  errors: {
    type: Array,
    default: () => []
  }
});

const member = computed({
  get: () => store.state.deal[props.role],
  set: member => {
    store.commit(`set${props.role.charAt(0).toUpperCase() + props.role.slice(1)}`, member);
  }
});
</script>
