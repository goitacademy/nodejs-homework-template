const { Contact } = require("../../models/contacts");
const requestError = require("../../helpers/requestError");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await Contact.findOneAndRemove({ _id: contactId });

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
