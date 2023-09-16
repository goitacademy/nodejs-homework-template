import Contact from "../models/Contact.js";
import {ctrlWrapper} from "../decorators/index.js";

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  // console.log(result);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  res.json(result);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({ message: "Contact deleted" });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  // console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
      runValidators: true,
    }
  );
  // console.log(result);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
