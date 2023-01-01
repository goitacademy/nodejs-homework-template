const Contacts = require("../../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const { _id: owner } = req.user;
    const result = await Contacts.find({ owner }, null, { skip, limit });   

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContacts;
