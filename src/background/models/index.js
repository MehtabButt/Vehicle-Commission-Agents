const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('../config/config.js');
const db = {};

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, config.db.options);

db['Business'] = require('./Business.js')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db['Deal'] = require('./Deal.js')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db['Member'] = require('./Member.js')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db['User'] = require('./User.js')(sequelize, Sequelize.DataTypes, Sequelize.Model);
db['Vehicle'] = require('./Vehicle.js')(sequelize, Sequelize.DataTypes, Sequelize.Model);

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
