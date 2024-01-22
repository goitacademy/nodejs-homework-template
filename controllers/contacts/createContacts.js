import { addContact } from "../../models/contacts.js";
import { schema } from "../../routes/api/tools/validator.js";

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    name,
    email,
    phone,
  };

  const { error } = schema.validate(body);
  if (error) {
    console.log(error.details[0].message);
    return res.json({ status: 400, message: `${error.details[0].message}` });
  }

  if (body.name && body.email && body.phone) {
    const newContact = await addContact(body);
    res.json({ status: 201, data: newContact });
  } else {
    res.json({ status: 400, message: "missing required name - field" });
  }
};
export { createContact };
