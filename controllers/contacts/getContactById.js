const { Contact } = require("../../models");
const { requestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log("contactId: ", contactId);
    const contact = await Contact.findById(contactId);
    console.log("contact: ", contact);
    if (!contact) {
      throw requestError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
