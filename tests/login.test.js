describe("hooks", function () {
  //   beforeAll(() => {
  //     console.log("Виконати на початку тестів");
  //   });

  //   afterAll(() => {
  //     console.log("Виконати після тестів");
  //   });

  //   beforeEach(() => {
  //     console.log("Виконати на початку кожного тесту");
  //   });

  //   afterEach(() => {
  //     console.log("Виконати наприкінці кожного тесту");
  //   });

  test("json", async () => {
    const { data, status } = await fetch(
      "http://localhost:3000/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "maks.karalash@gmail.com",
          password: "12345678",
        }),
      }
    ).then((data) => ({ data: data.json(), status: data.status }));

    await expect(status).toBe(200);

    await expect(await data).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          email: expect.any(String),
          subscription: expect.any(String),
          token: expect.any(String),
        }),
      })
    );
  });
});
