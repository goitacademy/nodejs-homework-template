const {
  Contact,
} = require('../db/contactsMadal');
const { status } = require('../helpers/status');
const { NotFound } = require('http-errors');

const listContacts = async (req, res, next) => {
  try {
    const result = await Contact.find({});
    // delete console
    console.log(result);
    return status(
      res,
      200,
      { status: 'success' },
      result
    );
  } catch (arror) {
    console.error(
      'внешний блок catch',
      arror.message
    );
  }
};

const getContactById = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    console.log('result :>> ', result);
    if(result) {
      return status(
        res,
        200,
        { status: 'success' },
        result
      );
    } else {
        return status(
          res,
          200,
          { status: 'error', message: 'Not found' },
          result
        );
      }
   
    // const result = await Contact.find({});
    // const [contact] = result.filter(
    //   item => item.id === req.params.contactId
    // );
    // if (contact) {
    //   return status(
    //     res,
    //     200,
    //     { status: 'success' },
    //     contact
    //   );
    // } else {
    //   return status(
    //     res,
    //     200,
    //     { status: 'error', message: 'Not found' },
    //     contact
    //   );
    // }
  } catch (error) {
    console.error(error);
  }
};


const removeContact = async (req, res, next) => {
  const resulte = await Contact.deleteOne({
    _id: req.params.contactId,
  });
  console.log(resulte.deletedCount);
  if (resulte.deletedCount) {
    return status(res, 200, {
      message: 'contact deleted',
      resulte,
    });
  } else {
    return status(res, 404, {
      message: 'Not found',
    });
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } =
      req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      createdAt: Date.now(),
      favorite,
    });
    console.log(contact);
    await contact.save();

    return status(
      res,
      201,
      { status: 'success' },
      contact
    );
  } catch (error) {
    console.error(error.type.message);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  console.log(req.body);
  const result = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );
  if (!result) {
    throw new NotFound(
      `Contact with id=${contactId} not found`
    );
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
  //   console.log (req.body);
  //   console.dir(Contact.findOneAndUpdate);
  //  const result = Contact.findOneAndUpdate(req.params.contactId, req.body, { new: true })
  //  return status(res, 200, { status: "success", result })

  //   const q = Contact.where({ _id: req.params.contactId });
  //   console.log(q);

  // q.update({ $set: { name: 'bob' }},{ $set: { email: 'bob@com' }},{ $set: { phone: '2321' }}).update();

  // const { name, email, phone } = req.body;
  // console.log(req.params.contactId );
  // console.log(res.name);

  //  try {

  //   Contact.updateMany({name : req.params.contactId},
  //    { name },
  //    { email },
  //    {phone}
  //   );

  //   const result = await Contact.find({});
  //   const { name, email, phone } = req.body;

  //   result.forEach((contact) => {
  //     resultFilter = contact.id === req.params.contactId

  //    const res =  await Contact.updateOne({ name }, { email },{phone });

  //   });

  //   return status(res, 200, { status: "success", result });
  //  } catch (error) {
  //   console.error(error);
  //  }
};

const updateStatusContact = async (req, res) => {
  if (req.body === undefined) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: 'Missing field favorite',
    });
    return;
  }
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(
      `Contact with id=${contactId} not found`
    );
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
