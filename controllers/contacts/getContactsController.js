const { Contact } = require("../../models");
const successRes = require("../../utils/successRes");

async function getContactsController(req, res, next) {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit,
    }).populate("owner", "_id email");

    res.json(successRes(contacts));
  } catch (error) {
    next(error);
  }
}

module.exports = getContactsController;
