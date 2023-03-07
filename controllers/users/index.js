const { controllerSingUpUser } = require('./controllerSingUpUser');
const { controllerLoginUser } = require('./controllerLoginUser');
const { controllerLogoutUser } = require('./controllerLogoutUser');
const { controllerGetUser } = require('./controllerGetUser');
const { controllerUpdateAvatarUser } = require('./controllerUpdateAvatarUser');
const { controllerVerifyUser } = require('./controllerVerifyUser');
const {
  controllerVerifyTwoSendMailUser,
} = require('./controllerVerifyTwoSendMailUser');

module.exports = {
  controllerSingUpUser,
  controllerLoginUser,
  controllerLogoutUser,
  controllerGetUser,
  controllerUpdateAvatarUser,
  controllerVerifyUser,
  controllerVerifyTwoSendMailUser,
};
