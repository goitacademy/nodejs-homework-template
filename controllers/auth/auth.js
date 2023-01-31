const { Conflict, Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email: ${email} in use`);
  }
  const newUser = new User({ email, subscription });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json({
    data: {
      user: {
        email,
        subscription,
        token,
      },
    },
  });
};

const getCurrent = async (req, res) => {
  console.log(req.user);
};

const logout = async (req, res) => {};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const contactById = await Contact.findById(id);
//   if (!contactById) {
//     throw new NotFoundError(`Contact with id=${id} not found`);
//   }
//   res.json(contactById);
// };

// const add = async (req, res) => {
//   const newContact = await Contact.create(req.body);
//   res.status(201).json(newContact);
// };

// const updateById = async (req, res) => {
//   const { id } = req.params;
//   const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });
//   if (!updatedContact) {
//     throw new NotFoundError(`Contact with id=${req.id} not found`);
//   }
//   res.json(updatedContact);
// };

// const updateStatusById = async (req, res) => {
//   const { id } = req.params;
//   const { favorite } = req.body;
//   if (!favorite) {
//     throw new WrongParametersError("missing field favorite");
//   }
//   const updatedContact = await Contact.findByIdAndUpdate(
//     id,
//     { favorite },
//     {
//       new: true,
//     }
//   );
//   if (!updatedContact) {
//     throw new NotFoundError(`Contact with id=${req.id} not found`);
//   }
//   res.json(updatedContact);
// };

// const removeById = async (req, res) => {
//   const { id } = req.params;
//   const removedContact = await Contact.findByIdAndRemove(id);
//   if (!removedContact) {
//     throw new NotFoundError(`Contact with id=${req.id} not found`);
//   }
//   res.json(removedContact);
// };

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
};
