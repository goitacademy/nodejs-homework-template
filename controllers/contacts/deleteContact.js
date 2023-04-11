const contactsController = require("../../models/contacts");

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await contactsController.removeContact(id);

    if (result === null) {
      const err = new Error("This contact is not found");
      err.code = 404;
      throw err;
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  deleteContact,
};
