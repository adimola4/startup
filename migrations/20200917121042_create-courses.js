exports.up = function(knex, Promise) {
    return knex.schema.createTable('courses', function(table) {
        table.increments('ID').unsigned().primary();
        table.string('Subject').notNull();
        table.text('Title').nullable();
        table.text('Description').nullable();  
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('courses');
  };