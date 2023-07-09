const contactsOperations = require('../../models/contacts');

const removeById = async (req, res) => {
         const {id} = req.params;
      const result = await contactsOperations.removeContact(id);
      if(!result){
        const error = new Error(`Contact with id=${id} not found`);
        error.status = 404;
        throw error;
      }
      res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: {
          result
        }
      })
        }

  module.exports = removeById;