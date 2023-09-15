const express = require("express");
const contactService = require("../../models/contacts");
const router = express.Router();
const handlerError = require("../../middlewears/handlerError");

router.get("/", async (req, res, next) => {
  try {
    const data = await contactService.listContacts();
    res.status(200).json({
      data,
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

    res.status(200).json({
      data: updateContact,
      message: "you pidor",
    });
  } catch (error) {
    next(error)
  }
});
router.use(handlerError);

// router.use((err, _, res, __) => {
//   res.status(404).json({
//     status: "404",
//     message: err.message,
//   });
// });

module.exports = router;
