const { HttpError } = require("../helpers");

const { Contact } = require("../models/contact");

const getContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    console.log("getContacts--->", req.query);
    const { page = 1, limit = 20, favorite = true } = req.query;

    const skip = (page - 1) * limit;
    const result = await Contact.find(
      { owner, favorite },
      "name phone favorite",
      {
        skip,
        limit,
      }
    ).populate("owner", "email");

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findById(id);
    if (!result) {
      // return res.status(404).json({ message: "Not found" });
      throw HttpError(404, "Not Faund");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    console.log("try--->", req.user);

    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    console.log("catch---->", req.user);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      // return res.status(404).json({ message: "Not found" });
      throw HttpError(404, "Not Faund");
    }
    if (Object.keys(req.body).length === 0) {
      // return res.status(400).json({ message: "missing fields" });
      throw HttpError(404, "missing fields");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    console.log("updateStatusContact--->", req.body);
    if (!result) {
      // return res.status(404).json({ message: "Not found" });
      throw HttpError(404, "Not Faund");
    }
    if (Object.keys(req.body).length === 0) {
      // return res.status(400).json({ message: "missing field favorite" });
      throw HttpError(404, "missing field favorite");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      console.log("error deleteContact--->", res.status);

      // return res.status(404).json({ message: "Not found" });
      throw HttpError(404, "Not Faund");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
