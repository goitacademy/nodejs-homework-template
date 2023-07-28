const { login } = require("../controllers/users");
const { DB_HOST } = process.env;

const { MongoClient } = require('mongodb');

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    await setup();
    connection = await MongoClient.connect(globalThis.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db();
  });

  afterAll(async () => {
    await connection.close();
    await teardown();
  });

  it("should insert a doc into collection", async () => {
    const users = db.collection("users");

    const mockUser = { _id: "some-user-id", name: "John" };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({ _id: "some-user-id" });
    expect(insertedUser).toEqual(mockUser);
  });

  test("login", async () => {
    const data = await login( );
    console.log(data);
    expect(data).toBe("");
  });
});
