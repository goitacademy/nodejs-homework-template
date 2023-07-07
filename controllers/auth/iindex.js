const auth = require('./auth');

module.exports = {
    auth: ctrlWrapper(auth),
};
