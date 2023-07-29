const { Contact } = require("../../models/contact");

const getListContacts = async (req, res, next) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
 
   const filterValue = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(filterValue,"", {skip, limit});
  res.json(result);
};

module.exports = getListContacts;
