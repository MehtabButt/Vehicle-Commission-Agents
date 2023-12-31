const sqlite3 = require('sqlite3');
const { app } = require('electron');
const path = require('path');

module.exports = {
  db: {
    database: process.env.DB_NAME || 'vehicle_commission_agents_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      dialectModule: process.env.DIALECT_MODULE || sqlite3,
      host: process.env.HOST || 'localhost',
      storage:
        process.env.NODE_ENV == 'production'
          ? path.resolve(app.getPath('userData'), './vehicle_commission_agents.sqlite')
          : './vehicle_commission_agents.sqlite'
    }
  }
};
