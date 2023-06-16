const Contact = require("../../models/contactModel");
// const { listContacts } = require("../../models/contacts");
//  console.log('Contact', Contact)
const getAll = async (req, res) => {
//  const result = await listContacts();
  // console.log('Contact', Contact)
   const result = await Contact.find({});

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
