class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.password = user.password;
    this.address = user.address;
    this.status = user.status;
    this.isAdmin = user.isAdmin;
  }
}

export default User;
