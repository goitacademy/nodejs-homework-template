const { Contact } = require("../../models");

const patchContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res
        .status(200)
        .json({ code: 200, status: "success", payload: { contact } });
    }
    return res
      .status(404)
      .json({ code: 404, status: "error", message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = patchContact;
