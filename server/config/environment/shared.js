'use strict';

exports = module.exports = {
  // List of user roles
  /**
  * guest role cant do anything util it will be promoted by admin
  * user role can create any view documents
  * member role can update documents
  * manager can delete documents
  * admin has all permission
  */
  userRoles: ['guest', 'user', 'member', 'manager', 'admin']
};
