const { Contact } = require("../../models/contacts");
// const createError = require("http-errors");
const {requestError} = require("../../helpers/requestError");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const {favorite} = req.body;
  const result = await Contact.findByIdAndUpdate(contactId, {favorite},{new:true} );
  
  if (!result) {
    throw requestError(404, "Not found");
  }

  if(!req.body){
    throw requestError(400, "Missing field favorite");
  }

  res.json({
    status: "success",
    code: 200,
    data: { data: result },
  });
};

module.exports = updateFavorite;