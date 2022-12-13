// const { removeContact } = require("../models/contacts");
const { Contacts } = require("../models/contacts");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contacts.findByIdAndRemove(id);
  try {
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteContact };
