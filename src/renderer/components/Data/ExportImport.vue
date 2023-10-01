<template>
  <div class="flex space-x-2 items-center">
    <form enctype="multipart/form-data">
      <label
        class="border-blue-700 text-sm hover:bg-blue-800 focus:outline-none font-medium text-center text-blue-700 space-x-2 flex items-center px-5 py-2.5 hover:text-white rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue"
      >
        <icon-import />
        <span>Import Records</span>
        <input type="file" accept=".xlsb" class="hidden" @change="importData($event)" required />
      </label>
    </form>
    <button
      type="button"
      class="px-5 py-2.5 flex items-center space-x-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-lg text-center"
      @click="exportData"
    >
      <icon-export />
      <span>Export Records</span>
    </button>
  </div>
</template>

<script setup>
import { read, writeFile, utils } from 'xlsx';
import { titleizeCamelCase, formatDate, toCamelCase } from '@/renderer/composables/utility.js';
import { notify } from '@kyvg/vue3-notification';
import { useStore } from 'vuex';

const store = useStore();
const emits = defineEmits(['import:success']);
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// EXPORTING
function exportData() {
  const allowedPersonParams = ['firstName', 'lastName', 'fatherName', 'address', 'contact', 'cnic'];
  const allowedVehicleParams = ['buyingPrice', 'sellingPrice', 'registrationNo', 'maker', 'model', 'power', 'chassisNo', 'engineNo'];
  const columnWidth = {};
  const header = [
    'Record Created',
    'Buyer First Name',
    'Buyer Last Name',
    'Buyer Father Name',
    'Buyer Address',
    'Buyer Contact',
    'Buyer Cnic',
    'Seller First Name',
    'Seller Last Name',
    'Seller Father Name',
    'Seller Address',
    'Seller Contact',
    'Seller Cnic',
    'Witness First Name',
    'Witness Last Name',
    'Witness Father Name',
    'Witness Address',
    'Witness Contact',
    'Witness Cnic',
    'Vehicle Registration No',
    'Vehicle Maker',
    'Vehicle Model',
    'Vehicle Power',
    'Vehicle Chassis No',
    'Vehicle Engine No',
    'Vehicle Buying Price',
    'Vehicle Selling Price'
  ];
  header.forEach(h => (columnWidth[h] = h.length));
  if (props.data) {
    const data = props.data.map(d => {
      columnWidth['Record Created'] = Math.max(columnWidth['Record Created'], formatDate(d.createdAt).length);
      return {
        'Record Created': formatDate(d.createdAt),
        ...allowedPersonParams.reduce((obj, key) => {
          columnWidth[`Buyer ${titleizeCamelCase(key)}`] = Math.max(columnWidth[`Buyer ${titleizeCamelCase(key)}`], d.Buyer[key].length);
          columnWidth[`Seller ${titleizeCamelCase(key)}`] = Math.max(columnWidth[`Seller ${titleizeCamelCase(key)}`], d.Seller[key].length);
          columnWidth[`Witness ${titleizeCamelCase(key)}`] = Math.max(columnWidth[`Witness ${titleizeCamelCase(key)}`], d.Witness[key].length);

          obj[`Buyer ${titleizeCamelCase(key)}`] = d.Buyer[key];
          obj[`Seller ${titleizeCamelCase(key)}`] = d.Seller[key];
          obj[`Witness ${titleizeCamelCase(key)}`] = d.Witness[key];
          return obj;
        }, {}),
        ...allowedVehicleParams.reduce((obj, key) => {
          columnWidth[`Vehicle ${titleizeCamelCase(key)}`] = Math.max(
            columnWidth[`Vehicle ${titleizeCamelCase(key)}`],
            d.Vehicle[key].toString().length
          );
          obj[`Vehicle ${titleizeCamelCase(key)}`] = d.Vehicle[key];
          return obj;
        }, {})
      };
    });
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(data, { header: header });
    worksheet['!cols'] = header.map(h => ({ wch: columnWidth[h] }));
    utils.book_append_sheet(workbook, worksheet, 'Deals Records');
    writeFile(workbook, 'Vehicle-Commission-Agents.xlsb');
  } else {
    notify({ type: 'error', title: 'Error', text: 'Something went wrong' });
  }
}

//IMPORTING
function formatData(data) {
  return data.map(d => {
    return Object.entries(d).reduce(
      (obj, [key, value]) => {
        if (key.includes('Buyer')) {
          obj['buyer'][toCamelCase(key.split('Buyer ')[1])] = value;
        } else if (key.includes('Seller')) {
          obj['seller'][toCamelCase(key.split('Seller ')[1])] = value;
        } else if (key.includes('Witness')) {
          obj['witness'][toCamelCase(key.split('Witness ')[1])] = value;
        } else if (key.includes('Vehicle')) {
          obj['vehicle'][toCamelCase(key.split('Vehicle ')[1])] = value;
        }
        return obj;
      },
      { buyer: {}, seller: {}, witness: {}, vehicle: {} }
    );
  });
}

async function insertData(data) {
  const res = await window.Api.insertRecords(JSON.stringify({ records: data, userId: store.getters.currentUser }));
  if (res.status === 200) {
    emits('import:success');
    notify({ type: 'success', title: 'Success', text: 'Records Imported Successfully' });
  } else {
    notify({ type: 'error', title: 'Error', text: 'Something went wrong' });
  }
}

async function importData($event) {
  let data = null;
  const files = $event.target.files;
  if (files.length) {
    const reader = new FileReader();
    reader.readAsBinaryString(files[0]);
    reader.onload = e => {
      const wb = read(e.target.result, { type: 'binary' });
      const sheets = wb.SheetNames;
      if (sheets.length) {
        data = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        data = formatData(data);
        insertData(data);
      } else {
        notify({ type: 'info', title: 'Info', text: 'Empty Insertion' });
      }
    };
  } else {
    notify({ type: 'error', title: 'Error', text: 'No file selected' });
  }
  $event.target.value = '';
}
</script>
