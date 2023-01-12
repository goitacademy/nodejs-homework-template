const { login } = require("../controllers/authController");

describe("hooks", function () {
  beforeAll(() => {
    console.log("Выполнить в начале тестов");
  });

  afterAll(() => {
    console.log("Выполнить после тестов");
  });

  beforeEach(() => {
    console.log("Выполнить в начале каждого теста");
  });

  afterEach(() => {
    console.log("Выполнить в конце каждого теста");
  });

  test("1 to power 2 to equal 1", () => {
    console.log("1 to power 2 to equal 1");
    expect(login(1, 2)).toBe(1);
  });

  test("3 to power 2 to equal 9", () => {
    console.log("3 to power 2 to equal 9");
    expect(login(3, 2)).toBe(9);
  });
});
