const Users = require('../models/usersModel');

const addUser = ({ password, email, subscription, token }) => {
  return Users.create({ password, email, subscription, token })
    .then(result => result)
    .catch(err => false);
};

module.exports = {
  addUser,
};
