module.exports = (sequelize, DataTypes, Model) => {
  class Business extends Model {}
  Business.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,

        notEmpty: true,
        validate: {
          notNull: {
            msg: "please enter your business name",
          },
          notEmpty: {
            msg: "please enter your business name",
          },
        },
        unique: {
          args: true,
          msg: "business already exists",
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "please enter your business address",
          },
          notEmpty: {
            msg: "please enter your business address",
          },
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "please enter your business contact number",
          },
          notEmpty: {
            msg: "please enter your business contact number",
          },
          isMobilePhone: {
            msg: "conatct number format incorrect",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Business",
    }
  );
  return Business;
};
