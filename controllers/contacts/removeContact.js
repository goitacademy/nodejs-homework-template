const contactsOperations = require('../../models');
const { NotFound } = require('http-errors');

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "product deleted",
      data: {
        result,
      },
    });
}

module.exports = removeContact;