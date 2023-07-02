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
    }
  },
  actions: {
    // define your actions here
  },
  modules: {
    // define your modules here
  }
});
