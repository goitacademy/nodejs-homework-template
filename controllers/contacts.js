// імпортую модель
const { Contact } = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;  
  console.log(req.query);
  // pagination
  const { page = 1, limit = 5 } = req.query;
  const skip = (page-1)*limit
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  // res.render("contacts", {result});
  res.json(result);
};


const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found this");
  }
  res.json(result);
};

const add = async (req, res) => {
  
  const { _id: owner } = req.user;  
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    throw HttpError(404, "Not found this");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found this");
  }
  res.json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found this");
  }
  res.json({ message: "Delete success" });
};


const renderHomepage = (req, res) => {
  res.send(`<form action="/users" method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email"><br><br>
        <label for="password">Password</label>
        <input type="password" name="password" id="password"><br><br>
        <button type="submit">Register</button>
    </form>`);
};

// const getUserList = (req, res) => {
//   res.render("users", { users });
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
  renderHomepage
  
};
