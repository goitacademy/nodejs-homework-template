module.exports = class UserDto{
  email;
  id;
  subscription;
  avatarUrl;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.subscription = model.subscription;
    this.avatarUrl = model.avatarURL;
  }
}