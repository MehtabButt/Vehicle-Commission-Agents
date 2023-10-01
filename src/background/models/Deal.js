module.exports = (sequelize, DataTypes, Model) => {
  class Deal extends Model {}
  Deal.init(
    {},
    {
      sequelize,
      modelName: 'Deal'
    }
  );
  return Deal;
};
