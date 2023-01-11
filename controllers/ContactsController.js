const asyncHandler = require("express-async-handler");
const {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  updateContactService,
  removeContactService,
  changeFavoriteStatusService,
} = require("../service/index");

class ContactsController {
  add = async (req, res, next) => {
    try {
      const { name, email, phone, favorite } = req.body;
      const userId = req.user._id;
      const contact = await createContactService(
        { name, email, phone, favorite },
        userId
      );

      res.status(201).json({ status: "success", contact });
    } catch (e) {
      console.error(e);
    }
  };

  fetchAll = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const { page, limit, favorite } = req.query;

      const contacts = await getAllContactsService(
        userId,
        page,
        limit,
        favorite
      );

      res.json({ status: "success", contacts });
    } catch (e) {
      console.error(e);
    }
  };

  fetchOne = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const userId = req.user._id;
      const contact = await getContactByIdService(contactId, userId);

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
    const userId = req.user._id;

    if (!name && !email && !phone && !favorite) {
      return res
        .status(400)
        .json({ message: "missing fields", status: "error" });
    }
    try {
      const contact = await updateContactService(
        contactId,
        { name, email, phone, favorite },
        userId
      );

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
      const userId = req.user._id;
      const result = await removeContactService(contactId, userId);

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
    const userId = req.user._id;

    if (favorite === undefined) {
      return res
        .status(400)
        .json({ message: "missing field favorite", status: "error" });
    }

    try {
      const contact = await changeFavoriteStatusService(
        contactId,
        favorite,
        userId
      );

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
