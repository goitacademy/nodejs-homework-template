const { Contact } = require("../../models/index");
const { requestError } = require("../../helpers/requestError");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw requestError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted successfully",
      data: { result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
