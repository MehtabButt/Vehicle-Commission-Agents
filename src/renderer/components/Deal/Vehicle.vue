<template>
  <div class="container px-10">
    <div class="text-2xl font-medium">Vehicle Details</div>
    <div class="my-6">
      <div class="grid gap-y-6 h-full text-sm grid-cols-1 md:grid-cols-5">
        <div class="md:col-span-5 w-full flex justify-between space-x-6">
          <div class="w-2/4 relative">
            <label for="reg_no">Registration No</label>
            <input
              v-model="vehicle.registrationNo"
              type="text"
              name="reg_no"
              id="reg_no"
              placeholder="LEB - 5700"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.registrationNo) && errors.registrationNo.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.registrationNo[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
            <label for="maker">Maker</label>
            <input
              v-model="vehicle.maker"
              type="text"
              name="maker"
              id="maker"
              placeholder="Honda"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.maker) && errors.maker.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.maker[0] }}
            </div>
          </div>
        </div>

        <div class="md:col-span-5 flex justify-between space-x-6 w-full">
          <div class="w-2/4 relative">
            <label for="model">Model</label>
            <input
              v-model="vehicle.model"
              type="text"
              name="model"
              id="model"
              placeholder="2021"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.model) && errors.model.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.model[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
            <label for="power">Horse Power/CC</label>
            <input
              v-model="vehicle.power"
              type="text"
              name="power"
              id="power"
              placeholder="150"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.power) && errors.power.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.power[0] }}
            </div>
          </div>
        </div>

        <div class="md:col-span-5 flex justify-between w-full space-x-6">
          <div class="w-2/4 relative">
            <label for="chassis_no">Chassis No</label>
            <input
              v-model="vehicle.chassisNo"
              type="text"
              name="chassis_no"
              id="chassis_no"
              placeholder="6H644170"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.chassisNo) && errors.chassisNo.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.chassisNo[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
            <label for="engine_no">Engine No</label>
            <input
              v-model="vehicle.engineNo"
              type="text"
              name="engine_no"
              id="engine_no"
              placeholder="D748954"
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.engineNo) && errors.engineNo.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.engineNo[0] }}
            </div>
          </div>
        </div>

        <div class="md:col-span-5 w-full flex justify-between space-x-6">
          <div class="w-2/4 relative">
            <label for="buying_price">Buying Price</label>
            <input
              v-model="vehicle.buyingPrice"
              @keydown="allowDigitOnly"
              type="text"
              name="buying_price"
              id="buying_price"
              placeholder=""
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.buyingPrice) && errors.buyingPrice.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.buyingPrice[0] }}
            </div>
          </div>
          <div class="w-2/4 relative">
            <label for="selling_price">Selling Price</label>
            <input
              v-model="vehicle.sellingPrice"
              @keydown="allowDigitOnly"
              type="text"
              name="selling_price"
              id="selling_price"
              placeholder=""
              class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            <div v-if="Array.isArray(errors.sellingPrice) && errors.sellingPrice.length > 0" class="text-red-500 absolute -bottom-4 text-xs">
              {{ errors.sellingPrice[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { allowDigitOnly } from '@/renderer/composables/utility';

const store = useStore();
const props = defineProps({
  errors: {
    type: Array,
    default: () => []
  }
});

const vehicle = computed({
  get: () => store.state.deal.vehicle,
  set: vehicle => {
    store.commit('setVehicle', vehicle);
  }
});
</script>
