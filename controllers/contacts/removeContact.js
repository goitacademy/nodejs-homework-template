const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const remoteContact = await Contact.findByIdAndRemove(contactId);
    if (!remoteContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: remoteContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
