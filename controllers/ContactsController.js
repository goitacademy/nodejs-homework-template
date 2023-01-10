const asyncHandler = require("express-async-handler");
const {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
} = require("../service/contacts");

class ContactsController {
  add = async (req, res, next) => {
    try {
      const { name, email, phone, favorite } = req.body;
      const contact = await createContactService({
        name,
        email,
        phone,
        favorite,
      });

      res.status(201).json({ status: "success", contact });
    } catch (e) {
      console.error(e);
    }
  };

  fetchAll = asyncHandler(async (req, res) => {
    const contacts = await getAllContactsService();
    if (!contacts) {
      res.status(400);
      throw new Error("Unable to fetch");
    }

    res.status(200).json({
      code: 200,
      message: "Success",
      data: contacts,
      quantity: contacts.length,
    });
  });

  fetchOne = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactByIdService(contactId);

      if (!contact) {
        res.status(404).json({ status: "error", message: "Not found" });
      }

      res.json({ status: "success", contact });
    } catch (e) {
      res.status(404).json({ status: "error", message: "Not found" });
      console.error(e);
    }
  };

  update = async (req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;

    if (!name && !email && !phone && !favorite) {
      return res
        .status(400)
        .json({ message: "missing fields", status: "error" });
    }
    try {
      const contact = await updateContactService(contactId, {
        name,
        email,
        phone,
        favorite,
      });

      res.json({
        status: "success",
        contact,
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({
        status: "error",
        message: `Not found contact id: ${contactId}`,
      });
    }
  };

  remove = async (req, res, next) => {
    const { contactId } = req.params;
    try {
      const result = await removeContactService(contactId);

      if (result) {
        res.json({
          status: "success",
          result,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: `Not found contact id: ${contactId}`,
        });
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  };

  favorite = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res
        .status(400)
        .json({ message: "missing field favorite", status: "error" });
    }

    try {
      const contact = await changeFavoriteStatusService(contactId, favorite);

      res.json({
        status: "success",
        contact,
      });
    } catch (e) {
      console.error(e);
      res.status(404).json({
        status: "error",
        message: `Not found contact id: ${contactId}`,
      });
    }
  };
}

module.exports = new ContactsController();
