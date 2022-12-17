const Contact = require('../../models/contact');
const { NotFound } = require('http-errors');

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw NotFound(`Contact with id=${contactId} not found...`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact
      }
    })
}

module.exports = getContactById;