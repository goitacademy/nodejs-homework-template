import { object, string } from "joi";

const validationAddContact = (req, res, next) => {
  const { name, email, phone } = req.body;

  const schema = object({
    name: string().alphanum().min(3).max(30).required(),

    email: string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: string().required(),
  });

  const { error } = schema.validate({ name, email, phone });

  if (error) {
    res
      .status("400")
      .json({
        message: `missing required ${error.details[0].context.key} field`,
      });
    return;
  }

  next();
};

const validationUpdContact = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status("400").json({ message: "missing fields" });
    return;
  }

  const schema = object({
    name: string().alphanum().min(3).max(30),

    email: string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),

    phone: string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const [{ message }] = error.details;
    res.status("400").json({ message: message });
    return;
  }

  next();
};

export default { validationAddContact, validationUpdContact };
