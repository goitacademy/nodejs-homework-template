const { Contact } = require('../models/contactModel');

// const updateStatusContact = async (contactId, body) => {
//   const contactDetail = await Contact.findByIdAndUpdate(
//     contactId,
//     {
//       $set: body,
//     },
//     { new: true }
//   );
//   return contactDetail;
// };

const getContactsList = async (req, res, next) => {
  const { _id } = req.user;

  // pagination
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  try {
    const contactsList = await Contact.find({ owner: _id }, '', {
      skip,
      limit: +limit,
    }).populate('owner', '_id email');

    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId).populate(
      'owner',
      '_id email'
    );

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const newContact = new Contact({ ...req.body, owner: _id });
    await newContact.save();

    res.status(201).json({ message: 'New contact saved success', newContact });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { body } = req;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $set: body,
      },
      { new: true }
    ).populate('owner', '_id email');

    if (updatedContact === null) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }

    return res.status(200).json({
      message: `Success. Contact id:${contactId} updated`,
      changes: body,
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.user;
  // const { contactId } = req.params;
  const { body } = req;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const removedContact = await Contact.findByIdAndDelete(contactId);

    if (removedContact === null) {
      return res
        .status(404)
        .json({ message: `Contact id ${contactId} Not found` });
    }
    res
      .status(200)
      .json({ message: `Success. Contact ${removedContact._id} deleted ` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContactsList,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatus,
};
