const Contact = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, `Contact not found with id: ${contactId}`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
