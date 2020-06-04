exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert([
        {
          id: 1,
          firstName: "Kyla",
          lastName: "Gifford",
          username: "Kyla97",
          password: "1997",
        },
      ]);
    });
};
