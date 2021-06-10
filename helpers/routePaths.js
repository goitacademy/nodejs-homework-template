const ContactsRoutePaths = {
  home: "/",
  contactId: "/:contactId",
  favorite: "/:contactId/favorite",
};

const UsersRoutePaths = {
  home: "/",
  signup: "/signup",
  login: "/login",
  logout: "/logout",
  current: "/current",
};

module.exports = { ContactsRoutePaths, UsersRoutePaths };
