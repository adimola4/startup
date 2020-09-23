
exports.up = function(knex) {
    return knex.schema.createTable('questions', function(table) {

    table.increments('ID').unsigned().primary();
        table.string('Title').notNull();
        table.string('Choice1').notNull();
        table.text('Choice2').notNull();
        table.text('Choice3').nullable();
        table.text('Choice4').nullable();
        table.int('Answer').nullable();
        table.enum('Type ', ['true or false', 'multiple choice','fill blanks']).notNull();
    });
};

  
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('questions');
  };