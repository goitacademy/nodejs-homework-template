const Contact = require('../../models/contact');

const { NotFound } = require('http-errors');

const removeContactById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if (!result) {
      throw NotFound(`Contact with id=${contactId} not found...`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact delete",
      data: {
        result
      }
    })
}

module.exports = removeContactById;