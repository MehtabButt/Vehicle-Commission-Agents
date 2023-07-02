module.exports = (sequelize, DataTypes, Model) => {
  class Member extends Model {}
  Member.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'enter first name'
          },
          notEmpty: {
            msg: 'enter first name'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'enter last name'
          },
          notEmpty: {
            msg: 'enter last name'
          }
        }
      },
      fatherName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: "enter father's name"
          },
          notEmpty: {
            msg: "enter father's name"
          }
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: {
            msg: 'enter street address'
          },
          notEmpty: {
            msg: 'enter street address'
          }
        }
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: { msg: 'enter contact number' },
          notEmpty: { msg: 'enter contact number' },
          isContact(value) {
            if (value != '' && value != null && !/^03\d{2}-\d{7}$/.test(value)) throw new Error('contact number format is incorrect');
          }
        }
      },
      cnic: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
        validate: {
          notNull: { msg: 'enter contact number' },
          notEmpty: { msg: 'enter contact number' },
          isCNIC(value) {
            if (value != '' && value != null && !/^\d{5}-\d{7}-\d$/.test(value)) throw new Error('cnic format is incorrect');
          }
        }
      }
    },
    {
      hooks: {
        beforeValidate(member, options) {
          if (options.isWitness) {
            if (member.contact == '' || member.contact == null) member.contact = '0300-0000000';
            if (member.cnic == '' || member.cnic == null) member.cnic = '00000-0000000-0';
          } else if (options.isOptional) {
            member.firstName = 'N/A';
            member.lastName = 'N/A';
            member.fatherName = 'N/A';
            member.address = 'N/A';
            member.contact = '0300-0000000';
            member.cnic = '00000-0000000-0';
          }
        }
      },
      sequelize,
      modelName: 'Member'
    }
  );
  return Member;
};
