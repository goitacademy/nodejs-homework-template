const { User } = require('../../models/users');

async function findAndUpdate(userId, userData) {
  return await User.findByIdAndUpdate(userId, userData, {
    new: true,
  });
};

module.exports = { findAndUpdate };