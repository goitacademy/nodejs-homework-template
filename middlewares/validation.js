const Joi = require("joi");
const app = require("../app");
const service = require("../service");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

app.post("/api", (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    service.createContact(req, res); // Call the createContact controller function
  }
});

app.put("/api/:id", (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    service.updateContactById(req, res); // Call the updateContactById controller function
  }
});

app.patch("/api/:contactId/favorite", (req, res) => {
  service
    .updateStatusContact(req.params.contactId, req.body)
    .then((updatedContact) => {
      if (updatedContact) {
        res.json({
          status: "success",
          code: 200,
          data: { contact: updatedContact },
        });
      } else {
        res.status(404).json({
          status: "error",
          code: 404,
          message: `Not found contact id: ${req.params.id}`,
          data: "Not Found",
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

module.exports = app;
