const Contact = require('../../models/contact')

const getAll = async (requirement, response, next) => {
  try {
    const { _id: owner } = requirement.user;
    const { page = 1, limit = 20, ...query } = requirement.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({owner, ...query}, "-createdAt -updatedAt", {skip, limit});
    response.json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;