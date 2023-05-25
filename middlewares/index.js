const validateBody = require("./validateBody");
const auth = require("./auth");
const { upload, resizeAvatar } = require("./upload");
const sendEmail = require("./sendMail");

module.exports = { validateBody, auth, upload, resizeAvatar, sendEmail };
