const postgresqlAdapter = require('sails-postgresql');
// const mongoAdapter = require('sails-mongo');

module.exports = {
  adapters: {
    postgresql: postgresqlAdapter,
    // mongodb: mongoAdapter
  },
  connections: {
    postgresql: {
      adapter: 'postgresql',
      host: process.env.HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'ews',
      port: 5432,
    },
    // postgresql2: {
    //   adapter: 'postgresql',
    //   host: process.env.HOST_2 || 'localhost',
    //   user: process.env.DB_USER_2 || 'postgres',
    //   password: process.env.DB_PASS_2 || 'root',
    //   database: process.env.DB_NAME_2 || 'yaas_v2',
    //   port: 5432,
    // },
    // mongo: {
    //   adapter: 'mongodb',
    //   host: process.env.MONGOHOST || 'localhost',
    //   database: process.env.MONGODB_NAME || 'ews',
    //   port: 27017
    // }
  },
};
