const contactsOperations = require('../../model/contacts')


const removeContact = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Product with id=${contactId} not found`
    })
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data:{
        result: result
      }
    })
    }

    module.exports = removeContact