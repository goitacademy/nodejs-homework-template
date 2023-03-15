
function validate(contact) {
    if (!contact) {
      throw new Error("No contact provided");
    }
    if (!contact.name) {
      throw new Error("name is required");
    }
    if (!contact.email) {
      throw new Error("email is required");
    }
    if (!contact.phone) {
      throw new Error("phone is required");
    }
  
  }
  module.exports=validate