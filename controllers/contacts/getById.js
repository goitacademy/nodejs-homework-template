const contactsOperations = require("../../models/contactsOperations");
const getError = require("../../routes/error/error");

const getById = async (req, res) => {
    const { contactId } = req.params;
    const contactById = await contactsOperations.getContactById(contactId);
    if (!contactById) {
      console.log(getError(404, "Not found"));
      throw getError(404, "Not found");
    } else {
      res.json(contactById);
    }
}

module.exports = getById