const service = require("../services/contacts.service");

const get = async (req, res, next) => {
    try {
        const { query } = req;
        console.log('ciekaw',query);
    const results = await service.getAllContacts(query);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
    get
}