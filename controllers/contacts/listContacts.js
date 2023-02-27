const { ContactLeaveSchema } = require("../../models");

const listContacts = async (request, response) => {
  const contacts = await ContactLeaveSchema.find({}, "-createdAt -updatedAt");
  response.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};


module.exports = listContacts;