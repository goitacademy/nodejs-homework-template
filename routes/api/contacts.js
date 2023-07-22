const express = require("express");

const {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contact-controller.js");
const { validateBody } = require("../../decorators/index.js");
const { isEmptyBody } = require("../../middlewares/index");
const { contactSchema } = require("../../schema/contacts.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", isEmptyBody, validateBody(contactSchema), add);

router.delete("/:id", deleteById);

router.put("/:id", isEmptyBody, validateBody(contactSchema), updateById);

module.exports = router;
