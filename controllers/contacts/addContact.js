const { Contact } = require("../../models");

const addContact = async (request, response) => {
  const { _id: owner } = request.user;
  const result = await Contact.create({ ...request.body, owner });
  response.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;
