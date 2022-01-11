const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    sortBy,
    sortByDesc,
    filter,
    favorite,
  } = req.query;

  const { _id } = req.user;

  let sortParam = null;
  let contacts = null;
  let total = null;

  if (favorite) {
    total = await Contact.find({ owner: _id, favorite }).countDocuments(); // fav contacts counter
    contacts = Contact.find({ owner: _id, favorite }).populate(
      "owner",
      "_id email"
    ); //"owner"- field extends;
  } else {
    total = await Contact.find({ owner: _id }).countDocuments(); // total contacts counter
    contacts = Contact.find({ owner: _id }).populate("owner", "_id email"); //"owner"-field extends;
  }

  if (sortBy) {
    sortParam = { [`${sortBy}`]: 1 }; //sort by query "+"
  }
  if (sortByDesc) {
    sortParam = { [`${sortByDesc}`]: -1 }; //sort by query "-"
  }
  if (filter) {
    contacts = contacts.select(filter.split("|").join(" ")); //'api/contacts?filter=name|email|favorite'
  }

  const skip = (page - 1) * limit; //pagination
  contacts = await contacts
    .skip(Number(skip)) //pagination
    .limit(Number(limit)) //pagination
    .sort(sortParam); //sort by query

  res.status(200).json({ data: { total, contacts } });
};
module.exports = getAllContacts;
