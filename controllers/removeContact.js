const { Contact } = require("../models/contact");
const { RequestErr } = require("../helpers");

const removeContact = async (req, res, next) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if(!result){
      throw RequestErr(404, "Not found");
  }
  res.json({
      message: "Book deleted"
  })
}

module.exports = removeContact;