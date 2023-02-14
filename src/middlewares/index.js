const { userPostValidation, userPatchValidation } = require('./userValidation');
const { authMiddleware } = require('./authMiddleware');
const { avatarMiddleware } = require('./avatarMiddleware');

module.exports = {
    userPostValidation,
    userPatchValidation,
    authMiddleware,
    avatarMiddleware,
}