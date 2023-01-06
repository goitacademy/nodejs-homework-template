const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json(result);
};

module.exports = getContactById;