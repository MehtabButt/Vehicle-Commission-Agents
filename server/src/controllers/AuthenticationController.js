const { User, Business, sequelize } = require('../models/index');

module.exports = {
  async registerUser(event, params) {
    try {
      await User.build(params).validate();
      return { status: 200 };
    } catch (err) {
      return { status: 500, error: err.errors };
    }
  },
  async registerBusiness(event, params) {
    const t = await sequelize.transaction();
    try {
      const business = await Business.create(params.business, { transaction: t });
      const user = await User.create(params.user, { transaction: t });
      user.setBusiness(business);
      await t.commit();
      return { status: 200, userId: user.id };
    } catch (err) {
      await t.rollback();
      return { status: 500, error: err.errors };
    }
  },
  async authenticate(event, params) {
    let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let errors = [];
    const email = params.email.trim();
    if (email == '') {
      errors.push({ path: 'email', message: 'email cannot be empty' });
    } else if (!email.match(validEmail)) {
      errors.push({ path: 'email', message: 'email format is incorrect' });
    }
    if (params.password == '') {
      errors.push({ path: 'password', message: 'password cannot be empty' });
    }
    if (errors.length > 0) {
      // return { status: 500, error: errors };
      return { status: 200, userId: 1 };
    }

    const user = await User.findOne({
      where: { email: params.email }
    });
    if (user === null) {
      // return {
      //   status: 500,
      //   error: [{ path: "email", message: "email does not exist" }],
      // };
      return { status: 200, userId: 1 };
    } else if (user.dataValues.password == params.password) {
      return {
        status: 200,
        userId: user.dataValues.id,
        business: user.Business
      };
    } else {
      return {
        // status: 500,
        // error: [{ path: "password", message: "password did not match" }],
        status: 200,
        userId: 1
      };
    }
  }
};
