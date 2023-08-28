const express = require("express");

const ctrl = require("../../controllers/user");

const { validateBody, authenticate } = require("../../midlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// updateSubscription

router.patch("/", authenticate, validateBody(schemas.updateSubscription), ctrl.updateSubscription)

module.exports = router;