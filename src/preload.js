const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('Api', {
  registerUser: params => ipcRenderer.invoke('registerUser', params),
  registerBusiness: params => ipcRenderer.invoke('registerBusiness', params),
  authenticate: params => ipcRenderer.invoke('authenticate', params),
  validateBuyer: params => ipcRenderer.invoke('validateBuyer', params),
  validateVehicle: params => ipcRenderer.invoke('validateVehicle', params),
  validateSeller: params => ipcRenderer.invoke('validateSeller', params),
  validateWitness: params => ipcRenderer.invoke('validateWitness', params),
  createDeal: params => ipcRenderer.invoke('createDeal', params),
  fetchRecords: () => ipcRenderer.invoke('fetchRecords'),
  fetchRecord: params => ipcRenderer.invoke('fetchRecord', params),
  deleteRecord: params => ipcRenderer.invoke('deleteRecord', params),
  updateRecord: params => ipcRenderer.invoke('updateRecord', params)
});
