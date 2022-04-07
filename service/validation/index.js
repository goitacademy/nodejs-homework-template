const {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact,
  validationMangoId,
} = require('./contact');

const {
  validationSignupUser,
  validationLoginUser,
  validationUpdateSubscription,
  validationUserId,
} = require('./user');

module.exports = {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact,
  validationMangoId,
  validationSignupUser,
  validationLoginUser,
  validationUpdateSubscription,
  validationUserId,
};
