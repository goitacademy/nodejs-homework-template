const {Contact} = require("../../models")
const { RequestError } = require('../../helpers/RequestError')

const getById = async (req, res, next) => {
  
    const {id} = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw RequestError(404, " Not found")
    }
    res.json(result)
  
}

module.exports = getById;