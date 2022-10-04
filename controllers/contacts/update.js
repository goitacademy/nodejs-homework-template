const { Contact } = require("../../models/contacts");
const {RequestError} = require("../../helpers")

const update = async (req, res, next) => {
  
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.json(result)
  
};

module.exports = update;