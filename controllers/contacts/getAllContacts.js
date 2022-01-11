const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 20, sortBy, sortByDesc, filter } = req.query; //pagination
  const { _id } = req.user;

  let sortParam = null;

  const total = await Contact.find({ owner: _id }).countDocuments(); // total contacts counter

  const skip = (page - 1) * limit; //pagination

  let contacts = Contact.find(
    { owner: _id },
    "name _id ",
    { skip: Number(skip), limit: Number(limit) } //pagination
  ).populate("owner", "_id email"); //"owner"-field extends

  if (sortBy) {
    sortParam = { [`${sortBy}`]: 1 }; //sort by query "+"
  }
  if (sortByDesc) {
    sortParam = { [`${sortByDesc}`]: -1 }; //sort by query "-"
  }
  if (filter) {
    contacts = contacts.select(filter.split("|").join(" ")); //'api/contacts?filter=name|email|favorite'
  }
  contacts = await contacts.sort(sortParam);

  res.status(200).json({ data: { total, contacts } });
};
module.exports = getAllContacts;
