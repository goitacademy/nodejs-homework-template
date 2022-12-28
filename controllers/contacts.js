const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query; // pagination. 3й аргумент find, це skip-кількість об'єктів що треба пропустити з початку колекції; limit-скільки забрати
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "email subscription"); // populate-особливий метод монгуса, який означає поширення запиту, він бере ID, який записаний в поле owner, через модель йде в базу даних по колекцію, яка записана в ref, знаходить там об'єкт з відповідним ID і підставляє увесь його зміст замість owner. Якщо не треба передавати всю інформацію користувача, то другим аргументом через пробіл можна передати ті поля які треба, як в даному випадку, це "email та subscription"

  res.json(result);
};

const getById = async (req, res) => {
  const result = await Contact.findById(req.params.id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const apdateById = async (req, res, next) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const result = await Contact.findOneAndRemove({
    _id: req.params.id,
    owner: req.user._id,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ result, message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  apdateById: ctrlWrapper(apdateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteById: ctrlWrapper(deleteById),
};
