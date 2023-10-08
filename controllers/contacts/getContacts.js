const { Contact } = require("../../models/contact-model/Contact");

const getContacts = async (req, res, next) => {
    const { page = 1, limit = 10, favorite = null } = req.query;
    const skip = (page - 1) * limit;

    const query = { owner: req.user.id };

    if (favorite !== null) query.favorite = favorite;
  try {
    const contacts = await Contact.find(query).skip(skip).limit(limit);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
