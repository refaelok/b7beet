'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGO_DOCKER || 'mongodb://localhost/b7beet'
  },

  // Seed database on startup
  seedDB: true

};
