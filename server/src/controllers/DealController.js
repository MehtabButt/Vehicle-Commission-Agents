const { Member, Vehicle, Deal, sequelize } = require('../models/index');
const useGlobal = true;
const globalParams = {
  BusinessId: null,
  buyer: {
    firstName: 'mehtab',
    lastName: 'butt',
    fatherName: 'riaz butt',
    address: 'paragon',
    contact: '0310-6457483',
    cnic: '23495-9075674-1'
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
    firstName: 'saad ',
    lastName: 'butt',
    fatherName: 'riaz butt',
    address: 'paragon',
    contact: '',
    cnic: '37929-7288292-1'
  },
  vehicle: {
    registrationNo: 'LEg-482',
    maker: 'yamaha',
    model: '2021',
    power: '130',
    chassisNo: 'h4jejd83',
    engineNo: 'kskjw83',
    buyingPrice: 100000,
    sellingPrice: 110000
  }
};

async function validateBuyer(event, params) {
  try {
    if (useGlobal) params = globalParams.buyer;
    else params = JSON.parse(params);
    await Member.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateVehicle(event, params) {
  try {
    if (useGlobal) params = globalParams.vehicle;
    else params = JSON.parse(params);
    await Vehicle.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateSeller(event, params) {
  try {
    if (useGlobal) params = globalParams.seller;
    else params = JSON.parse(params);
    await Member.build(params).validate();
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function validateWitness(event, params) {
  try {
    if (useGlobal) params = globalParams.witness;
    else params = JSON.parse(params);
    await Member.build(params).validate({ isWitness: true });
    return { status: 200 };
  } catch (err) {
    return { status: 500, error: err.errors };
  }
}

async function createDeal(event, params) {
  if (useGlobal) params = globalParams;
  else params = JSON.parse(params);
  for (let i = 0; i < 100; i++) {
    const t = await sequelize.transaction();
    try {
      const deal = await Deal.create({}, { transaction: t });
      if (!params.buyer.firstName && !params.seller.firstName) throw new Error('Buyer and Seller both are missing');
      await deal.createBuyer(params.buyer, { transaction: t, isOptional: !params.buyer.firstName });
      await deal.createSeller(params.seller, { transaction: t, isOptional: !params.seller.firstName });
      await deal.createWitness(params.witness, { transaction: t, isWitness: true });
      await deal.createVehicle(params.vehicle, { transaction: t });
      await t.commit();
      // return { status: 200 };
    } catch (err) {
      await t.rollback();
      // return { status: 500, error: err.errors };
    }
  }
}

async function insertRecords(event, params) {
  const t = await sequelize.transaction();
  params = JSON.parse(params);
  try {
    for (const record of params.records) {
      const deal = await Deal.create({}, { transaction: t });
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
