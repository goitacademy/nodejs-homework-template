const { Contact } = require("../../models");

const postAddContact = async (req, res) => {
  console.log("req-postAddContact", req.body);
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = postAddContact;
