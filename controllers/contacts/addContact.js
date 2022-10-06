
const { Contact } = require("../../service/schemasContacts");

const addContactById = async (req, res, next) => {
  const { body } = req;
  const { _id: owner } = req.user;
  try {
    const result = await Contact.create({ ...body, owner });
    res.json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: e.message,
    });
  }
};
module.exports = addContactById;
