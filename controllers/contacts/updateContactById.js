const Contact = require('../../models/contact');
const { NotFound } = require('http-errors');

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found...`)
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
}

module.exports = updateContactById;