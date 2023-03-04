const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) throw requestError(404, "Not found");

    return res.json({
      status: "success",
      message: "Contact deleted successfully", // changed from 'data' to 'message'
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
