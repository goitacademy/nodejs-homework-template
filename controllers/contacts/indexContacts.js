const service = require("../../service/index");

const indexContacts = async (req, res, next) => {
  try {
    const contacts = await service.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (e) {
    console.error("Error reading file: ", e.message);
    next(e);
  }
};

module.exports = indexContacts;