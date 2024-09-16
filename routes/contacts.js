const router = require("express").Router();
const task = require("../controllers/contacts");
const userAuth = require("../middleware/auth");

router.get("/", userAuth, task.getContacts);

router.get("/:contactId", userAuth, task.getContact);

router.post("/", userAuth, task.saveContact);

router.delete("/:contactId", userAuth, task.removeContact);

router.put("/:contactId", userAuth, task.updateContact);

router.patch("/:contactId/favorite/", userAuth, task.updateStatusContact);

module.exports = router;
