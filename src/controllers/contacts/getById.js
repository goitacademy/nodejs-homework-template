const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

    if (!result) {
      throw requestError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
