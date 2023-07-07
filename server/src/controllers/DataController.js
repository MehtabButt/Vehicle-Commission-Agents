const { Deal, Vehicle, User, Business, sequelize } = require('../models/index');

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
  },
  async fetchPersonalData(event) {
    try {
      const user = await User.findOne();
      const business = await user.getBusiness();
      delete user.dataValues.password;
      return { status: 200, data: JSON.stringify({ user, business }) };
    } catch (error) {
      return { status: 500, error: 'no data found' };
    }
  },
  async updatePersonalData(event, params) {
    params = JSON.parse(params);
    let user = await User.findByPk(params.user.id);
    const business = await user.getBusiness();
    let errors = [];
    try {
      var skipPassword = false;
      if (params.user.password === '' && params.user.confirmPassword === '' && params.user.currentPassword === '') skipPassword = true;
      await User.build(params.user).validate({ skipPassword: skipPassword });
    } catch (error) {
      errors = error.errors;
    } finally {
      if (!skipPassword && user.password !== params.user.currentPassword)
        errors.push({ message: 'current password is incorrect', path: 'currentPassword' });
    }
    try {
      await Business.build(params.business).validate();
    } catch (error) {
      errors = [...errors, ...error.errors];
    }

    if (errors.length > 0) {
      return { status: 500, error: errors };
    }
    if (skipPassword) {
      params.user.password = user.password;
      params.user.confirmPassword = user.password;
    }

    const t = await sequelize.transaction();
    try {
      user.set(params.user);
      await user.save({ transaction: t });
      business.set(params.business);
      await business.save({ transaction: t });
      await t.commit();
      return { status: 200 };
    } catch (error) {
      await t.rollback();
      return { status: 500, error: 'update failed' };
    }
  }
};
