import { createStore } from 'vuex';

export default createStore({
  state: {
    deal: {
      buyer: {
        firstName: '',
        lastName: '',
        fatherName: '',
        address: '',
        contact: '',
        cnic: ''
      },
      vehicle: {
        registrationNo: '',
        maker: '',
        model: '',
        power: '',
        chassisNo: '',
        engineNo: '',
        buyingPrice: '',
        sellingPrice: ''
      },
      seller: {
        firstName: '',
        lastName: '',
        fatherName: '',
        address: '',
        contact: '',
        cnic: ''
      },
      witness: {
        firstName: '',
        lastName: '',
        fatherName: '',
        address: '',
        contact: '',
        cnic: ''
      }
    },
    confirmationDialogOptions: {
      show: false,
      resolve: null,
      message: 'Are you sure?',
      confirmText: 'Proceed',
      rejectText: 'Cancel'
    }
  },
  mutations: {
    setBuyer(state, buyer) {
      state.deal.buyer = buyer;
    },
    setSeller(state, seller) {
      state.deal.seller = seller;
    },
    setWitness(state, witness) {
      state.deal.witness = witness;
    },
    setVehicle(state, vehicle) {
      state.deal.vehicle = vehicle;
    },
    resetDeal(state) {
      state.deal = {
        registrationName: '',
        postOffice: '',
        buyer: {
          firstName: '',
          lastName: '',
          fatherName: '',
          address: '',
          contact: '',
          cnic: ''
        },
        vehicle: {
          registrationNo: '',
          maker: '',
          model: '',
          power: '',
          chassisNo: '',
          engineNo: '',
          buyingPrice: '',
          sellingPrice: ''
        },
        seller: {
          firstName: '',
          lastName: '',
          fatherName: '',
          address: '',
          contact: '',
          cnic: ''
        },
        witness: {
          firstName: '',
          lastName: '',
          fatherName: '',
          address: '',
          contact: '',
          cnic: ''
        }
      };
    },
    setConfirmationDialogOptions(state, payload) {
      let defaultOptions = state.confirmationDialogOptions;
      state.confirmationDialogOptions = { ...defaultOptions, ...payload, show: true };
    },
    resetConfirmationDialogOptions(state) {
      state.confirmationDialogOptions = {
        show: false,
        resolve: null,
        message: 'Are you sure?',
        confirmText: 'Proceed',
        rejectText: 'Cancel'
      };
    },
    resolveConfirmation(state, payload) {
      state.confirmationDialogOptions.show = false;
      state.confirmationDialogOptions.resolve = payload;
    }
  },
  actions: {
    confirm: ({ commit, state }, payload) => {
      commit('setConfirmationDialogOptions', payload);
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          let resolveStatus = state.confirmationDialogOptions.resolve;
          if (resolveStatus !== null) {
            if (resolveStatus) {
              resolve(true);
            } else {
              reject(true);
            }
            commit('resetConfirmationDialogOptions');
            clearInterval(interval);
          }
        }, 250);
      });
    }
  },
  modules: {
    // define your modules here
  }
});
