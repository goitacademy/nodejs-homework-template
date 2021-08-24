module.exports = class UserDto{
  email;
  id;
  subscription;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.subscription = model.subscription
  }
}