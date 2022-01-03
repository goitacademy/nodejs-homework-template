const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  // const { page, limit } = req.query; //pagination
  const { _id } = req.user;
  // const skip = (page - 1) * limit; //pagination
  const contacts = await Contact.find(
    { owner: _id },
    "_id name email phone owner"
    // { skip, limit: +limit } //pagination
  ).populate("owner", "_id email"); //field "owner" extends
  res.status(200).json(contacts);
};
module.exports = getAllContacts;
