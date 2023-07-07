const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

fs.readdirSync('./server/src/models').forEach(function (file) {
  if (file !== 'index.js') {
    db[file.substring(0, file.lastIndexOf('.')) || file] = require('./' + file)(sequelize, Sequelize.DataTypes, Sequelize.Model);
  }
});

try {
  const User = db.User;
  const Business = db.Business;

  User.hasOne(Business, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  // Business.belongsTo(User);

  const Deal = db.Deal;
  const Vehicle = db.Vehicle;
  const Member = db.Member;

  Business.hasMany(Deal, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Deal.hasOne(Vehicle, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Deal.hasOne(Member, {
    as: 'Seller',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Deal.hasOne(Member, {
    as: 'Buyer',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });
  Deal.hasOne(Member, {
    as: 'Witness',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Deal.belongsTo(Business);
  // Vehicle.belongsTo(Deal);
  // Member.belongsTo(Deal, { as: 'seller' });
  // Member.belongsTo(Deal, { as: 'buyer' });
  // Member.belongsTo(Deal, { as: 'witness' });
} catch (e) {
  console.error(e);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
