// const contactsOperations = require("../../contactsOperations");
const { Contact } = require("../../models");
const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const contacts = await Contact.find({ owner: _id }).populate("owner");
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
