const { Contact } = require("../../models");

const deleteContacts = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.contactId);
    if (contact) {
      return res.status(200).json({
        code: 200,
        status: "success",
        message: "contact deleted",
      });
    }
    return res
      .status(404)
      .json({ code: 404, status: "error", message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContacts;
