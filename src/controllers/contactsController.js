const service = require("../service");

const getContacts = async (req, res) => {
  const results = await service.getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: results,
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    res.status(400).json({ message: "Not found" });
    return;
  }

  res.json({
    status: "success",
    code: 200,
    data: contact,
  });
};

const postContact = async (req, res, next) => {
  await service.createContact(req.body);
  res.status(201).json({
    status: "contact added successfully",
    code: 201,
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;

  await service.updateContact(id, req.body);

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    res.status(400).json({ message: "Not found" });
    return;
  }

  await service.removeContact(id);

  res.status(200).json({ message: "contact deleted" });
};

const updateStatus = async (req, res) => {
  const { id } = req.params;

  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  await service.updateStatusContact(id, req.body);

  res.status(200).json({
    status: "contact update",
    code: 200,
  });
};

module.exports = {
  getContacts,
  getById,
  postContact,
  deleteContact,
  updateContact,
  updateStatus,
};
