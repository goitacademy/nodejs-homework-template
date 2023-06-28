const Contact = require("../../models/contactModel");

const getContacts = async (req, res) => {
  const {_id: owner} = req.user;

  const {page = 1, limit= 20, favorite = true} = req.query;

  let filterFavorite;

  if(favorite){
     (filterFavorite = { owner, favorite })  (filterFavorite = { owner });
  }


  const skip = (page - 1) * limit;

  const result = await Contact.find(filterFavorite,"", {skip, limit});

  res.json(result);
};

module.exports = getContacts;