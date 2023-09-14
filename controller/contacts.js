
const {
	newContactJoiValidation,
	editedContactJoiValidation,
	favJoiValidation,
  } = require('../service/contactsJoi');
  const {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateFav,
  } = require('../service/contactsMongo');
  
  const get = async (req, res, next) => {
	const { _id } = req.user;
	try {
	  const contacts = await listContacts({ owner: _id });
	  res.json(contacts);
	} catch (err) {
	  res.status(500).json({ message: 'Error ocurred', error: err });
	}
  };
  
  const getById = async (req, res, next) => {
	const { _id } = req.user;
	const { contactId } = req.params;
	try {
	  const contact = await getContactById(contactId, _id);
	  if (!contact) {
		throw new Error();
	  }
	  res.json(contact);
	} catch (err) {
	  res.status(404).json({ message: 'Not found' });
	}
  };
  
  const postNew = async (req, res, next) => {
	const { _id } = req.user;
	const { name, email, phone } = req.body;
	try {
	  await newContactJoiValidation(name, email, phone);
	  const contact = await addContact(name, email, phone, _id);
	  res.status(201).json(contact);
	} catch (err) {
	  res.status(400).json({ message: err.message });
	}
  };
  
  const deleteCont = async (req, res, next) => {
	const { _id } = req.user;
	const { contactId } = req.params;
	try {
	  const contact = await removeContact(contactId, _id);
	  if (!contact) {
		throw new Error();
	  }
	  res.json({ message: 'contact deleted' });
	} catch (err) {
	  res.status(404).json({ message: 'Not found' });
	}
  };
  
  const putEditCont = async (req, res, next) => {
	const { _id } = req.user;
	const { contactId } = req.params;
	const update = req.body;
	try {
	  await editedContactJoiValidation(update);
	  try {
		const contact = await updateContact(contactId, update, _id);
		if (!contact) {
		  throw new Error();
		}
		res.json(contact);
	  } catch (err) {
		res.status(404).json({ message: 'Not found' });
	  }
	} catch (err) {
	  res.status(400).json({ message: 'Missing fields' });
	}
  };
  
  const patchFav = async (req, res, next) => {
	const { _id } = req.user;
	const { contactId } = req.params;
	const body = req.body;
	try {
	  await favJoiValidation(body);
	  try {
		const contact = await updateFav(contactId, body, _id);
		res.json(contact);
	  } catch {
		res.status(404).json({ message: 'Not found' });
	  }
	} catch (err) {
	  res.status(400).json({ message: 'missing field favorite' });
	}
  };
  
  module.exports = { get, getById, postNew, putEditCont, patchFav, deleteCont };