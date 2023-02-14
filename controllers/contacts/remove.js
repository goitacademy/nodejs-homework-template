const { Contact } = require("../../models/contact");
// const ObjectId = require("mongodb").ObjectId;

const removeContact = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const _id = req.params.id;
    const result = await Contact.findByIdAndRemove({ owner, _id });
    if (!result) {
      const { error } = new Error(`Contact with id=${_id} not found`);
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
