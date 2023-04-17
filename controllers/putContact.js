const { updateContact } = require("../models/contacts");

async function putContact(req, res, next) {
  const id = req.params.contactId;
  const {name,email, phone} = req.body;
  const newData = {id, name,email, phone}
  if (!Object.values(newData).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  const result =  await updateContact(id, newData);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
}

module.exports = putContact
// async (req, res, next) => {
//     await updateContact(req.params.contactId, req.body);
//     res.status(200).json(req.body);
//     res.end();
//   }
