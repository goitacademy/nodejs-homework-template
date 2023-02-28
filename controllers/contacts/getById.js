const { Contact } = require("../../models/contact");
const ObjectId = require("mongodb").ObjectId;

const getById = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const _id = ObjectId(req.params.id);
    const contact = await Contact.findOne({ owner, _id });
    if (!contact) {
      return null;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
