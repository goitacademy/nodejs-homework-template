const express = require("express");
// const contactsService = require("../../models/contacts");
const router = express.Router();
const controllers = require("../../controllers");
// const { HtppError } = require("../../helpers");
router.get(
  "/",
  async (req, res, next) => await controllers.getListController(req, res, next)
);

router.get(
  "/:contactId",
  async (req, res, next) =>
    await controllers.getContactController(req, res, next)
);

router.post(
  "/",
  async (req, res, next) =>
    await controllers.postContactController(req, res, next)
);

router.delete(
  "/:contactId",
  async (req, res, next) =>
    await controllers.deleteContactController(req, res, next)
);

router.put(
  "/:contactId",
  async (req, res, next) =>
    await controllers.putContactController(req, res, next)
);

module.exports = router;
