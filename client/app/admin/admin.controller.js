'use strict';

export default class AdminController {
  users: Object[];

  /*@ngInject*/
  constructor(User) {
    // Use the User $resource to fetch all users
    this.User = User;
    this.users = User.query();
    this.roles = ['guest', 'user', 'member', 'manager', 'admin'];
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  updateRole(user, newRole){
    user.newRole = user.newRole || user.role;
    user.$updateRole().then(() => {
      this.users = this.User.query();
    })

  }
}
