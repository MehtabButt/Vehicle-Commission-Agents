<template>
  <div class="grid grid-rows-1 grid-flow-col justify-items-stretch items-center">
    <div class="flex space-x-3">
      <icon-delete :size="'h-3 w-3'" class="text-red-900 cursor-pointer hover:text-red-700" @click="deleteRow" :id="deleteBtnId" />
      <icon-edit :size="'h-3 w-3'" class="text-blue-700 cursor-pointer hover:text-blue-500" @click="editRow" :id="editBtnId" />
      <icon-update class="text-amber-700 cursor-pointer hidden hover:text-amber-600" @click="updateRow" :id="updateBtnId" />
    </div>
    <icon-cross
      class="text-black ml-2 cursor-pointer hidden justify-self-end hover:bg-slate-400 rounded-full"
      @click="crossEdit"
      :id="crossBtnId"
      :size="'h-3 w-3'"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { fetchRecord } from '@/renderer/composables/api.js';
import { useStore } from 'vuex';
import { notify } from '@kyvg/vue3-notification';

const store = useStore();
const props = defineProps({
  params: Object
});

const gridApi = computed(() => props.params.api);
const rowIdx = computed(() => props.params.node.rowIndex);
const nodeId = computed(() => props.params.node.id);
const rowData = computed(() => props.params.data);
const editBtnId = computed(() => `editBtn${nodeId.value}`);
const updateBtnId = computed(() => `updateBtn${nodeId.value}`);
const crossBtnId = computed(() => `crossBtn${nodeId.value}`);
const deleteBtnId = computed(() => `deleteBtn${nodeId.value}`);

function getRowData() {
  return props.params.data;
}
function editRow() {
  const data = getRowData();
  if (data) {
    data.editable = true;
    document.getElementById(`${editBtnId.value}`)?.classList.add('hidden');
    document.getElementById(`${updateBtnId.value}`)?.classList.remove('hidden');
    document.getElementById(`${crossBtnId.value}`)?.classList.remove('hidden');
  }
}
async function crossEdit() {
  const record = await fetchRecord(rowData.value.id);
  if (record.status == 200) {
    props.params.context.clearValidationChecks(rowIdx.value);
    gridApi.value.getDisplayedRowAtIndex(rowIdx.value).setData(JSON.parse(record.deal));
    document.getElementById(`${editBtnId.value}`)?.classList.remove('hidden');
    document.getElementById(`${updateBtnId.value}`)?.classList.add('hidden');
    document.getElementById(`${crossBtnId.value}`)?.classList.add('hidden');
  }
}
function deleteRow() {
  store.dispatch('confirm', { message: 'Please confirm if you want to delete record.', confirmText: 'Delete' }).then(async () => {
    const res = await props.params.context.deleteRow(rowData.value);
    if (res) {
      notify({ type: 'success', title: 'Success', text: 'Record deleted successfully.' });
    } else notify({ type: 'error', title: 'Error', text: 'Record not deleted.' });
  });
}
async function updateRow() {
  const res = await props.params.context.updateRow(rowData.value, rowIdx.value);
  if (res) {
    crossEdit();
    notify({ type: 'success', title: 'Success', text: 'Record updated successfully.' });
  } else notify({ type: 'error', title: 'Error', text: 'Record not updated.' });
}
</script>
