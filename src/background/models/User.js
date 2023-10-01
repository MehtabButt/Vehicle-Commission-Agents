const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'please enter an email'
          },
          notEmpty: {
            msg: 'please enter an email'
          },
          isEmail: {
            msg: 'email format incorrect'
          }
        },
        unique: {
          args: true,
          msg: 'email already exists'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'please enter a password'
          },
          notEmpty: {
            msg: 'please enter a password'
          },
          len: {
            args: [8, 20],
            msg: 'password should be between 8 to 20 characters'
          },
          isStrong: function (value) {
            if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/.test(value)) {
              throw new Error('must contains atleast one lowercase letter, one uppercase letter and one digit');
            }
          }
        }
      },
      confirmPassword: {
        type: DataTypes.VIRTUAL,
        allowNull: false,
        set(value) {
          if (value === this.password) {
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('confirmPassword', hashedPassword);
          }
        },
        validate: {
          notNull: {
            msg: 'password did not match'
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'please enter your first name'
          },
          notEmpty: {
            msg: 'please enter your first name'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'please enter your last name'
          },
          notEmpty: {
            msg: 'please enter your last name'
          }
        }
      }
    },
    {
      hooks: {
        beforeValidate(user, options) {
          if (options.skipPassword) {
            user.password = user.confirmPassword = 'TempPassword9129';
          }
        }
      },
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
