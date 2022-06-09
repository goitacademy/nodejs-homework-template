const express = require("express");
const { avatar } = require("../../controllers/users");
const { wrapper: wrapperError } = require("../../middleware/error-handler");
const router = express.Router();
const guard = require("../../middleware/guard");
const upload = require("../../middleware/upload");

router.patch("/avatar", guard, upload.single("avatar"), wrapperError(avatar));

module.exports = router;
