const { getContactById } = require("../controllers/contacts");
// const { createError } = require("../helpers");
const { Contact } = require("../models/contacts");

describe("get contact by id test", () => {
  it("should return contact by providen ID", async () => {
    const mReq = {
      params: {
        contactId: "123",
      },
    };
    const mRes = {
      json: jest.fn(),
    };
    const contact = {
      _id: "123",
      name: "John Doe",
      // phone: "123456",
      // email: "example@mail.com",
      favorite: false,
      owner: "456",
    };
    jest.spyOn(Contact, "findById").mockImplementationOnce(async () => contact);

    const result = await getContactById(mReq, mRes);

    expect(result._id).toEqual(mReq.params.contactId);
    expect(result.name).toBeDefined();
    expect(result.favorite).toBeDefined();
    expect(result.owner).toBeDefined();
    expect(result.status).toEqual(200);
  });
});
