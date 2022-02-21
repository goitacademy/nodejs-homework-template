const { getContactById } = require("../../models/contacts");

const getContactsById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
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

module.exports = getContactsById;
