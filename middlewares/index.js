const validateBody = require("./validateBody");
const auth = require("./auth");
const { upload, resizeAvatar } = require("./upload");

module.exports = { validateBody, auth, upload, resizeAvatar };
