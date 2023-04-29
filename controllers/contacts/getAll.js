const Contact = require('../../models/contact')

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, ...query } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;