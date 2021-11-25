const contactsOperations = require('../../model/contacts')

const getContactById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contactsOperations.getContactById(contactId);
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
        data: {
          result: result
        }
    })
  }

  module.exports = getContactById