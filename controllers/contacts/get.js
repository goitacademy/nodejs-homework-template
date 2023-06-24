const { getAllContacts } = require("../../service/contacts");

const get = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    if (contacts.length === 0) {
      console.log("There is no contact in the contact database yet.");
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "There are no contacts in the database.",
      });
    }
    if (contacts.length > 0) {
      console.log(
        `There are ${contacts.length} contacts in the contact database`
      );
      res.status(200).json({
        status: "success",
        code: 200,
        message: `There are ${contacts.length} contacts in the database.`,
        data: {
          contacts,
        },
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {get};
