const Contact = require("../models/contact");
const User = require("../models/user");

const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const token = req.headers.authorization.slice(7);

    const skip = (page - 1) * limit;

    const user = await User.findOne({ token });

    const filter = {};

    if (req.query.favorite) {
      filter.favorite = req.query.favorite === "true";
    }

    const contacts = await Contact.find({ owner: user._id, ...filter })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "ok",
      code: 200,
      page,
      limit,
      contacts,
    });
  } catch (error) {
    res.status(404).json({
      status: "Not found",
      code: 404,
    });
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const user = await User.findOne({ token });

    data = await Contact.findOne({
      _id: req.params.contactId,
      owner: user._id,
    });

    res.status(200).json({
      status: "ok",
      code: 200,
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Contact not found",
      code: 404,
    });
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const data = await Contact.create(req.body);

    res.json({
      status: "created",
      code: 201,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const user = await User.findOne({ token });

    data = await Contact.findByIdAndRemove({
      _id: req.params.contactId,
      owner: user._id,
    });
    if (data) {
      return res.json({
        status: "ok",
        code: 200,
        message: `Contact with ${req.params.contactId} deleted`,
      });
    }
    res.json({ message: "Contact not found" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const token = req.headers.authorization.slice(7);
    const user = await User.findOne({ token });

    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      { owner: user._id }
    );

    if (data) {
      return res.json({
        status: "updated",
        code: 201,
        data,
      });
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
      message: "Contact not found",
    });
  } catch (error) {
    next(error);
  }
};

const changeFavouriteContactById = async (req, res, next) => {
  try {

    if (req.body.favorite === null) {
      return res.status(400).send({ message: "missing field favorite" });
    }

    const data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body
    );
    if (data) {
      return res.json({
        status: "updated",
        code: 200,
        data,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Contact not found",
      code: 404,
    });
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContactById,
  changeFavouriteContactById,
};
