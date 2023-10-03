<template>
  <div class="container px-10">
    <div class="text-2xl font-medium">{{ role.charAt(0).toUpperCase() + role.slice(1) }} Details</div>
    <div class="my-6">
      <div class="grid h-full gap-y-6 text-sm grid-cols-1 md:grid-cols-5">
        <div class="md:col-span-5 flex justify-between space-x-6 w-full">
          <div class="w-2/4 relative">
            <label for="first_name">First Name</label>
            <input
              v-model="member.firstName"
              type="text"
              name="first_name"
              id="first_name"
              placeholder="first name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.firstName) && errors.firstName.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.firstName[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
            <label for="last_name">Last Name</label>
            <input
              v-model="member.lastName"
              type="text"
              name="last_name"
              id="last_name"
              placeholder="last name"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.lastName) && errors.lastName.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.lastName[0] }}
            </div>
          </div>
        </div>

        <div class="md:col-span-5 w-full relative">
          <label for="father_full_name">Father's Full Name</label>
          <input
            v-model="member.fatherName"
            type="text"
            name="father_full_name"
            id="father_full_name"
            placeholder="father's first name and last name"
            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
          <div v-if="Array.isArray(errors.fatherName) && errors.fatherName.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
            {{ errors.fatherName[0] }}
          </div>
        </div>

        <div class="md:col-span-5 w-full relative">
          <label for="address">Address</label>
          <input
            v-model="member.address"
            type="text"
            name="address"
            id="address"
            placeholder="complete street address"
            class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          />
          <div v-if="Array.isArray(errors.address) && errors.address.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
            {{ errors.address[0] }}
          </div>
        </div>

        <div class="md:col-span-5 flex justify-between space-x-6 w-full">
          <div class="w-2/4 relative">
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
            <div v-if="Array.isArray(errors.contact) && errors.contact.length > 0" class="text-red-500 absolute -bottom-4 text-xs mt-1">
              {{ errors.contact[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
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
            <div v-if="Array.isArray(errors.cnic) && errors.cnic.length > 0" class="text-red-500 absolute -bottom-4 text-xs mt-1">
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
