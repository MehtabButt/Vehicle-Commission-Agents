<template>
  <div class="flex flex-col">
    <ag-grid-vue
      class="ag-theme-alpine h-full"
      :pagination="true"
      :pagination-page-size="17"
      :column-defs="colDefs"
      :row-data="props.rowData"
      :default-col-def="props.defaultColDef"
      :context="props.context"
      tooltip-show-delay="0"
      tooltip-hide-delay="500000"
      row-selection="multiple"
      animate-rows="true"
      @cell-clicked="cellWasClicked"
      @grid-ready="emit('gridReady', $event.api)"
      @grid-columns-changed="onGridColumnsChanged"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Action from '@/components/Data/Action.vue';
import { AgGridVue } from 'ag-grid-vue3';
import { computed } from 'vue';

const emit = defineEmits(['editRow', 'deleteRecord', 'crossRowEdit', 'gridReady']);
const props = defineProps({
  columnDefs: {
    type: Array,
    required: true
  },
  defaultColDef: {
    type: Object,
    required: true
  },
  rowData: {
    type: Array,
    required: true
  },
  context: Object
});

//TABLE CONFIG
const colDefs = computed(() => {
  return [
    {
      headerName: 'Deal Records',
      headerClass: ['text-2xl', 'font-semibold', 'leading-none', 'text-gray-900'],
      children: [
        {
          headerName: 'Actions',
          field: 'id',
          cellRenderer: Action,
          cellClass: ['!flex', 'items-center'],
          headerClass: ['inline-block', 'text-center', 'self-center'],
          minWidth: 130,
          maxWidth: 130,
          sortable: false,
          filter: false,
          autoSize: false,
          pinned: 'left',
          editable: false
        },
        {
          headerName: 'Index',
          field: 'index',
          cellRenderer: params => params.node.rowIndex + 1,
          minWidth: 100,
          maxWidth: 100,
          sortable: false,
          filter: false,
          autoSize: false,
          pinned: 'left',
          editable: false
        }
      ]
    },
    ...props.columnDefs
  ];
});
</script>

<style>
.ag-header-group-cell-label,
.ag-header-cell-label {
  justify-content: center;
}

.ag-cell-value {
  text-align: center;
  justify-content: center;
}
</style>
