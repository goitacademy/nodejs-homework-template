const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: result,
    },
  });
};

module.exports = { add: ctrlWrapper(add) };
