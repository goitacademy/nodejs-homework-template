const contactsOperations = require("../../services/contacts");

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  console.log("req.body", req.body);
  console.log("_id", _id);
  try {
    const result = await contactsOperations.addContact({
      ...req.body,
      owner: _id,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
