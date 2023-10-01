module.exports = (sequelize, DataTypes, Model) => {
  class Vehicle extends Model {}
  Vehicle.init(
    {
      registrationNo: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's registration number"
          },
          notEmpty: {
            msg: "enter vehicle's registration number"
          }
        }
      },
      maker: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's maker"
          },
          notEmpty: {
            msg: "enter vehicle's maker"
          }
        }
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's model"
          },
          notEmpty: {
            msg: "enter vehicle's model"
          }
        }
      },
      power: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's power"
          },
          notEmpty: {
            msg: "enter vehicle's power"
          }
        }
      },
      chassisNo: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's chassis number"
          },
          notEmpty: {
            msg: "enter vehicle's chassis number"
          }
        }
      },
      engineNo: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's engine number"
          },
          notEmpty: {
            msg: "enter vehicle's engine number"
          }
        }
      },
      buyingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's buying price"
          },
          notEmpty: {
            msg: "enter vehicle's buying price"
          }
        }
      },
      sellingPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter vehicle's selling price"
          },
          notEmpty: {
            msg: "enter vehicle's selling price"
          }
        }
      }
    },
    {
      sequelize,
      modelName: 'Vehicle'
    }
  );
  return Vehicle;
};
