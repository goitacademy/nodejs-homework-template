import repositoryContacts from '../../repository/repository-contacts'
import { HttpCode, ERROR } from '../../libs/constants';

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { ...contacts }
  })
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.getContactById(id);
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

const getAddContact = async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body);
  res.status(HttpCode.CREATED).json({
    status: 'success',
      code: HttpCode.CREATED,
      data: { contact: newContact }
  });
};

const getRemoveContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.removeContact(id)
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

const getUpdateContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
  contact ?
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { contact }
    }) :
    res.status(HttpCode.NOT_FOUND).json(ERROR);
};

export {
    getContacts,
    getContactById,
    getAddContact,
    getRemoveContact,
    getUpdateContact,
}
