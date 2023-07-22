<template>
  <div class="flex space-x-2 items-center">
    <button
      type="button"
      class="text-blue-700 flex items-center space-x-2 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      <icon-import />
      <span>Import Records</span>
    </button>
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
import { writeFile, utils } from 'xlsx';
import { titleizeCamelCase, formatDate } from '@/composables/utility.js';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

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
    //show error msg
  }
}
</script>
