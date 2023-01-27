const express = require('express');
const { wrapper, validator } = require("../../midWare/index");
const { joi, joiFavorite } = require("../../schemas/schemas");
const {
  getContactById,
  listContacts,
  addContact,
  removeContactById,
  updateById,
  updateFavorite
} = require("../../controlers/controlers")
const router = express.Router();

router.get("/", wrapper(listContacts));
router.get("/:contactId", wrapper(getContactById));
router.post("/", validator(joi), wrapper(addContact));
router.delete("/:contactId", wrapper(removeContactById));
router.put("/:contactId", validator(joi), wrapper( updateById));
router.patch(
  "/:contactId/favorite",
  validator(joiFavorite),
  wrapper(updateFavorite)
);

module.exports = router;
