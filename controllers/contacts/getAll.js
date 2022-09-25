const { contactsServices } = require("../../services");

const getAll = async (req, res) => {
  const contacts = await contactsServices.getAll();
  res.status(200).json({
    status: "success",
    code: "200",
    payload: { result: contacts },
  });
};

module.exports = getAll;
