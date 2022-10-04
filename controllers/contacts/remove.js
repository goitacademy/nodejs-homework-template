const { Contact } = require("../../models/contacts")

const remove = async (req, res, next) => {
  
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id, req.body, {new:true});
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json(result)
 
}

module.exports = remove;