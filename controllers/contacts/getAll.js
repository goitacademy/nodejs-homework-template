const constacts = require("../../models/contacts")

const getAll = async (req, res, next) => {
  try {
    const result = await constacts.listContacts();

    res.json(result);
  }
  catch (error) {
    next(error);
  }

}

module.exports = getAll;