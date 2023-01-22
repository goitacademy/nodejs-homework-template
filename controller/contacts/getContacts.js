const Contacts = require("../../models/contacts");

// get all Contacts
const getContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { limit = 20, page = 1, favorite } = req.query;
    const skip = (page - 1) * limit;

    if (favorite) {
      const contacts = await Contacts.find({ owner: _id, favorite: favorite })
        .skip(skip)
        .limit(limit);

      return res.status(200).json(contacts);
    }

    const contacts = await Contacts.find({ owner: _id })
      .skip(skip)
      .limit(limit);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
