import { updateContact } from "../../models/contacts.js";
import { schema } from "../../routes/api/tools/validator.js";

const putContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
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

  if (body.name || body.email || body.phone) {
    const renameContact = await updateContact(contactId, body);
    if (renameContact) {
      res.json({ status: 200, body: renameContact });
    } else {
      res.json({ status: 404, message: "Not found" });
    }
  } else {
    res.json({ status: 400, message: "missing fields" });
  }
};
export { putContact };
