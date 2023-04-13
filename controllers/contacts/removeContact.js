const createError = require("http-errors");

const { removeContact } = require("../../models/contacts");

const removeController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const contact = await removeContact(id);
  if (!contact) {
    throw createError(404, `user with id=${id} not found`);
  }
  // console.log('REMOVE2===>', contact);
  res.status(200).json({
    message: "contact deleted",
    status: "success",
    code: 200,
    data: {
      result: contact,
    },
  });
};

module.exports = removeController;
