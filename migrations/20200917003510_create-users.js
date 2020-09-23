exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('ID').unsigned().primary();
        table.string('Email').notNull();
        table.text('Title').nullable();
        table.text('Address').nullable();
        table.string('FirstName').notNull();
        table.string('LastName').notNull();
        table.string('Phone').nullable();
        table.string('Github').nullable();
        table.string('Twitter').nullable();
        table.string('Instagram').nullable();
        table.string('Facebook').nullable();
        table.boolean("IsTeacher").notNull();
  
        table.enum('Gender', ['male', 'female']).notNull();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  };