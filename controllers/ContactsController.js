const HTTPError = require("../helpers/HTTPError");
const HTTPResponse = require("../helpers/HTTPResponse");

class ContactsController {
  getAllContacts = async (req, res) => {
    const { id: owner } = res.locals.user;

    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = {
      owner,
    };

    if (favorite) {
      filter.favorite = favorite;
    }

    const contacts = await ContactsService.getContacts(filter, skip, limit);

    if (!contacts) {
      throw HTTPError(400);
    }

    HTTPResponse(res, 200, contacts);
  };
}

module.exports = new ContactsController();
