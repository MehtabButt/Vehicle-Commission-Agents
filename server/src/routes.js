const AuthenticationController = require('./controllers/AuthenticationController');
const DealController = require('./controllers/DealController');
const DataController = require('./controllers/DataController');

module.exports = ipcMain => {
  ipcMain.handle('registerUser', AuthenticationController.registerUser);
  ipcMain.handle('registerBusiness', AuthenticationController.registerBusiness);
  ipcMain.handle('authenticate', AuthenticationController.authenticate);
  ipcMain.handle('validateBuyer', DealController.validateBuyer);
  ipcMain.handle('validateVehicle', DealController.validateVehicle);
  ipcMain.handle('validateSeller', DealController.validateSeller);
  ipcMain.handle('validateWitness', DealController.validateWitness);
  ipcMain.handle('createDeal', DealController.createDeal);
  ipcMain.handle('fetchRecords', DataController.fetchRecords);
  ipcMain.handle('fetchRecord', DataController.fetchRecord);
  ipcMain.handle('deleteRecord', DataController.deleteRecord);
  ipcMain.handle('updateRecord', DataController.updateRecord);
};
