const contactsOperations = require('../../model/contacts')


const updateContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsOperations.updateContactById(contactId, req.body);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        "message": "Not found"
    })
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data:{
        result: result
      }
    })
  }

  module.exports = updateContact