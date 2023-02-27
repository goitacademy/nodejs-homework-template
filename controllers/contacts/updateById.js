const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");


const updateById = async (req, res) => {
    const { contactId } = req.params;
      const result = await contactsOperations.updateContact(contactId, req.body);
      if (!result) {
        throw new NotFound('Contact not found')
      }

    return res.json(result);
};

module.exports = updateById;