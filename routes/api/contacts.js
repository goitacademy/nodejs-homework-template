const express = require("express");
const {
  getAll,
  getById,
  remove,
  post,
  update,
} = require("../../controllers/contactsControllers");

const router = express.Router();

const { validateBody } = require("../../helpers");
const { createContactSchema, updateContactSchema } = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", validateBody(createContactSchema), post);

router.delete("/:id", remove);

router.put("/:id", validateBody(updateContactSchema), update);

module.exports = router;
