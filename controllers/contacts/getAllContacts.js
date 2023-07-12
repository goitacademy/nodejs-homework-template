const {HttpError} = require("../../helpers");
const { Contact } = require("../../models/contact/contactModel");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    
    const favorite = req.query.favorite

    const query = favorite ? {owner, favorite} : {owner}

  const data = await Contact.find(query, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit)
    .populate("owner", "name email");

    if (!data) {
      throw HttpError(404, "No contacts found");
    }
    res.status(200).json({ data });

}

module.exports = getAllContacts;