const pathContact = {
  ROOT: "/api/contacts",
  HOME: "/",
  ID: "/:contactId",
  FAVORITE: "/:contactId/favorite",
};

Object.freeze(pathContact);

module.exports = pathContact;
