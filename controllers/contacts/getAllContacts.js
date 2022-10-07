const { bool, boolean } = require("joi");
const { Contact } = require("../../service/schemasContacts");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  if (favorite === null) {
    try {
      const results = await Contact.find({ owner }, "", {
        skip,
        limit,
      }).populate("owner", "email");
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: "error",
        message: e.message,
      });
    }
  } else {
    try {
      const results = await Contact.find({ owner, favorite }, "", {
        skip,
        limit,
      }).populate("owner", "email");
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: results,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: "error",
        message: e.message,
      });
    }
  }
};
module.exports = getAll;
