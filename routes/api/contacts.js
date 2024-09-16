<<<<<<< Updated upstream
const express = require('express');
const controllers = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.get('/', authenticate, controllers.getListContacts)

router.get('/:contactId', authenticate, isValidId, controllers.getContactByID)

router.post('/', authenticate, controllers.addNewContact)

router.delete('/:contactId', authenticate, isValidId, controllers.deleteContact)

router.put('/:contactId', authenticate, isValidId, controllers.changeContact)

router.patch('/:contactId/favorite', authenticate, controllers.updateStatusContact)

module.exports = router
=======
const express = require("express");
const controllers = require("../../controllers");
const { isValidId, authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, controllers.getListContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactByID);

router.post("/", authenticate, controllers.addNewContact);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllers.deleteContact
);

router.put("/:contactId", authenticate, isValidId, controllers.changeContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  controllers.updateStatusContact
);

module.exports = router;
>>>>>>> Stashed changes
