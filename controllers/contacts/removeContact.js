const { NotFound } = require("http-errors")

const { Contact } = require("../../models/index")

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`);      
    }
    res.json({
      status: "success",
      code: 200,
      message: `Contact width id ${contactId} removed`,
      data: {
        result
      }
})
}

module.exports = removeContact;