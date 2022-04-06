const contactMethod = require("../repository/index");

const { removeContact } = contactMethod.removeContact;

const delRemoveContact = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: 200, payload: { contact } });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not Found" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  delRemoveContact,
};
