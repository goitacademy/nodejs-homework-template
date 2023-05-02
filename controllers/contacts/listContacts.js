const { Contact } = require("../../models");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt, -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  if (!result) {
    res.status(400);
    throw new Error("Controller: Unnable to fetch contacts");
  }
  if (!favorite) {
    return res.json(result);
  } else {
    const favoriteContact = result.filter((contact) => {if(contact.favorite.toString() === favorite){return contact}});
    return res.json(favoriteContact);
  }
};

module.exports = listContacts