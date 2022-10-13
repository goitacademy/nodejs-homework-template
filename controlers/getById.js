const {Contact} = require('../models/contact')
const {RequestError} = require('../helpers')

const getById = async (req, res, next) => {

      const { id } = req.params;
      const result = await Contact.findById(id)
  
      if (!result) {
        throw RequestError(404, 'Not found')
      }
      res.json(result)
      console.log(result);
  
}

module.exports = getById;