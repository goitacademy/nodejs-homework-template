const { contactsServices } = require("../../services");

const add = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await contactsServices.add(_id, req.body);
  res.status(201).json({
    status: "success",
    code: "201",
    payload: { result: newContact },
  });
};

module.exports = add;
