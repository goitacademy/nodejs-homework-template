const {Contact} = require('../models/contact');

async function getAll(req, res) {
  // const { limit = 10 } = req.query;
  // const contacts = await listContacts({limit}); 
  const contacts = await Contact.find({}, "-createdAt -updatedAt"); // отримати з бази всі поля окрім вказаних з мінусом
  res.json(contacts);
};

module.exports = getAll;