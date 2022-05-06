const { v4 } = require("uuid");
const {
  middlewareForPost,
  middlewareForUpdate,
} = require("../middlewares/middlewares");
const users = [
  {
    id: "1",
    name: "Mark",
    number: "0631340660",
    email: "markel@ukr.net",
  },
  {
    id: "2",
    name: "Roma",
    number: "0974567284",
    email: "markel_1@ukr.net",
  },
  {
    id: "3",
    name: "Sveta",
    number: "0677115553",
    email: "markel_2@ukr.net",
  },
];

async function getAllUsers(req, res) {
  res.json({ users });
}

async function getUserById(req, res) {
  const { contactId } = req.params;
  const [user] = users.filter((item) => item.id === contactId);
  if (!user) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }
  res.json(user);
}

async function addUser(req, res) {
  middlewareForPost(req, res);
  const body = req.body;
  const newContact = {
    id: v4(),
    ...body,
  };
  res.status(201);
  res.json(newContact);
  users.push(newContact);
}

async function deleteUserById(req, res) {
  const { contactId } = req.params;
  const userDelete = users.find((item) => item.id === contactId);
  if (!userDelete) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }
  res.status(200);
  res.json({ message: "contact deleted" });
}

async function updateUser(req, res) {
  middlewareForUpdate(req, res);
  const { contactId } = req.params;
  const { body } = req;
  const user = users.find((item) => item.id === contactId);
  if (!user) {
    res.status(404);
    res.json({ message: "Not found" });
    return;
  }
  const updateUser = {
    ...user,
    ...body,
  };
  res.status(200);
  res.json(updateUser);
}

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUserById,
  updateUser,
};
