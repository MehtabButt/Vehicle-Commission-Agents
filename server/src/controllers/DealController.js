const { Member, Vehicle, Deal, User, Business, sequelize } = require('../models/index');

async function validateBuyer(event, params) {
  try {
    params = JSON.parse(params);
    await Member.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateVehicle(event, params) {
  try {
    params = JSON.parse(params);
    await Vehicle.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateSeller(event, params) {
  try {
    params = JSON.parse(params);
    await Member.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateWitness(event, params) {
  try {
    params = JSON.parse(params);
    await Member.build(params).validate({ isWitness: true });
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function createDeal(event, params) {
  params = JSON.parse(params);
  const t = await sequelize.transaction();
  let user;

  try {
    user = await User.findByPk(params.userId, { include: Business });
    if (!user) throw new Error('User not found');
    if (!user.Business) throw new Error('Business not found');
  } catch (error) {
    return { status: 500, error: error, user: JSON.stringify(user) };
  }

  try {
    const deal = await Deal.create({ BusinessId: user.Business.dataValues.id }, { transaction: t });
    if (!params.buyer.firstName && !params.seller.firstName) throw new Error('Buyer and Seller both are missing');
    await deal.createBuyer(params.buyer, { transaction: t, isOptional: !params.buyer.firstName });
    await deal.createSeller(params.seller, { transaction: t, isOptional: !params.seller.firstName });
    await deal.createWitness(params.witness, { transaction: t, isWitness: true });
    await deal.createVehicle(params.vehicle, { transaction: t });
    await t.commit();
    return { status: 200 };
  } catch (err) {
    await t.rollback();
    return { status: 500, error: err };
  }
}

async function insertRecords(event, params) {
  const t = await sequelize.transaction();
  params = JSON.parse(params);
  let user;

  try {
    user = await User.findByPk(params.userId, { include: Business });
    if (!user) throw new Error('User not found');
    if (!user.Business) throw new Error('Business not found');
  } catch (error) {
    return { status: 500, error: error.message };
  }

  try {
    for (const record of params.records) {
      const deal = await Deal.create({ BusinessId: user.Business.dataValues.id }, { transaction: t });
      await deal.createBuyer(record.buyer, { transaction: t });
      await deal.createSeller(record.seller, { transaction: t });
      await deal.createWitness(record.witness, { transaction: t });
      await deal.createVehicle(record.vehicle, { transaction: t });
    }
    await t.commit();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

module.exports = {
  validateBuyer,
  validateVehicle,
  validateSeller,
  validateWitness,
  createDeal,
  insertRecords
};
