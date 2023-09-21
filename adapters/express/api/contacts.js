const express = require("express");
const contactService = require("../../../contacts/contacts");
const router = express.Router();
const createError = require("../../../untils/createError");
const handlerError = require("../../../middlewears/handlerError");
router.get("/", async (req, res, next) => {
  try {
    const results = await contactService.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        results,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactService.getContactById(contactId);

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await contactService.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contactService.removeContact(contactId);
    res.status(200).json({
      status: "success",
      code: 200,
      message: deleteContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const updateContact = await contactService.updateContact(contactId, body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
});
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;
    const favoriteContact = await contactService.updateStatusContact(
      contactId,
      body
    );
    res.status(200).json({
      status: "succes",
      code: 201,
      data: favoriteContact,
    });
  } catch (error) {
    next(error);
  }
});
router.use(handlerError);

module.exports = router;
