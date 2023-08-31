// tests don't work

const ctrl = require('../controllers/auth');

describe("Unit test login user", () => {
  
    it("if responce is 200", async () => {
      const email = "crowley@vestibul.co.uk";
      const password = "1111111";
      const result = await ctrl.login({ body : { email, password } });
      expect(result.code).toEqual(200);
    });
  
    it("if token exist", async () => {
        const email = "crowley@vestibul.co.uk";
        const password = "1111111";
        const result = await ctrl.login({ body : { email, password } });
        expect(!!result.token).toEqual(true);
    });
  
    it("if returns object and type is string", async () => {
        const result = await ctrl.login({ user: {} });
        expect(result).toEqual(true);
        // expect(() => ctrl.login(() => {user: {}})).toThrow('must be an object');
    });

  });