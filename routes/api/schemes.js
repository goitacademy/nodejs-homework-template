const jois = require("joi");

const schema = jois.object({
  name: jois.string().min(3).max(35).required(),
  email: jois
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: jois
    .string()
    .pattern(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "number"
    )
    .required(),
});

module.exports = { schema };
