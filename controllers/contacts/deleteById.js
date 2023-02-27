const { NotFound } = require("http-errors");
const contactsOperations = require("../../models/contacts")

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound("Not found");
    }

    res.status(200).json({
      message: "Contact deleted",
    });
};

module.exports = deleteById;