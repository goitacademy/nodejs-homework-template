import contactService from "../models/contacts.js"; // logical-func
import { HttpError } from "../helpers/index.js"; // errors
import {
  contactAddSchema,
  updateScheme,
} from "../schemes/addContactSchemes.js";

const getAllContacts = async (req, res, next) => {
  //  так як це асинхронна функція, яка може видавати помилку, треба трай, кетч
  try {
    const result = await contactService.listContacts();
    console.log("dssd", result);
    // коли користувач переходить на цю силку, то
    // ця функція викликає функцію-логіку, і користувачеві виводиться результат
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  try {
    // req.params - зберігають динамічну частину запиту
    const { contactId } = req.params; // === req.params.contactId
    const result = await contactService.getContactById(contactId);
    if (!result) {
      // ===null
      throw HttpError(404, "Contact does not found");
      // створили функцыю і винесли те, що нижче
      // const error = new Error('Contact does not found')
      // error.status(404)
      // throw error; // кидаємо в кетч
      // res.status(404).json({message: 'Contact does not found'}) - це не можна юзати, бо помилки обробляє кетч
    }
    res.json(result);
  } catch (error) {
    next(error);
    // некст каже шукати некст функцію яка підходить ще, але якщо ми передаємо ерор, то тоді
    // некст буде шукати функцію-колбек, в якому є 4 аргументи, яка передає це шо внизу (файл апп)
    // const {status = 500, message = 'server errors'} = error
    // res.status(status).json({
    //   // міняємо статус відповіді, якщо є помилка
    //   message,
    // });
  }
};

const addNewContact = async (req, res, next) => {
  try {
    // req.body - тримає всі параметри, які вводить користувач
    const validatedResult = contactAddSchema.validate(req.body);
    const error = validatedResult.error;
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const validatedResult = updateScheme.validate(req.body);
    const error = validatedResult.error;
    if (error) {
      throw HttpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await contactService.updateContact(id, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactService.removeContact(contactId);
    if (!result) {
      // ===null
      throw HttpError(404, "Contact does not found");
    }
    res.status(201).json({ message: "Contact is deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllContacts,
  getByID,
  addNewContact,
  updateById,
  deleteById,
};

// router.get('/',

//  це функція контроллерс, для зручності її виносимо окремо
// async (req, res, next) => {
//     const result = await contactService.listContacts()
//     console.log('dssd',result)
//     // коли користувач переходить на цю силку, то
//     // ця функція викликає функцію-логіку, і користувачеві виводиться результат
//     res.json(result)
//   }

// )
