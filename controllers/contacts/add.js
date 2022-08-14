const contacts = require("../../models/contacts");

const add = async(req, res) => {
    const result = await contacts.addContact(req.body);
    res.json({
        status: "success",
        code: 200,
        data: {
            result,
        },
      });
}

module.exports = add;

