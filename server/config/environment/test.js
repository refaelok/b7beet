'use strict';
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/b7beet-test',
    containerUri: 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADD + ':' + process.env.MONGO_PORT_27017_TCP_PORT + '/b7beet-test'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
