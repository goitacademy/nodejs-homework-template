// const { v4 } = require("uuid");
const {
  middlewareForPost,
  // middlewareForUpdate,
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
  // console.log("lsldkvnsdlkvnslKVNCD S,MVNLknvdslkfnwefhnegfljkerng", result);
  // const newContact = {
  //   id: v4(),
  //   ...body,
  // };
  res.status(201);
  res.json(result);
}

// async function deleteUserById(req, res) {
//   const { contactId } = req.params;
//   const userDelete = users.find((item) => item.id === contactId);
//   if (!userDelete) {
//     res.status(404);
//     res.json({ message: "Not found" });
//     return;
//   }
//   res.status(200);
//   res.json({ message: "contact deleted" });
// }

// async function updateUser(req, res) {
//   middlewareForUpdate(req, res);
//   const { contactId } = req.params;
//   const { body } = req;
//   const user = users.find((item) => item.id === contactId);
//   if (!user) {
//     res.status(404);
//     res.json({ message: "Not found" });
//     return;
//   }
//   const updateUser = {
//     ...user,
//     ...body,
//   };
//   res.status(200);
//   res.json(updateUser);
// }

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  // deleteUserById,
  // updateUser,
};
