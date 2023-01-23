const contactOperations = require("../../models");

const getAll = async (req, res, next) => {
  try {
    const allContacts = await contactOperations.listContacts();
    if (!allContacts.length) {
      return res.status(404).json({ message: "Bad request" })
    }
    res.json({
      status: "Success",
      code: 200,
      result: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll; 
