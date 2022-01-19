import { HttpCode } from '../../lib/constants';
import addContact from '../../repository/contacts/addContactRepository';

// class AddContactController {
//   constructor(req, res, next) {
  //   const { id: userId } = req.user;
  //   this.newContact = await addContact(userId, req.body);

    
//   }

//   res.status(HttpCode.CREATED).json({
//   status: 'success',
//   code: HttpCode.OK,
//   data: { contact: this.newContact },
//   })
// }

const addContactController = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await addContact(userId, req.body);
  res.status(HttpCode.CREATED).json({
    status: 'success',
    code: HttpCode.OK,
    data: { contact: newContact },
  })
}

export default addContactController;