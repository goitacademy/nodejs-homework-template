const contactsOperations = require('../../model/contacts/')


const getAll = async (req, res)=> {
      const contactList = await contactsOperations.getAll();
      res.json({
          status: "success",
          code: 200,
          data: {
            result: contactList
          }
      })
  }

  module.exports = getAll