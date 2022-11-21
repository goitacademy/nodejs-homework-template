const express = require("express");
const contactsModels = require("../../models/contacts");
// const { Contact } = require("../../schemas/contactSchema");

const router = express.Router();

router.get("/", async (req, res, next) => contactsModels.listContacts(res));

router.get("/:contactId", async (req, res, next) =>
  contactsModels.getContactById(req.params.contactId, res)
);
router.post(
  "/",
  async (req, res, next) => contactsModels.addContact(req, res)
  // {
  //   // const addedContactStatus = ;
  //   // if (typeof addedContactStatus === "string") {
  //   //   res
  //   //     .status(400)
  //   //     .json({ message: `missing required name field: ${addedContactStatus}` });
  //   // }
  //   // res.status(201).json(addedContactStatus);
  //   }
);

router.delete("/:contactId", (req, res, next) =>
  contactsModels.removeContact(req.params.contactId, res)
);

router.put(
  "/:contactId",
  async (req, res, next) =>
    contactsModels.updateContact(req.params.contactId, req.body, res)
  // {
  //   const { name, email, phone } = req.body;
  //   if (name || email || phone) {
  //     const contactUpdateStatus = await contactsModels.updateContact(
  //       req.params.contactId,
  //       req.body
  //     );

  //     if (contactUpdateStatus === 404) {
  //       res.status(404).json({ message: "Not found" });
  //       return;
  //     }

  //     if (typeof contactUpdateStatus === "string") {
  //       res.status(400).json({
  //         message: `missing required name field: ${contactUpdateStatus}`,
  //       });
  //       return;
  //     }

  //     res.json(contactUpdateStatus);
  //   }
  //   res.status(400).json({ message: "missing fields" });
  // }
);

module.exports = router;
