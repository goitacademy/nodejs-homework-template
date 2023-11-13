function getContacts(req, res, next) {
  res.send("Get books");
}

function getContact(req, res, next) {
  const { id } = req.params;
  res.send(`Book ${id}`);
}

function createContact(req, res, next) {
  res.send("Create contact");
}

function deleteContact(req, res, next) {
  const { id } = req.params;
  res.send(`Book ${id} delete`);
}

function updateContact(req, res, next) {
  const { id } = req.params;
  res.send(`Book ${id} updated`);
}

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
