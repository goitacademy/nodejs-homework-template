const {RequestError} = require('../../helpers/RequestError')

const getById = async (req, res, next) => {
  
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, " Not found")
    }
    res.json(result)
  
}