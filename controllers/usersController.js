const {
  middlewareForPost,
  middlewareForUpdate,
  middlewareForUpdateStatus,
} = require("../middlewares/middlewares");

const { Contact } = require("../models/index");

async function getAllUsers(req, res) {
  const contacts = await Contact.find({});
  res.json({ contacts });
}

async function getUserById(req, res) {
  const { contactId } = req.params;
  const user = await Contact.findOne({ _id: contactId });
  if (!user) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }
  res.json(user);
}

async function addUser(req, res) {
  middlewareForPost(req, res);
  const result = await Contact.create(req.body);
  res.status(201);
  res.json(result);
}

async function deleteUserById(req, res) {
  const { contactId } = req.params;

  const userDelete = await Contact.findByIdAndRemove(contactId);
  if (!userDelete) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }
  res.status(200);
  res.json({
    message: "contact deleted",
    data: userDelete,
  });
}

async function updateUser(req, res) {
  middlewareForUpdate(req, res);
  const { contactId } = req.params;
  const { body } = req;
  const user = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  if (!user) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }

  res.status(200);
  res.json(user);
}

async function updateStatusContact(req, res) {
  middlewareForUpdateStatus(req, res);
  const { contactId } = req.params;
  const { body } = req;
  const userStatus = await Contact.findByIdAndUpdate(contactId, body);
  if (!userStatus) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }

  res.status(200);
  res.json(userStatus);
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUser,
  updateStatusContact,
};
