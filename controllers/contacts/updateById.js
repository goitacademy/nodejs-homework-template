
const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
const { NotFound } = require('http-errors');

const contactsOperations = require('../../models/contact');

const updateById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
        throw new NotFound('Not found');
    }
    res.json({
        status: 'success',
        code: 200,
        data: {
            result,
        },
    });
};

module.exports = updateById;
