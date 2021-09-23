const contactsOperations = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
     
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error; 
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
}
}


module.exports = getById