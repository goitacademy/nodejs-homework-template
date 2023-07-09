const contactsOperations = require('../../models/contacts')

const getContactById = async (req, res) => {
       const {id} = req.params;
    const result = await contactsOperations.getContactById(id);
    if(!result){
      const error = new Error(`Contact with id=${id} not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
      result
      }
    });
  } 
  

  module.exports = getContactById