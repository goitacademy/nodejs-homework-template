const { contactsServices } = require("../../services");

const add = async (req, res, next) => {
  const newContact = await contactsServices.add(req.body);
  res.status(201).json({
    status: "success",
    code: "201",
    payload: { result: newContact },
  });
};

module.exports = add;
