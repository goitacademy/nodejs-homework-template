const Contact = require("../../models/contacts")
const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const { favorite } = req.query
  const skip = (page - 1) * limit;
  let value = null
  if (favorite) {
   value = {owner: _id, favorite:favorite} 
  }
  else {
   value = {owner: _id}
  }
 const result = await Contact.find(value, "", { skip: skip, limit: Number(limit) }).populate("owner", "_id email subscription");
   
  res.json(result)
 
}

module.exports = listContacts