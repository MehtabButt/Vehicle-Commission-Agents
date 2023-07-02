const { Deal, Vehicle, sequelize } = require('../models/index');

function getExcept(obj, ...attributes) {
  let newObj = {};
  for (let key in obj) {
    if (!attributes.includes(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

module.exports = {
  async fetchRecords(event) {
    try {
      const deals = await Deal.findAll({
        include: ['Buyer', 'Seller', 'Witness', Vehicle]
      });
      return { status: 200, deal: JSON.stringify(deals) };
    } catch (err) {
      return { status: 500, error: err };
    }
  },
  async fetchRecord(event, params) {
    try {
      const deal = await Deal.findByPk(params.id, { include: ['Buyer', 'Seller', 'Witness', Vehicle] });
      return { status: 200, deal: JSON.stringify(deal) };
    } catch (err) {
      return { state: 500, error: err };
    }
  },
  async deleteRecord(event, params) {
    try {
      Deal.destroy({ where: { id: params.id } });
      return { status: 200, msg: 'record deletion success' };
    } catch (err) {
      return { status: 500, error: 'record deletion failed' };
    }
  },
  async updateRecord(event, params) {
    const t = await sequelize.transaction();
    try {
      let deal = await Deal.findByPk(params.id);
      let vehicle = await deal.getVehicle();
      let buyer = await deal.getBuyer();
      let seller = await deal.getSeller();
      let witness = await deal.getWitness();

      let newVehicle = getExcept(params.Vehicle, 'createdAt', 'updatedAt', 'DealId', 'id');
      let newBuyer = getExcept(params.Buyer, 'createdAt', 'updatedAt', 'buyerId', 'id', 'sellerId', 'witnessId');
      let newSeller = getExcept(params.Seller, 'createdAt', 'updatedAt', 'buyerId', 'id', 'sellerId', 'witnessId');
      let newWitness = getExcept(params.Witness, 'createdAt', 'updatedAt', 'buyerId', 'id', 'sellerId', 'witnessId');

      vehicle.set(newVehicle);
      buyer.set(newBuyer);
      seller.set(newSeller);
      witness.set(newWitness);

      vehicle = await vehicle.save({ transaction: t });
      buyer = await buyer.save({ transaction: t });
      seller = await seller.save({ transaction: t });
      witness = await witness.save({ transaction: t });

      await t.commit();
      return { status: 200, deal: JSON.stringify(await Deal.findByPk(params.id, { include: ['Buyer', 'Seller', 'Witness', Vehicle] })) };
    } catch (err) {
      await t.rollback();
      return { status: 500, error: 'record updation failed' };
    }
  }
};
