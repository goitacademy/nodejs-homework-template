const contacts = require("../../models/contacts");

const getAll = async(_, res) => {
    const result = await contacts.listContacts();
    res.json({
        status: "success",
        code: 200,
        data: {
            result,
        },
      });
}

module.exports = getAll;
