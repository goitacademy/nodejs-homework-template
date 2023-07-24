const { register } = require('./register');
const { login } = require('./login');
const { getCurrent } = require('./current');
const { logout } = require('./logout');
const { updateSubscriptionStatus } = require('./updateSubscriptionStatus');
const { updateAvatar } = require('./apdateAvatar');
const { verifyEmail } = require('./verifyEmail');
const { resendVerifyEmail } = require('./resendVerifyEmail');

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscriptionStatus,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail,
};
