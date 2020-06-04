exports.up = function (knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("firstName", 128).notNullable();
    tbl.string("lastName", 128).notNullable();
    tbl.string("username", 128).notNullable().unique();
    tbl.string("password", 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
