const route = {
  ROOT: "/api/contacts",
  HOME: "/",
  ID: "/:contactId",
  FAVORITE: "/:contactId/favorite",
};

Object.freeze(route);

module.exports = route;
