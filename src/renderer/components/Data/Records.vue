<template>
  <Navbar class="z-[60]"></Navbar>
  <ExportImport class="pt-12 justify-end pb-2 pr-2" :data="rowData" @import:success="fetchData" />
  <DataTable
    :column-defs="columnDefs"
    :default-col-def="{
      sortable: true,
      filter: true,
      resizable: true,
      editable: params => params.data.editable,
      getRowId: params => params.data.id,
      tooltipValueGetter: params =>
        validationChecks[params.node.rowIndex] && validationChecks[params.node.rowIndex][params.colDef.field]
          ? { field: params.colDef.headerName, msgs: validationChecks[params.node.rowIndex][params.colDef.field] }
          : '',
      valueSetter: syncValueSetter,
      valueFormatter: params => {
        if (/^.*\.\b(contact|cnic)$/.test(params.colDef.field) && (params.value == '0300-0000000' || params.value == '00000-0000000-0')) {
          return 'N/A';
        }
      },
      cellClassRules: {
        'bg-red-200': params => (validationChecks[params.node.rowIndex] && validationChecks[params.node.rowIndex][params.colDef.field] ? true : false)
      },
      tooltipComponent: CustomTooltip
    }"
    :context="context"
    :row-data="rowData"
    style="height: calc(100vh - 7rem)"
    @grid-ready="gridApi = $event"
  ></DataTable>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DataTable from '@/renderer/components/Data/DataTable.vue';
import ExportImport from '@/renderer/components/Data/ExportImport.vue';
import CustomTooltip from '@/renderer/components/Tooltips/CustomTooltip.vue';
import { isEmpty } from 'lodash';
import { useStore } from 'vuex';
import { notify } from '@kyvg/vue3-notification';

const store = useStore();

// COLUMN DEFS
const columnDefs = ref([
  {
    headerName: 'Deal',
    children: [
      { headerName: 'Create Datetime', field: 'createdAt', valueFormatter: param => new Date(param.value).toLocaleString(), editable: false },
      { headerName: 'Update Datetime', field: 'updatedAt', valueFormatter: param => new Date(param.value).toLocaleString(), editable: false }
    ]
  },
  {
    headerName: 'Vehicle',
    children: [
      { headerName: 'Registration No', field: 'Vehicle.registrationNo' },
      { headerName: 'Maker', field: 'Vehicle.maker' },
      { headerName: 'Model', field: 'Vehicle.model' },
      { headerName: 'Power', field: 'Vehicle.power' },
      { headerName: 'chassis No', field: 'Vehicle.chassisNo' },
      { headerName: 'Engine No', field: 'Vehicle.engineNo' },
      { headerName: 'Buyed For', field: 'Vehicle.buyingPrice' },
      { headerName: 'Sold At', field: 'Vehicle.sellingPrice' }
    ]
  },
  {
    headerName: 'Buyer',
    children: [
      { headerName: 'Buyer First Name ', field: 'Buyer.firstName' },
      { headerName: 'Buyer Last Name ', field: 'Buyer.lastName' },
      { headerName: "Buyer Father's Name", field: 'Buyer.fatherName' },
      { headerName: 'Buyer Address', field: 'Buyer.address' },
      { headerName: 'Buyer Contact', field: 'Buyer.contact' },
      { headerName: 'Buyer CNIC', field: 'Buyer.cnic' }
    ]
  },
  {
    headerName: 'Seller',
    children: [
      { headerName: 'Seller First Name ', field: 'Seller.firstName' },
      { headerName: 'Seller Last Name ', field: 'Seller.lastName' },
      { headerName: "Seller Father's Name", field: 'Seller.fatherName' },
      { headerName: 'Seller Address', field: 'Seller.address' },
      { headerName: 'Seller Contact', field: 'Seller.contact' },
      { headerName: 'Seller CNIC', field: 'Seller.cnic' }
    ]
  },
  {
    headerName: 'Witness',
    children: [
      { headerName: 'Witness First Name ', field: 'Witness.firstName' },
      { headerName: 'Witness Last Name ', field: 'Witness.lastName' },
      { headerName: "Witness Father's Name", field: 'Witness.fatherName' },
      { headerName: 'Witness Address', field: 'Witness.address' },
      { headerName: 'Witness Contact', field: 'Witness.contact' },
      { headerName: 'Witness CNIC', field: 'Witness.cnic' }
    ]
  }
]);

//RECORD FETCHING
const rowData = ref([]);
async function fetchData() {
  const res = await window.Api.fetchRecords({ userId: store.getters.currentUser });
  if (res.status == 200) {
    rowData.value = JSON.parse(res.deal);
  } else {
    rowData.value = [];
    notify({ type: 'error', title: 'Error', text: 'Error fetching records.' });
  }
}
onMounted(async () => {
  fetchData();
});

// VALIDATION
const validationChecks = ref({});
const syncValueSetter = async params => {
  const [model, attr] = params.colDef.field.split('.');
  let res;
  params.data[model][attr] = params.newValue;
  res = await window.Api[`validate${model}`](JSON.stringify(params.data[model]));
  const modelErrors = res?.error?.filter(e => e.path == attr)?.map(e => e.message) || [];
  if (!modelErrors.length) {
    if (validationChecks.value[params.node.rowIndex] && validationChecks.value[params.node.rowIndex][`${model}.${attr}`])
      delete validationChecks.value[params.node.rowIndex][`${model}.${attr}`];
    params.api.applyTransaction({ update: [params.data] });
    return true;
  } else {
    if (!validationChecks.value[params.node.rowIndex]) validationChecks.value[params.node.rowIndex] = {};
    validationChecks.value[params.node.rowIndex][`${model}.${attr}`] = modelErrors;
    params.api.applyTransaction({ update: [params.data] });
    return false;
  }
};

// GRID API
const gridApi = ref(null);
const context = {
  deleteRow: deleteRow,
  updateRow: updateRow,
  clearValidationChecks: clearValidationChecks
};

// Events
function clearValidationChecks(id) {
  if (validationChecks.value[id]) delete validationChecks.value[id];
}
async function deleteRow(data) {
  if (data == undefined || data == null) return false;
  try {
    const res = await window.Api.deleteRecord({ id: data.id });
    if (res.status == 500) return false;
    await gridApi.value.applyTransactionAsync({ remove: [data] });
    return true;
  } catch (err) {
    return false;
  }
}
async function updateRow(data, id) {
  if (data == undefined || data == null || id == undefined || id == null || (validationChecks.value[id] && !isEmpty(validationChecks.value[id])))
    return false;
  return await store.dispatch('confirm', { message: 'Please confirm if you want to update record.', confirmText: 'Update' }).then(async () => {
    try {
      const res = await window.Api.updateRecord(data);
      if (res.status == 500) return false;
      await gridApi.value.applyTransactionAsync({ update: [JSON.parse(res.deal)] });
      clearValidationChecks(id);
      return true;
    } catch (error) {
      return false;
    }
  });
}
</script>
