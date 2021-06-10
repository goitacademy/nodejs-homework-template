const ContactsRoutePaths = {
  root: "/api/contacts",
  home: "/",
  contactId: "/:contactId",
  favorite: "/:contactId/favorite",
};

const UsersRoutePaths = {
  root: "/api/users",
  home: "/",
  signup: "/signup",
  login: "/login",
  logout: "/logout",
  current: "/current",
};

module.exports = { ContactsRoutePaths, UsersRoutePaths };
