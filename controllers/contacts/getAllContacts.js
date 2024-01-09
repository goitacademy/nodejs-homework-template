// @ GET /api/contacts

const { basedir } = global;

const service = require(`${basedir}/services`);

const getAllContacts = async (_req, res) => {
  const result = await service.getAll();

  return res.json({
    status: "Success",
    code: 200,
    message: "Contacts found",
    data: {
      result,
    },
  });
};

module.exports = getAllContacts;
