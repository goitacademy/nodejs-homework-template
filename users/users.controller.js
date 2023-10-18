// const {
//   getAllUsers,
//   getUserById,
//   saveUser,
//   replaceUser: updateUser,
//   removeUser,
// } = require("./users.service");
const userDao = require("./users.dao");

const signUpHandler = async (req, res, next) => {
  const { username, password } = req.body;
  const createdUsrer = await userDao.createUser({ username, password });

  return res.status(201).send({
    user: {
      username: createdUsrer.username,
      role: createdUsrer.role,
    },
  });
};

// const getAllUsersHandler = async (req, res) => {
//   const users = await getAllUsers();

//   return res.status(200).send({ users });
// };

// const getSingleUserHandler = async (req, res) => {
//   const user = await getUserById(req.params.id);

//   if (!user) {
//     return res.status(404).send();
//   }

//   return res.status(200).send({ user });
// };

// const createUserHandler = async (req, res) => {
//   const user = await saveUser(req.body);

//   return res.status(201).send({ user });
// };

// const replaceUserHandler = async (req, res) => {
//   const updatedUser = await updateUser(req.params.id, req.body);

//   return res.status(200).send({ user: updatedUser });
// };

// const deleteUserHandler = async (req, res) => {
//   await removeUser(req.params.id);
//   return res.status(204).send();
// };

// const updateUserStatus = async (req, res) => {
//   const { favorite } = req.body;

//   const updatedUser = await updateUser(req.params.id, { favorite });
//   // console.log(req);
//   console.log(res.params);
//   return res.status(200).send(updatedUser);
// };

module.exports = {
  // getAllUsersHandler,
  // getSingleUserHandler,
  // createUserHandler,
  // replaceUserHandler,
  // deleteUserHandler,
  // updateUserStatus,
  signUpHandler,
};
